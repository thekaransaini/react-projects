import useQuiz from "./hooks/useQuiz";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import GeneralInstructions from "./components/GeneralInstructions";
import QuizLevel from "./components/QuizLevel";
import QuizTerms from "./components/QuizTerms";
import Progress from "./components/Progress";
import Question from "./components/Question";
import QuestionNavigator from "./components/QuestionNavigator";
import StatusLegend from "./components/StatusLegend";
import QuestionPalette from "./components/QuestionPalette";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import PrevButton from "./components/PrevButton";
import NextButton from "./components/NextButton";
import Timer from "./components/Timer";
import Loader from "./components/Loader";

export default function App() {
  const { state, dispatch } = useQuiz();
  const {
    status,
    questions,
    index,
    points,
    highscore,
    quizLevel,
    answers,
    queVisited,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

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
          {status === "active" &&
            (questions.length ? (
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
            ) : (
              <Loader />
            ))}
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
