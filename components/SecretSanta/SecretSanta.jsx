import { useEffect, useState, useRef } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";

import { RiSendPlaneLine, RiSpamLine } from "react-icons/ri";

import Scrollable from "../Scrollable";
import Checkbox from "../Checkbox";
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

const subjectErrorState = selector({
  key: "subjectErrorState",
  get: ({ get }) => {
    const subject = get(subjectState);
    if (!subject) {
      return "Add a subject";
    }
    return "";
  },
});

const messageErrorState = selector({
  key: "messageErrorState",
  get: ({ get }) => {
    const message = get(messageState);
    if (!message) {
      return "Add a message";
    }
    if (!message.includes("{santa}")) {
      return "The text '{santa}' (without quotation marks) must exist at least once within the body of the email";
    }
    if (!message.includes("{giftee}")) {
      return "The text '{giftee}' (without quotation marks) must exist at least once within the body of the email";
    }
    return "";
  },
});

const santaListState = atom({
  key: "santaListState",
  default: [
    {
      id: 0,
      name: "",
      email: "",
      nameError: "",
      emailError: "",
    },
  ],
});

const invalidPairsState = atom({
  key: "invalidPairs",
  default: [],
});

export default function SecretSanta(props) {
  const [santas, setSantas] = useRecoilState(santaListState);

  const resetSubject = useResetRecoilState(subjectState);
  const resetMessage = useResetRecoilState(messageState);
  // const resetSubjectErrors = useResetRecoilState(subjectErrorState);
  // const resetMessageErrors = useResetRecoilState(messageErrorState);
  const resetSantaList = useResetRecoilState(santaListState);
  const resetInvalidPairs = useResetRecoilState(invalidPairsState);

  useEffect(() => {
    return () => {
      resetSubject();
      resetMessage();
      // resetSubjectErrors();
      // resetMessageErrors();
      resetSantaList();
      resetInvalidPairs();
    };
  }, []);

  return (
    <Scrollable.div className={styles.secret_santa}>
      <div
        style={{ display: "flex", width: "100%", flexWrap: "wrap", padding: 5 }}
      >
        {/* <TransitionGroup> */}
        {santas.map((santa, i) => (
          // <CSSTransition key={i} timeout={500} classNames="item">
          <Santa
            key={i}
            id={santa.id}
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
          />
          // </CSSTransition>
        ))}
        {/* </TransitionGroup> */}
      </div>
      <Message />
    </Scrollable.div>
  );
}

function Santa(props) {
  const ref = useRef();
  const [santas, setSantas] = useRecoilState(santaListState);
  const [nameError, setNameError] = useState("name error");
  const [emailError, setEmailError] = useState("email error");
  const [showingNameError, setShowingNameError] = useState(false);
  const [showingEmailError, setShowingEmailError] = useState(false);

  const santa = santas.find((santa) => santa.id === props.id);

  const modifySanta = (updates) => {
    setSantas((santas) => {
      return santas.map((s) => {
        if (s.id === santa.id) {
          return { ...s, ...updates };
        } else {
          return s;
        }
      });
    });
  };

  useEffect(() => {
    modifySanta({ nameError: nameError });
  }, [nameError]);

  useEffect(() => {
    modifySanta({ emailError: emailError });
  }, [emailError]);

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
  }, [santas]);

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
    <div
      style={{ width: "50%", minWidth: "30rem", padding: 5 }}
      onBlur={handleBlur}
      ref={ref}
    >
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

function InvalidPairs(props) {
  const santas = useRecoilValue(santaListState);
  const [invalidPairs, setInvalidPairs] = useRecoilState(invalidPairsState);
  const doNotPairWithIds = invalidPairs
    .filter((pair) => pair.includes(props.id))
    .flat();
  return (
    <label style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <span style={{ marginTop: 10 }}>Do not pair with</span>
      <Scrollable.div className={styles.checkboxes} style={{ flex: 1 }}>
        {santas
          .filter((santa) => santa.id !== props.id && santa.name)
          .map((santa, i) => {
            const selected = doNotPairWithIds.includes(santa.id);

            return (
              <CheckboxLabel
                label={santa.name}
                checked={selected}
                key={i}
                value={santa.id}
                onChange={() =>
                  selected
                    ? setInvalidPairs((pairs) =>
                        pairs.filter(
                          (p) => !(p.includes(props.id) && p.includes(santa.id))
                        )
                      )
                    : setInvalidPairs((pairs) => {
                        return [...pairs, [props.id, santa.id]];
                      })
                }
              />
            );
          })}
      </Scrollable.div>
    </label>
  );
}

function CheckboxLabel(props) {
  return (
    <label className={styles.checkbox}>
      <Checkbox type="checkbox" {...props} />
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

function Message(props) {
  const [subject, setSubject] = useRecoilState(subjectState);
  const [message, setMessage] = useRecoilState(messageState);
  const messageError = useRecoilValue(messageErrorState);
  const subjectError = useRecoilValue(subjectErrorState);
  return (
    <div style={{ padding: "5px 10px 10px 10px" }}>
      <Card>
        <div style={{ padding: 10 }}>
          <Input
            label="From"
            type="text"
            placeholder="Subject"
            value="SantaBot 3000 <secret-santa@hectorbennett.com>"
            disabled={true}
          />
          <Input
            label="Subject"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={subjectError}
          />
          <TextArea
            label="Message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={messageError}
          />
        </div>
        <div style={{ padding: 10 }}>
          <SendButton />
        </div>
      </Card>
    </div>
  );
}

function ErrorAlert(props) {
  return (
    <div className={styles.error_alert}>
      <div className={styles.alert_icon}>
        <RiSpamLine />
      </div>
      {props.children}
    </div>
  );
}

function SendButton(props) {
  const subject = useRecoilValue(subjectState);
  const message = useRecoilValue(messageState);
  const messageError = useRecoilValue(messageErrorState);
  const subjectError = useRecoilValue(subjectErrorState);
  const santas = useRecoilValue(santaListState).filter(
    (santa) => santa.name || santa.email
  );
  const invalidPairs = useRecoilValue(invalidPairsState);

  const getSantaNameFromId = (id) => {
    return santas.find((santa) => santa.id === id).name;
  };

  const errors = (() => {
    var e = [];
    if (santas.length < 3) {
      e.push("You must add at least 3 santas");
    }
    if (santas.some((santa) => santa.emailError || santa.nameError)) {
      e.push("You must fix all the errors on the santas");
    }
    if (subjectError) {
      e.push("You must fix all the errors on the subject");
    }
    if (messageError) {
      e.push("You must fix all the errors on the message");
    }
    return e;
  })();

  const handleClick = () => {
    const data = {
      santas: santas.map((santa) => ({
        santa: santa.name,
        email: santa.email,
      })),
      invalid_pairs: invalidPairs.map((pair) => [
        getSantaNameFromId(pair[0]),
        getSantaNameFromId(pair[1]),
      ]),
      subject: subject,
      message: message,
      test: true,
    };
    console.log(data);
  };
  return (
    <>
      {errors.length ? (
        <ErrorAlert>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </ErrorAlert>
      ) : null}
      <button
        className={styles.button}
        disabled={errors.length}
        onClick={handleClick}
      >
        <RiSendPlaneLine /> Send
      </button>
    </>
  );
}
