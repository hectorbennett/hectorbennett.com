import { useState, useRef, useEffect, Fragment } from "react";
import levenshtein from "js-levenshtein";
import styles from "./Terminal.module.scss";

import Scrollable from "../Scrollable";

const help_text = `hectorbennett.com, version 2.0
These shell commands are defined internally.
Type \`help\' to see this list.
Type \`help\' followed by the name of a command to find out more about the command. e.g. to find out more about the function \`name', type \`help name\'.
Use \`info hector\' to find out more about Hector in general.

clear
help
slime
war`;

const help_slime_text = `Slime Soccer is my remake of Quin Pendragon's Java game from the very early 2000s which unfortunately no longer works on modern browsers :(.
This remake was made in the Godot game engine.

Source can be found at <a href="https://github.com/hectorbennett/slime-soccer" target="_blank" rel="noreferrer">https://github.com/hectorbennett/slime-soccer</a>

Controls
--------
Left slime: movement: a, w, d; change teams: w, s
Right slime: movement: j, i, l; change teams: i, k`;

const help_war_text = `World War Bot is a visualisation of a dumb algorithm for finding the ultimate warmonger.

Country data comes from <a href="https://github.com/lorey/list-of-countries" target="_blank" rel="noreferrer">https://github.com/lorey/list-of-countries</a>

The procedure works as follows:

    - Pick a random country
    - Pick a random neighbour of that country
    - Choose a probability of victory for the countries based on relative population
    - Choose a winner based on a random number choice and the calculated probability of victory
    - Transfer the loser's population and borders to the winner

Repeat until only one country remains. China usually wins.

I won't list all the victors but running the algorithm 10,000 times I found the following likelyhood of victory

China - 69%
India - 24%
USA - 5%
Russia - 1%
Nigeria - 0.7%
etc.
`;

const info_hector_text = `
 - Very good with Python, Javascript, MySQL, HTML/CSS, Sketch and various Adobe design software.
 - Pretty mediocre with C++, GDScript and a few other random languages.
 - London based.

This website was built with React, The source code can be found at <a href="https://github.com/hectorbennett/hectorbennett.com." target="_blank" rel="noreferrer">https://github.com/hectorbennett/hectorbennett.com.</a>

:)`;

const help_name_text = `
\`help name' was just an example you dummy.
Swap \`name' for the name of the command you need help with.
e.g. \`help war'`;

function Query(props) {
  return (
    <div className={styles.query}>
      <div className={styles.input}>
        <span className={styles.prompt}>$</span>
        {props.input}
      </div>
      <div className={styles.output}>{props.output}</div>
    </div>
  );
}

const SplitText = ({ text }) => (
  <>
    {text.split("\n").map((line, index) => (
      <Fragment key={index}>
        <span dangerouslySetInnerHTML={{ __html: line }} />
        <br />
      </Fragment>
    ))}
  </>
);

export default function Terminal(props) {
  const [inputValue, setInputValue] = useState("");
  const [queries, setQueries] = useState([]);
  const inputRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    /* Scroll to the bottom on submit */
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [queries]);

  const COMMANDS = {
    help: () => <SplitText text={help_text} />,

    war: () => props.openApp("worldWar"),

    "help war": () => <SplitText text={help_war_text} />,

    // santa: () => props.openApp("secretSanta"),

    // "help santa": () => "This is some help about santa",

    slime: () => props.openApp("slimeSoccer"),

    "help slime": () => <SplitText text={help_slime_text} />,

    "info hector": () => <SplitText text={info_hector_text} />,

    "help clear": () => "Clears the terminal.",

    "help help": () => "Type `help' to get help",

    "help name": () => <SplitText text={help_name_text} />,

    clear: () => setQueries([]),
  };

  const submit = (query) => {
    /* Append the new query and its output to the list of
    queries we have previously submitted */
    var command = COMMANDS[query];
    if (command) {
      var output = command();
    } else {
      output = getNotFoundOutput(query);
    }

    if (query !== "clear") {
      /* Display the new output, clear the input and scroll to the bottom */
      setQueries((q) => [...q, { input: query, output: output }]);
    }
    setInputValue("");
  };

  const getNotFoundOutput = (query) => {
    for (let command in COMMANDS) {
      if (levenshtein(command, query) <= 2) {
        return `${query}: command not found. Did you mean to type \`${command}'?.`;
      }
    }
    return `${query}: command not found. Type \`help' for a list of available commands.`;
  };

  return (
    <Scrollable
      className={styles.terminal}
      onClick={() => inputRef.current.focus()}
      ref={contentRef}
    >
      <div>
        <div className={styles.output}>
          {queries.map((item, index) => (
            <Query key={index} input={item.input} output={item.output} />
          ))}
        </div>
        <div className={styles.input_container}>
          <div className={styles.prompt}>$</div>
          <input
            className={styles.input}
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit(inputValue);
              }
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
          />
        </div>
      </div>
    </Scrollable>
  );
}
