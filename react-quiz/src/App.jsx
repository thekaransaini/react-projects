import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import Footer from "./Footer";
import NextButton from "./NextButton";

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
};

function reducer(state, action) {
  const { index } = state;
  const { type, payload } = action;

  switch (type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "answer":
      return { ...state, answer: payload };
    case "nextQuestion":
      return { ...state, index: index + 1, answer: null };
    default:
      throw new Error("Action unknown!");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer } = state;
  const numQuestions = questions.length;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
        console.log(res);
        console.log(data);
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
            />
            <Question
              questions={questions}
              index={index}
              answer={answer}
              dispatch={dispatch}
            />
          </>
        )}
      </Main>
      <Footer>{answer !== null && <NextButton dispatch={dispatch} />}</Footer>
    </div>
  );
}
