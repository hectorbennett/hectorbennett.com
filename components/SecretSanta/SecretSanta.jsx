import { useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import Scrollable from "../Scrollable";
import styles from "./SecretSanta.module.scss";

import Card from "../Card";

const DEFAULT_SUBJECT = `Top secret santa email for {santa}`;

const DEFAULT_MESSAGE = `Dear {santa},

You have been assigned {giftee} as your giftee.

The limit is set at £15.

Good luck, and merry Christmas

Love, SantaBot 3000
Ho Ho Ho
xxx`;

const subjectState = atom({
  key: "subjectState",
  default: DEFAULT_SUBJECT,
});

const messageState = atom({
  key: "messageState",
  default: DEFAULT_MESSAGE,
});

const santaListState = atom({
  key: "santaListState",
  default: [{ name: "", email: "", id: 0 }],
});

const invalidPairsState = atom({
  key: "invalidPairs",
  default: [],
});

export default function SecretSanta(props) {
  const [santas, setSantas] = useRecoilState(santaListState);
  const [invalidPairs, setInvalidPairs] = useRecoilState(invalidPairsState);
  return (
    <Scrollable.div className={styles.secret_santa}>
      <div
        style={{ display: "flex", width: "100%", flexWrap: "wrap", padding: 5 }}
      >
        {santas.map((santa, i) => (
          <Santa
            key={i}
            index={i}
            id={santa.id}
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
                  _santas.push({ name: "", email: "", id: i + 1 });
                } else if (!e.target.value && santas.length > i + 1) {
                  if (!santas[i + 1].name) {
                    _santas = _santas.slice(0, -1);
                  }
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
          />
        ))}
      </div>
      <Email />
    </Scrollable.div>
  );
}

function Santa(props) {
  const doNotPairWithIds = props.invalidPairs
    .filter((pair) => pair.includes(props.id))
    .flat();

  return (
    <div style={{ width: "50%", minWidth: "30rem", padding: 5 }}>
      <Card>
        <div
          style={{ padding: "1rem", textAlign: "center", fontWeight: "bold" }}
        >
          Santa {props.index + 1}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", padding: 5 }}>
          <div style={{ flex: 1, padding: 5 }}>
            <Input
              label="Name"
              type="text"
              placeholder="Name"
              error={
                props.santas.filter((santa) => santa.name === props.name)
                  .length > 1
                  ? "Names must be unique"
                  : null
              }
              value={props.name || ""}
              onChange={props.onChangeName}
            />

            <Input
              label="Email"
              type="text"
              placeholder="Email"
              error={
                !props.email && props.santas.length > props.index + 2
                  ? "Please enter an email address"
                  : !/\S+@\S+\.\S+/.test(props.email) &&
                    props.santas.length > props.index + 2
                  ? "Invalid email address"
                  : null
              }
              value={props.email}
              onChange={props.onChangeEmail}
            />
          </div>
          {props.santas.filter((santa) => santa.name).length > 1 ? (
            <div style={{ flex: 1, padding: 5 }}>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ marginTop: 10 }}>
                  Do not pair {props.name} with
                </span>
                {/* <select
          multiple
          onChange={props.onChangeDoNotPairWith}
          value={doNotPairWith}
        > */}
                <Scrollable.div className={styles.checkboxes}>
                  {props.santas
                    .filter((santa) => santa.id !== props.id && santa.name)
                    .map((santa, i) => {
                      const selected = doNotPairWithIds.includes(santa.id);

                      return (
                        <Checkbox
                          label={santa.name}
                          checked={selected}
                          key={i}
                          value={santa.id}
                          onChange={() =>
                            selected
                              ? props.onRemoveInvalidPair([props.id, santa.id])
                              : props.onAddInvalidPair([props.id, santa.id])
                          }
                        />
                      );
                    })}
                </Scrollable.div>
              </label>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
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
  const classNames = [styles.input];
  if (props.error) {
    classNames.push(styles.error);
  }
  return (
    <label className={classNames.join(" ")}>
      <span className={styles.label}>{props.label}</span>
      <input {...props} />
      {props.error ? <span className={styles.error}>{props.error}</span> : null}
    </label>
  );
}

function TextArea(props) {
  const classNames = [styles.input];
  if (props.error) {
    classNames.push(styles.error);
  }
  return (
    <label className={classNames.join(" ")}>
      <span className={styles.label}>{props.label}</span>
      <Scrollable.textarea {...props} />
      {props.error ? <span className={styles.error}>{props.error}</span> : null}
    </label>
  );
}

function Email(props) {
  const [subject, setSubject] = useRecoilState(subjectState);
  const [message, setMessage] = useRecoilState(messageState);
  return (
    <div style={{ padding: "5px 10px 10px 10px" }}>
      <Card>
        <div style={{ padding: 10 }}>
          <Input
            label="From"
            type="text"
            placeholder="Subject"
            value="secret-santa@hectorbennett.com"
            disabled={true}
          />
          <Input
            label="Subject"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextArea
            label="Message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </Card>
    </div>
  );
}
