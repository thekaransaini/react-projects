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
import useQuiz from "./hooks/useQuiz";

export default function App() {
  const { state } = useQuiz();
  const { status } = state;

  return (
    <div className="app">
      <div className="app-main">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen>
              <GeneralInstructions />
              <QuizLevel />
              <QuizTerms />
            </StartScreen>
          )}
          {status === "active" && (
            <>
              <Progress />
              <Question />
            </>
          )}
          {status === "finished" && <FinishScreen />}
        </Main>
        <Footer>
          {status === "active" && (
            <>
              <PrevButton />
              <Timer />
              <NextButton />
            </>
          )}
        </Footer>
      </div>
      <aside className="app-sidebar">
        {status === "active" && (
          <QuestionNavigator>
            <StatusLegend />
            <QuestionPalette />
          </QuestionNavigator>
        )}
      </aside>
    </div>
  );
}
