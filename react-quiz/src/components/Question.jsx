import useQuiz from "../hooks/useQuiz";
import Options from "./Options";

export default function Question() {
  const { state } = useQuiz();
  const { questions, index } = state;
  const que = questions[index];

  return (
    <div className="question">
      <h4>{que.question}</h4>
      <Options que={que} />
    </div>
  );
}
