import { createContext } from "react";
import useQuiz from "../hooks/useQuizLogic";

const QuizContext = createContext();

export default function QuizProvider({ children }) {
  const { state, dispatch } = useQuiz();

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
