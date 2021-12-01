import React from "react";
import randomColor from "randomcolor";
import Landmass from "./Landmass.jsx";
import countries from "./data.json";
import styles from "./WorldWar.module.scss";

const landmasses = countries.map((country) => {
  return {
    shape: country.shape,
    country: country.iso_a2,
    original_country: country.name,
  };
});

countries.forEach((country) => {
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

export default class WorldWar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landmasses: landmasses,
      countries: countries,
      scoreboard: {},
      selectedCountry: null,
      victoryOrder: [],
      messages: [],
    };
  }

  componentDidMount = () => {
    this.run();
  };

  getRandomCountry = () => {
    return getRandomItem(this.state.countries);
  };

  getRandomNeighbour = (neighbours) => {
    /* Return a directly connected neighbour if we can, otherwise pick a random country */
    var chosen_iso = getRandomItem(neighbours);
    return (
      this.state.countries.find((element) => element.iso_a2 === chosen_iso) ||
      getRandomItem(this.state.countries)
    );
  };

  challenge = (country_a, country_b) => {
    const chance = country_a.population / country_b.population;
    if (
      country_a.population >= country_b.population &&
      chance > Math.random()
    ) {
      this.setState({
        messages: [
          `${country_a.name} defeated ${country_b.name}`,
          ...this.state.messages,
        ],
      });
      this.invade(country_a, country_b);
    } else {
      // console.log(`${country_b.name} defeated ${country_a.name}`);
      this.setState({
        messages: [
          `${country_b.name} defeated ${country_a.name}`,
          ...this.state.messages,
        ],
      });
      this.invade(country_b, country_a);
    }
  };

  invade = (winner, loser) => {
    var countries = this.state.countries;
    var landmasses = this.state.landmasses;
    var scoreboard = this.state.scoreboard;
    var victoryOrder = this.state.victoryOrder;

    if (!scoreboard[winner.name]) {
      scoreboard[winner.name] = 1;
    } else {
      scoreboard[winner.name] += 1;
    }

    victoryOrder.push(loser.name);

    /* Set the landmass's occupying country */
    landmasses = landmasses.map((landmass) => {
      if (landmass.country === loser.iso_a2) {
        return { ...landmass, country: winner.iso_a2 };
      }
      return landmass;
    });

    /* Absorb the population + neighbours of the loser into the winner */
    countries = countries.map((country) => {
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
    countries.forEach((country) => {
      country.neighbours = country.neighbours.filter((iso_a2) => {
        return iso_a2 !== loser.iso_a2;
      });
    });

    /* Delete all references to itself as a neighbour wihin every country */
    countries.forEach((country) => {
      country.neighbours = country.neighbours.filter((iso_a2) => {
        return iso_a2 !== country.iso_a2;
      });
    });

    /* Delete the losing country */
    countries = countries.filter((country) => {
      return country.iso_a2 !== loser.iso_a2;
    });

    this.setState({
      countries: countries,
      landmasses: landmasses,
      scoreboard: scoreboard,
    });
  };

  run = () => {
    var i = setInterval(() => {
      var random_choice = this.getRandomCountry();
      var random_neighbour = this.getRandomNeighbour(random_choice.neighbours);
      if (!random_choice || !random_neighbour) {
        return;
      }
      if (random_choice === random_neighbour) {
        return;
      }
      this.challenge(random_choice, random_neighbour);
      if (this.state.countries.length === 1) {
        clearInterval(i);
        this.setState({
          messages: [
            `${this.state.countries[0].name} wins!`,
            ...this.state.messages,
          ],
        });
      }
    }, 100);
  };

  selectCountry = (iso_code) => {
    this.setState({ selectedCountry: iso_code });
  };

  render() {
    return (
      <div className={styles.world_war}>
        <svg
          className={styles.world_war_svg}
          viewBox="-10 -10 720 350"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            {this.state.landmasses.map((landmass, index) => (
              <Landmass
                key={index}
                landmass={landmass}
                country={this.state.countries.find((country) => {
                  return landmass.country === country.iso_a2;
                })}
              />
            ))}
          </g>
        </svg>
        <Console messages={this.state.messages} />
      </div>
    );
  }
}
