// import { useEffect, useState, useRef, useCallback } from "react";
// import {
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
//   useResetRecoilState,
// } from "recoil";

// import { Grid, Row, Col } from "../Grid";

// import Scrollable from "../Scrollable";
// import Checkbox from "../Checkbox";
// import styles from "./SecretSanta.module.scss";

// import { has_valid_derangement } from "./has_valid_derangement";

// import { Input } from "../Input";
// import Card from "../Card";

// import Message from "./Message";
// import Santa from "./Santa";

// const DEFAULT_SUBJECT = `Top secret santa email for {santa}`;

// const DEFAULT_MESSAGE = `Dear {santa},

// You have been assigned {giftee} as your giftee.

// The limit is set at £15.

// Good luck, and merry Christmas

// Love, SantaBot 3000
// Ho Ho Ho
// xxx`;

// const subjectState = atom({
//   key: "subjectState",
//   default: DEFAULT_SUBJECT,
// });

// const messageState = atom({
//   key: "messageState",
//   default: DEFAULT_MESSAGE,
// });

// const subjectErrorState = selector({
//   key: "subjectErrorState",
//   get: ({ get }) => {
//     const subject = get(subjectState);
//     if (!subject) {
//       return "Add a subject";
//     }
//     return "";
//   },
// });

// const messageErrorState = selector({
//   key: "messageErrorState",
//   get: ({ get }) => {
//     const message = get(messageState);
//     if (!message) {
//       return "Add a message";
//     }
//     if (!message.includes("{santa}")) {
//       return "The text '{santa}' (without quotation marks) must exist at least once within the body of the email";
//     }
//     if (!message.includes("{giftee}")) {
//       return "The text '{giftee}' (without quotation marks) must exist at least once within the body of the email";
//     }
//     return "";
//   },
// });

// const hasValidDerangementState = selector({
//   key: "hasValidDerangement",
//   get: ({ get }) => {
//     const santas = get(santaListState);
//     const invalidPairs = get(invalidPairsState);
//     const getSantaNameFromId = (id) => {
//       return santas.find((santa) => santa.id === id).name;
//     };
//     return has_valid_derangement(
//       santas.map((santa) => santa.name).filter(Boolean),
//       invalidPairs.map((pair) => [
//         getSantaNameFromId(pair[0]),
//         getSantaNameFromId(pair[1]),
//       ])
//     );
//   },
// });

// const santaListState = atom({
//   key: "santaListState",
//   default: [
//     {
//       id: 0,
//       name: "",
//       email: "",
//       nameError: "",
//       emailError: "",
//     },
//   ],
// });

// const invalidPairsState = atom({
//   key: "invalidPairs",
//   default: [],
// });

// export default function SecretSanta(props) {
//   const [santas, setSantas] = useRecoilState(santaListState);

//   const resetSubject = useResetRecoilState(subjectState);
//   const resetMessage = useResetRecoilState(messageState);
//   // const resetSubjectErrors = useResetRecoilState(subjectErrorState);
//   // const resetMessageErrors = useResetRecoilState(messageErrorState);
//   const resetSantaList = useResetRecoilState(santaListState);
//   const resetInvalidPairs = useResetRecoilState(invalidPairsState);

//   useEffect(() => {
//     return () => {
//       resetSubject();
//       resetMessage();
//       // resetSubjectErrors();
//       // resetMessageErrors();
//       resetSantaList();
//       resetInvalidPairs();
//     };
//   }, [resetSubject, resetMessage, resetSantaList, resetInvalidPairs]);

//   return (
//     <Scrollable.div className={styles.secret_santa}>
//       {/* <div
//         style={{ display: "flex", width: "100%", flexWrap: "wrap", padding: 5 }}
//       > */}
//       <Grid>
//         <Row>
//           {/* <TransitionGroup> */}
//           {santas.map((santa, i) => (
//             // <CSSTransition key={i} timeout={500} classNames="item">
//             <Col key={i} sm={12} md={6} lg={4}>
//               <Santa
//                 id={santa.id}
//                 onChangeName={(e) => {
//                   setSantas((santas) => {
//                     var _santas = santas.map((santa, j) => {
//                       if (i == j) {
//                         return { ...santa, name: e.target.value };
//                       }
//                       return santa;
//                     });
//                     if (e.target.value && santas.length === i + 1) {
//                       _santas.push({ name: "", email: "", id: i + 1 });
//                     } else if (!e.target.value && santas.length > i + 1) {
//                       if (!santas[i + 1]?.name) {
//                         _santas = _santas.slice(0, -1);
//                       }
//                     }
//                     return _santas;
//                   });
//                 }}
//                 onChangeEmail={(e) => {
//                   setSantas((santas) =>
//                     santas.map((santa, j) => {
//                       if (i == j) {
//                         return { ...santa, email: e.target.value };
//                       }
//                       return santa;
//                     })
//                   );
//                 }}
//               />
//             </Col>
//             // </CSSTransition>
//           ))}
//         </Row>
//       </Grid>

//       {/* </TransitionGroup> */}
//       {/* </div> */}
//       <Message />
//     </Scrollable.div>
//   );
// }

export default function Thing() {
  return null;
}
