import { useRecoilState, useRecoilValue } from "recoil";

import { RiSendPlaneLine, RiSpamLine } from "react-icons/ri";

import styles from "./SecretSanta.module.scss";

import { Input, TextArea } from "../Input";
import Card from "../Card";

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
  const santas = useRecoilValue(santaListState).filter((santa) => santa.name || santa.email);
  const invalidPairs = useRecoilValue(invalidPairsState);
  const hasValidDerangement = useRecoilValue(hasValidDerangementState);
  // const [hasValidDerangement, setHasValidDerangement] = useState(false);

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
    if (santas.length >= 3 && !hasValidDerangement) {
      e.push("Too many restrictions");
    }
    return e;
  })();

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

  const handleClick = () => {
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
      <button className={styles.button} disabled={errors.length} onClick={handleClick}>
        <RiSendPlaneLine /> Send
      </button>
    </>
  );
}

export default function Message(props) {
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
