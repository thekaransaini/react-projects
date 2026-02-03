import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import NextButton from "./NextButton";

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  const { index, questions, points, highscore } = state;
  const { type, payload } = action;
  const question = questions[index];

  switch (type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", index: 0, points: 0 };
    case "answer":
      return {
        ...state,
        answer: payload,
        points:
          points + (question.correctOption === payload ? question.points : 0),
      };
    case "nextQuestion":
      return { ...state, index: index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore: highscore > points ? highscore : points,
      };
    default:
      throw new Error("Action unknown!");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points, highscore } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
        // console.log(res);
        // console.log(data);
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.log(err);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              answer={answer}
              points={points}
              maxPoints={maxPoints}
            />
            <Question
              questions={questions}
              index={index}
              answer={answer}
              dispatch={dispatch}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
      <Footer>
        {answer !== null && (
          <NextButton
            dispatch={dispatch}
            index={index}
            numQuestions={numQuestions}
          />
        )}
      </Footer>
    </div>
  );
}
