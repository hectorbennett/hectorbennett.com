import { useEffect, useState } from "react";
import randomColor from "randomcolor";

import Landmass from "./Landmass.jsx";

import styles from "./WorldWar.module.scss";

import COUNTRY_DATA from "./data.json";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const COUNTRY_DATA_MAP = COUNTRY_DATA.reduce(
  (ac, a) => ({
    ...ac,
    [a.iso_a2]: { ...a, colour: randomColor({ luminosity: "light" }) },
  }),
  {}
);

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
  const [landmasses, setLandmasses] = useState(
    COUNTRY_DATA.map((country) => ({
      country_code: country.iso_a2,
      original_country_code: country.iso_a2,
    }))
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let i = setInterval(() => {
      fight();
    }, 100);
    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <div className={styles.world_war}>
      <svg
        className={styles.world_war_svg}
        viewBox="-10 -10 720 350"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {landmasses.map((landmass, index) => {
            let original_country =
              COUNTRY_DATA_MAP[landmass.original_country_code];
            let new_country = COUNTRY_DATA_MAP[landmass.country_code];
            return (
              <Landmass
                key={index}
                shape={original_country.shape}
                original_country_name={original_country.name}
                new_country_name={new_country.name}
                colour={new_country.colour}
              />
            );
          })}
        </g>
      </svg>
      <Console messages={messages} />
    </div>
  );
}

// COUNTRIES.forEach((country) => {
//   country.color = randomColor({ luminosity: "light" });
//   country.original_name = country.name;
// });

// const getRandomItem = (items) =>
//   items[Math.floor(Math.random() * items.length)];

// function Console(props) {
//   return (
//     <div className={styles.console}>
//       {props.messages.map((message, i) => {
//         return <div key={i}>{message}</div>;
//       })}
//     </div>
//   );
// }

// export default function WorldWar(props) {
//   const [landmasses, setLandmasses] = useState(LANDMASSES);
//   const [countries, setCountries] = useState(COUNTRIES);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const i = setInterval(() => {
//       let random_country = getRandomItem(countries);
//       let random_neighbour = getRandomNeighbour(random_country);
//       if (!random_country || !random_neighbour) {
//         return;
//       }
//       if (random_country === random_neighbour) {
//         return;
//       }
//       challenge(random_country, random_neighbour);
//     }, 100);
//     return () => {
//       clearInterval(i);
//     };
//   }, []);

//   const challenge = (country_a, country_b) => {
//     const chance = country_a.population / country_b.population;
//     if (
//       country_a.population >= country_b.population &&
//       chance > Math.random()
//     ) {
//       setMessages((m) => [
//         `${country_a.name} defeated ${country_b.name}`,
//         ...m,
//       ]);
//       return invade(country_a, country_b);
//     } else {
//       // console.log(`${country_b.name} defeated ${country_a.name}`);
//       setMessages((m) => [
//         `${country_b.name} defeated ${country_a.name}`,
//         ...m,
//       ]);
//       return invade(country_b, country_a);
//     }
//   };

//   const invade = (winner, loser) => {
//     var _countries = countries;
//     _countries = countries.map((country) => {
//       if (country.iso_a2 === winner.iso_a2) {
//         return {
//           ...country,
//           population: winner.population + loser.population,
//           neighbours: [...new Set([...winner.neighbours, ...loser.neighbours])],
//         };
//       }
//       return country;
//     })
//   }

//   return (
//     <div className={styles.world_war}>
//       <svg
//         className={styles.world_war_svg}
//         viewBox="-10 -10 720 350"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g>
//           {landmasses.map((landmass, index) => (
//             <Landmass
//               key={index}
//               landmass={landmass}
//               country={countries.find((country) => {
//                 return landmass.country === country.iso_a2;
//               })}
//             />
//           ))}
//         </g>
//       </svg>
//       <Console messages={messages} />
//     </div>
//   );
// }
