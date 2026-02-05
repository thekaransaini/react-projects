import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import QuestionNavigator from "./QuestionNavigator";
import StatusLegend from "./StatusLegend";
import QuestionPalette from "./QuestionPalette";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  answers: [],
  points: 0,
  highscore: 0,
};

const negativeMarkingRatio = 0.3;

function reducer(state, action) {
  const { index, questions, points, highscore, answers } = state;
  const { type, payload } = action;
  const question = questions[index];
  const isAnswerCorrect = question?.correctOption === payload;
  const penalty = Math.trunc(negativeMarkingRatio * question?.points);

  switch (type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", index: 0, points: 0, answers: [] };
    case "answer":
      answers[index] = payload;
      return {
        ...state,
        points: points + (isAnswerCorrect ? question.points : -penalty),
      };
    case "nextQuestion":
      return { ...state, index: index + 1 };
    case "prevQuestion":
      return { ...state, index: index - 1 };
    case "goToQuestion":
      return { ...state, index: payload };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: highscore > points ? highscore : points,
      };
    default:
      throw new Error("Action unknown!");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answers, points, highscore } = state;
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
      <div className="app-main">
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
                points={points}
                maxPoints={maxPoints}
              />
              <Question
                questions={questions}
                index={index}
                answers={answers}
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
          {status === "active" && (
            <>
              <PrevButton dispatch={dispatch} index={index} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            </>
          )}
        </Footer>
      </div>
      <aside className="app-sidebar">
        {status === "active" && (
          <QuestionNavigator>
            <StatusLegend />
            <QuestionPalette numQuestions={numQuestions} dispatch={dispatch} />
          </QuestionNavigator>
        )}
      </aside>
    </div>
  );
}
