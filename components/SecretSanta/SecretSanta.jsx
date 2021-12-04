import { useState } from "react";

import Scrollable from "../Scrollable";
import styles from "./SecretSanta.module.scss";

import Card from "../Card";

export default function SecretSanta(props) {
  const [santas, setSantas] = useState([{ name: "", email: "" }]);
  const [invalidPairs, setInvalidPairs] = useState([]);
  return (
    <Scrollable className={styles.secret_santa}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%" }}>
          {santas.map((santa, i) => (
            <Santa
              key={i}
              index={i}
              {...santa}
              santas={santas}
              invalidPairs={invalidPairs}
              onChangeName={(e) => {
                setSantas((santas) => {
                  var _santas = santas.map((santa, j) => {
                    if (i == j) {
                      return { ...santa, name: e.target.value };
                    }
                    return santa;
                  });
                  if (e.target.value && santas.length === i + 1) {
                    _santas.push([{ name: "", email: "" }]);
                  } else if (!e.target.value && santas.length > i + 1) {
                    _santas = _santas.slice(0, -1);
                  }
                  return _santas;
                });
              }}
              onChangeEmail={(e) => {
                setSantas((santas) =>
                  santas.map((santa, j) => {
                    if (i == j) {
                      return { ...santa, email: e.target.value };
                    }
                    return santa;
                  })
                );
              }}
              onAddInvalidPair={(pair) => {
                setInvalidPairs((pairs) => {
                  return [...pairs, pair];
                });
              }}
              onRemoveInvalidPair={(pair) => {
                setInvalidPairs((pairs) => {
                  return pairs.filter(
                    (p) => !(p.includes(pair[0]) && p.includes(pair[1]))
                  );
                });
              }}
              onRemoveSanta={() =>
                setSantas((santas) => santas.filter((s, j) => j !== i))
              }
            />
          ))}
        </div>
        <div style={{ width: "50%" }}>
          <Card>Messages</Card>
        </div>
      </div>
    </Scrollable>
  );
}

function Santa(props) {
  const doNotPairWith = props.invalidPairs
    .filter((pair) => pair.includes(props.name))
    .flat();

  return (
    <Card>
      <div style={{ padding: "1rem" }}>Santa {props.index + 1}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ padding: "0 1rem" }}>
          <Input
            label="Name"
            type="text"
            value={props.name || ""}
            onChange={props.onChangeName}
          />

          <Input
            label="Email"
            type="text"
            name="email"
            value={props.email}
            onChange={props.onChangeEmail}
          />
        </div>
        {props.santas.filter((santa) => santa.name).length > 1 ? (
          <div style={{ padding: "0 ​1rem 1rem 1re" }}>
            <label>
              Do not pair {props.name} with
              {/* <select
          multiple
          onChange={props.onChangeDoNotPairWith}
          value={doNotPairWith}
        > */}
              <Scrollable className={styles.checkboxes}>
                {props.santas
                  .filter((santa) => santa.name && santa.name !== props.name)
                  .map((santa, i) => {
                    const selected = doNotPairWith.includes(santa.name);

                    return (
                      <Checkbox
                        label={santa.name}
                        checked={selected}
                        key={i}
                        value={santa.name}
                        onChange={() =>
                          selected
                            ? props.onRemoveInvalidPair([
                                props.name,
                                santa.name,
                              ])
                            : props.onAddInvalidPair([props.name, santa.name])
                        }
                      />
                    );
                  })}
              </Scrollable>
            </label>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function Checkbox(props) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" {...props} />
      <span className={styles.label}>{props.label}</span>
    </label>
  );
}

function Input(props) {
  return (
    <label className={styles.input}>
      <span className={styles.label}>{props.label}</span>
      <input {...props} />
    </label>
  );
}
