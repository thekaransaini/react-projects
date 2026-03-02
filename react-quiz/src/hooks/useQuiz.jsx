import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

export default function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext is used outside the QuizProvider");
  return context;
}
