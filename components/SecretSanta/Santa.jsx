import { useEffect, useState, useRef, useCallback } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";

import { Grid, Row, Col } from "../Grid";

import Scrollable from "../Scrollable";
import Checkbox from "../Checkbox";

import { has_valid_derangement } from "./has_valid_derangement";

import { Input } from "../Input";
import Card from "../Card";

import styles from "./Santa.module.scss";

function InvalidPairs(props) {
  const santas = useRecoilValue(santaListState);
  const [invalidPairs, setInvalidPairs] = useRecoilState(invalidPairsState);
  const hasValidDerangement = useRecoilValue(hasValidDerangementState);
  const doNotPairWithIds = invalidPairs
    .filter((pair) => pair.includes(props.id))
    .flat();

  const classNames = [styles.checkboxes];
  if (santas.length >= 3 && !hasValidDerangement) {
    classNames.push(styles.error);
  }
  return (
    <label style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <span style={{ marginTop: 10 }}>Do not pair with</span>
      <Scrollable.div className={classNames.join(" ")} style={{ flex: 1 }}>
        {santas
          .filter((santa) => santa.id !== props.id && santa.name)
          .map((santa, i) => {
            const selected = doNotPairWithIds.includes(santa.id);
            return (
              <Checkbox.label label={santa.name} key={i}>
                <Checkbox
                  checked={selected}
                  value={santa.id}
                  disabled={!selected && !hasValidDerangement}
                  onChange={() =>
                    selected
                      ? setInvalidPairs((pairs) =>
                          pairs.filter(
                            (p) =>
                              !(p.includes(props.id) && p.includes(santa.id))
                          )
                        )
                      : setInvalidPairs((pairs) => {
                          return [...pairs, [props.id, santa.id]];
                        })
                  }
                />
              </Checkbox.label>
            );
          })}
      </Scrollable.div>
    </label>
  );
}

export default function Santa(props) {
  const ref = useRef();
  const [santas, setSantas] = useRecoilState(santaListState);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showingNameError, setShowingNameError] = useState(false);
  const [showingEmailError, setShowingEmailError] = useState(false);

  const santa = santas.find((santa) => santa.id === props.id);

  const modifySanta = useCallback(
    (updates) => {
      setSantas((santas) => {
        return santas.map((s) => {
          if (s.id === santa.id) {
            return { ...s, ...updates };
          } else {
            return s;
          }
        });
      });
    },
    [setSantas, santa.id]
  );

  useEffect(() => {
    modifySanta({ nameError: nameError });
  }, [nameError, modifySanta]);

  useEffect(() => {
    modifySanta({ emailError: emailError });
  }, [emailError, modifySanta]);

  useEffect(() => {
    if (!santa.email) {
      setEmailError("Please enter an email address");
    } else if (!/\S+@\S+\.\S+/.test(santa.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (!santa.name) {
      setNameError("Please enter a name");
    } else if (
      santas.filter((s) => s.name.toLowerCase() == santa.name.toLowerCase())
        .length > 1
    ) {
      setNameError("Duplicate");
    } else {
      setNameError("");
    }
  }, [santas, santa.email, santa.name]);

  const handleBlur = (e) => {
    if (ref.current.contains(e.relatedTarget)) {
      return;
    }
    if (props.index == santas.length - 1 && !santa.email && !santa.name) {
      setShowingNameError(false);
      setShowingEmailError(false);
      return;
    }
    setShowingNameError(true);
    setShowingEmailError(true);
  };

  return (
    <div style={{ width: "100%", padding: 5 }} onBlur={handleBlur} ref={ref}>
      <Card>
        <div
          style={{ padding: "1rem", textAlign: "center", fontWeight: "bold" }}
        >
          Santa {props.index + 1}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", padding: 5 }}>
          <div
            style={{
              flex: 1,
              padding: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Input
              label="Name"
              type="text"
              placeholder="Name"
              value={santa.name}
              onChange={props.onChangeName}
              error={showingNameError ? santa.nameError : null}
            />

            <Input
              label="Email"
              type="text"
              placeholder="Email"
              value={santa.email}
              onChange={props.onChangeEmail}
              error={showingEmailError ? santa.emailError : null}
            />
          </div>
          <div style={{ flex: 1, padding: 5, display: "flex" }}>
            <InvalidPairs id={props.id} />
          </div>
        </div>
      </Card>
    </div>
  );
}
