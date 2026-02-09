import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import StartScreen from "./StartScreen";
import GeneralInstructions from "./GeneralInstructions";
import QuizLevel from "./QuizLevel";
import QuizTerms from "./QuizTerms";
import Progress from "./Progress";
import Question from "./Question";
import QuestionNavigator from "./QuestionNavigator";
import StatusLegend from "./StatusLegend";
import QuestionPalette from "./QuestionPalette";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import Timer from "./Timer";

const secsPerQue = 30;

const initialState = {
  status: "ready",
  questions: [],
  index: 0,
  answers: [],
  points: 0,
  highscore: 0,
  queVisited: [],
  quizLevel: "easy",
  secondsRemaining: null,
};

const negativeMarkingRatio = 0.3;

function reducer(state, action) {
  const {
    status,
    index,
    questions,
    points,
    highscore,
    answers,
    queVisited,
    secondsRemaining,
  } = state;
  const { type, payload } = action;
  const question = questions[index];
  const isAnswerCorrect = question?.correctOption === payload;
  const penalty = Math.trunc(negativeMarkingRatio * question?.points);

  switch (type) {
    case "setLevel":
      return { ...state, quizLevel: payload, status: "ready" };
    case "dataReceived":
      return { ...state, questions: payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      queVisited[index] = index;
      return {
        ...state,
        status: "active",
        index: 0,
        points: 0,
        answers: [],
        queVisited: [0],
        secondsRemaining: questions.length * secsPerQue,
      };
    case "answer":
      answers[index] = payload;
      return {
        ...state,
        points: points + (isAnswerCorrect ? question.points : -penalty),
      };
    case "nextQuestion":
      queVisited[index + 1] = index + 1;
      return { ...state, index: index + 1 };
    case "prevQuestion":
      queVisited[index - 1] = index - 1;
      return { ...state, index: index - 1 };
    case "goToQuestion":
      queVisited[payload] = payload;
      return { ...state, index: payload };
    case "timerTick":
      return {
        ...state,
        secondsRemaining: secondsRemaining - 1,
        status: secondsRemaining === 0 ? "finished" : status,
      };
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
  const {
    status,
    questions,
    index,
    answers,
    points,
    highscore,
    queVisited,
    quizLevel,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/${quizLevel}Questions`);
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
  }, [quizLevel]);

  return (
    <div className="app">
      <div className="app-main">
        <Header />
        <Main>
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions}>
              <GeneralInstructions />
              <QuizLevel dispatch={dispatch} />
              <QuizTerms dispatch={dispatch} />
            </StartScreen>
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
              quizLevel={quizLevel}
            />
          )}
        </Main>
        <Footer>
          {status === "active" && (
            <>
              <PrevButton dispatch={dispatch} index={index} />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
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
            <QuestionPalette
              numQuestions={numQuestions}
              dispatch={dispatch}
              answers={answers}
              queVisited={queVisited}
            />
          </QuestionNavigator>
        )}
      </aside>
    </div>
  );
}
