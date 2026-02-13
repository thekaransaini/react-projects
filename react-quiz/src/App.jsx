import useQuiz from "./useQuiz";
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
