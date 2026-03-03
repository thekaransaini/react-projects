import { useEffect, useReducer } from "react";

const BASE_URL = "https://react-quiz-json-4sao.onrender.com";
const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  answers: [],
  points: 0,
  highscore: 0,
  queVisited: [],
  quizLevel: "easy",
  secondsRemaining: null,
};
const secsPerQue = 30;
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
      return { ...state, quizLevel: payload };
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
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

export default function useQuizLogic() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { quizLevel, questions } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`${BASE_URL}/${quizLevel}Questions`);
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.log(err);
      }
    }
    fetchQuestions();
  }, [quizLevel]);

  return { state, dispatch, numQuestions, maxPoints };
}
