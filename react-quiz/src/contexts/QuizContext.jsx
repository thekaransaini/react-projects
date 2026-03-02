import { createContext } from "react";
import useQuizLogic from "../hooks/useQuizLogic";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const { state, dispatch, numQuestions, maxPoints } = useQuizLogic();

  return (
    <QuizContext.Provider value={{ state, dispatch, numQuestions, maxPoints }}>
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
