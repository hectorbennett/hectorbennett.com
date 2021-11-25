import { useEffect, useState } from "react";
import randomColor from "randomcolor";

import Landmass from "./Landmass.jsx";

import styles from "./WorldWar.module.scss";

import COUNTRIES from "./data.json";

const LANDMASSES = COUNTRIES.map((country) => {
  return {
    shape: country.shape,
    country: country.iso_a2,
    original_country: country.name,
  };
});

COUNTRIES.forEach((country) => {
  country.color = randomColor({ luminosity: "light" });
  country.original_name = country.name;
});

const getRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

function Console(props) {
  return (
    <div className={styles.console}>
      {props.messages.map((message, i) => {
        return <div key={i}>{message}</div>;
      })}
    </div>
  );
}

export default function WorldWar(props) {
  const [landmasses, setLandmasses] = useState(LANDMASSES);
  const [countries, setCountries] = useState(COUNTRIES);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    var i = setInterval(() => {
      var random_country = getRandomItem(countries);
      var random_neighbour = getRandomNeighbour(random_country);
      if (!random_country || !random_neighbour) {
        return;
      }
      if (random_country === random_neighbour) {
        return;
      }
      challenge(random_country, random_neighbour);
      if (countries.length === 1) {
        clearInterval(i);
        setMessages((m) => [`${countries[0].name} wins!`, ...m]);
      }
    }, 100);
    return () => {
      clearInterval(i);
    };
  }, []);

  const getRandomNeighbour = (country) => {
    /* Return a directly connected neighbour if we can, otherwise pick a random country */
    var chosen_iso = getRandomItem(country.neighbours);
    return (
      countries.find((element) => element.iso_a2 === chosen_iso) ||
      getRandomItem(countries)
    );
  };

  const challenge = (country_a, country_b) => {
    const chance = country_a.population / country_b.population;
    if (
      country_a.population >= country_b.population &&
      chance > Math.random()
    ) {
      setMessages((m) => [
        `${country_a.name} defeated ${country_b.name}`,
        ...m,
      ]);
      invade(country_a, country_b);
    } else {
      // console.log(`${country_b.name} defeated ${country_a.name}`);
      setMessages((m) => [
        `${country_b.name} defeated ${country_a.name}`,
        ...m,
      ]);
      invade(country_b, country_a);
    }
  };

  const invade = (winner, loser) => {
    /* Absorb the population + neighbours of the loser into the winner */
    var _countries = countries.map((country) => {
      if (country.iso_a2 === winner.iso_a2) {
        return {
          ...country,
          population: winner.population + loser.population,
          neighbours: [...new Set([...winner.neighbours, ...loser.neighbours])],
        };
      }
      return country;
    });

    /* Delete all references to the loser as a neighbour within every country */
    _countries.forEach((country) => {
      country.neighbours = country.neighbours.filter((iso_a2) => {
        return iso_a2 !== loser.iso_a2;
      });
    });

    /* Delete all references to itself as a neighbour wihin every country */
    _countries.forEach((country) => {
      country.neighbours = country.neighbours.filter((iso_a2) => {
        return iso_a2 !== country.iso_a2;
      });
    });

    /* Delete the losing country */
    _countries = countries.filter((country) => {
      return country.iso_a2 !== loser.iso_a2;
    });

    setCountries(_countries);
    /* Set the landmass's occupying country */
    setLandmasses((l) =>
      l.map((landmass) => {
        if (landmass.country === loser.iso_a2) {
          return { ...landmass, country: winner.iso_a2 };
        }
        return landmass;
      })
    );
  };

  return (
    <div className={styles.world_war}>
      <svg
        className={styles.world_war_svg}
        viewBox="-10 -10 720 350"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {landmasses.map((landmass, index) => (
            <Landmass
              key={index}
              landmass={landmass}
              country={countries.find((country) => {
                return landmass.country === country.iso_a2;
              })}
            />
          ))}
        </g>
      </svg>
      <Console messages={messages} />
    </div>
  );
}
