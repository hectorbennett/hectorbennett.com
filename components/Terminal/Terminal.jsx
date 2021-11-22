import React from "react";
// import "../../animations.scss";
import styles from "./Terminal.module.scss";

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

export default class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      queries: [],
    };
  }

  COMMANDS = {
    help: () => {
      return (
        <>
          <div>www.hectorbennett.com, version 0.2.0.</div>
          <br />
          <div>
            Slime soccer Keys:
            <br />
            Player 1: Move: A, W, D; Change teams: W, S<br />
            Player 2: Move: J, I, L; Change teams: I, K<br />
          </div>
          <br />
          <div>Here is a list of available commands</div>
          <br />
          {Object.keys(this.COMMANDS).map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </>
      );
    },

    worldWar: () => {
      this.props.WM.launchApp("worldWar");
    },

    secretSanta: () => {
      this.props.WM.launchApp("secretSanta");
    },

    clear: () => {
      console.log("clear");
      console.log(this);
      this.setState({ queries: [] });
      console.log(this.state);
    },
  };

  handleContentClick = () => {
    this.inputRef.focus();
  };

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.submit(this.state.inputValue);
    }
  };

  submit = (query) => {
    /* Append the new query and its output to the list of
        queries we have previously submitted */
    var command = this.COMMANDS[query];
    if (command) {
      var output = command();
    } else {
      output = `${query}: command not found. Type 'help' for a list of available commands.`;
    }

    /* Display the new output, clear the input and scroll to the bottom */
    this.setState(
      {
        queries: [...this.state.queries, { input: query, output: output }],
        inputValue: "",
      },
      () => {
        /* Scroll to the bottom */
        this.contentRef.scrollTop = this.contentRef.scrollHeight;
      }
    );
  };

  render() {
    return (
      // <Window title="terminal" width="30rem" height="30rem" icon={}>
      <div
        className={styles.terminal}
        onClick={this.handleContentClick}
        ref={(el) => {
          this.contentRef = el;
        }}
      >
        <div className={styles.output}>
          {this.state.queries.map((item, index) => (
            <Query key={index} input={item.input} output={item.output} />
          ))}
        </div>
        <div className={styles.input_container}>
          <div className={styles.prompt}>$</div>
          <input
            className={styles.input}
            ref={(input) => {
              this.inputRef = input;
            }}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
      // </Window>
    );
  }
}
