import { useState } from "react";
import randomColor from "randomcolor";
import Landmass from "./Landmass.jsx";
import COUNTRIES from "./data.json";
import styles from "./WorldWar.module.scss";

import useRecursiveTimeout from "../../utils/useRecursiveTimeout.js"

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
  const [warData, setWarData] = useState({
    countries: COUNTRIES,
    landmasses: LANDMASSES,
  });
  const [messages, setMessages] = useState([]);

  useRecursiveTimeout(() => {
    if (warData.countries.length === 1) {
      setMessages((m) => [`${warData.countries[0].name} wins!`, ...m]);
      return true;
    } else {
      run();
    }
  }, 100);

  function run() {
    var random_choice = getRandomCountry();
    var random_neighbour = getRandomNeighbour(random_choice.neighbours);
    if (!random_choice || !random_neighbour) {
      return;
    }
    if (random_choice === random_neighbour) {
      return;
    }
    challenge(random_choice, random_neighbour);
  }

  function getRandomCountry() {
    return getRandomItem(warData.countries);
  }

  function getRandomNeighbour(neighbours) {
    /* Return a directly connected neighbour if we can, otherwise pick a random country */
    var chosen_iso = getRandomItem(neighbours);
    return (
      warData.countries.find((element) => element.iso_a2 === chosen_iso) ||
      getRandomItem(warData.countries)
    );
  }

  function challenge(country_a, country_b) {
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
      setMessages((m) => [
        `${country_b.name} defeated ${country_a.name}`,
        ...m,
      ]);
      invade(country_b, country_a);
    }
  }

  function invade(winner, loser) {
    setWarData((d) => {
      return {
        countries: d.countries
          .map((country) => {
            /* Absorb the population + neighbours of the loser into the winner */
            if (country.iso_a2 === winner.iso_a2) {
              return {
                ...country,
                population: winner.population + loser.population,
                neighbours: [
                  ...new Set([...winner.neighbours, ...loser.neighbours]),
                ],
              };
            }
            return country;
          })
          .map((country) => {
            /* Delete all references to the loser as a neighbour within every country 
          and any references to itself as a neighbour */
            return {
              ...country,
              neighbours: country.neighbours.filter((iso_a2) => {
                return iso_a2 !== loser.iso_a2 && iso_a2 !== country.iso_a2;
              }),
            };
          })
          .filter((country) => {
            /* Delete the losing country */
            return country.iso_a2 !== loser.iso_a2;
          }),

        /* Set the landmass's occupying country */
        landmasses: d.landmasses.map((landmass) => {
          if (landmass.country === loser.iso_a2) {
            return { ...landmass, country: winner.iso_a2 };
          }
          return landmass;
        }),
      };
    });
  }

  return (
    <div className={styles.world_war}>
      <svg
        className={styles.world_war_svg}
        viewBox="-10 -10 720 350"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {warData.landmasses.map((landmass, i) => (
            <Landmass
              key={i}
              landmass={landmass}
              country={warData.countries.find((country) => {
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
