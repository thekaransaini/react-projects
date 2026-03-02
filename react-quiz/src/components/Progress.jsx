import useQuiz from "../hooks/useQuiz";

export default function Progress() {
  const { state, numQuestions, maxPoints } = useQuiz();
  const { index, points } = state;
  return (
    <div className="progress">
      <progress value={index + 1} max={numQuestions} />
      <p>
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        {points} / {maxPoints}
      </p>
    </div>
  );
}
