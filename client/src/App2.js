// import Header from "./react-quiz/Header";
// import Main from "./react-quiz/Main";
// import Loader from "./react-quiz/Loader";
// import Error from "./react-quiz/Error";
// import StartScreen from "./react-quiz/StartScreen";
// import Question from "./react-quiz/Question";
// import NextButton from "./react-quiz/NextButton";
// import Progress from "./react-quiz/Progress";
// import FinishScreen from "./react-quiz/FinishScreen";
// import { useQuiz } from "./react-quiz-context/QuizProvider";

// // const initialState = {
// //   questions: [],
// //   status: "loading",
// //   index: 0,
// //   answer: null,
// //   points: 0,
// //   highScore: 0,
// // };

// // function reducer(state, action) {
// //   switch (action.type) {
// //     case "dataFetched":
// //       return { ...state, status: "ready", questions: action.payload };
// //     case "error":
// //       return { ...state, status: "error" };
// //     case "start":
// //       return { ...state, status: "active" };
// //     case "newAnswer": {
// //       const question = state.questions.at(state.index);
// //       return {
// //         ...state,
// //         answer: action.payload,
// //         points:
// //           action.payload === question.correctOption
// //             ? state.points + question.points
// //             : state.points,
// //       };
// //     }
// //     case "nextQuestion": {
// //       return { ...state, answer: null, index: state.index + 1 };
// //     }
// //     case "finished": {
// //       return {
// //         ...state,
// //         status: "finished",
// //         highScore:
// //           state.points > state.highScore ? state.points : state.highScore,
// //       };
// //     }
// //     default:
// //       throw new Error("no option found");
// //   }
// // }

// export default function App2() {
//   const { status } = useQuiz();

//   return (
//     <div className="app">
//       <Header />
//       <Main>
//         {status === "loading" && <Loader />}
//         {status === "error" && <Error />}
//         {status === "ready" && <StartScreen />}
//         {status === "active" && (
//           <>
//             <Progress></Progress>
//             <Question />
//             <NextButton></NextButton>
//           </>
//         )}
//         {status === "finished" && <FinishScreen />}
//       </Main>
//     </div>
//   );
// }
