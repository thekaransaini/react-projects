import useQuiz from "../hooks/useQuiz";

export default function Options({ que }) {
  const { state, dispatch } = useQuiz();
  const { answers, index } = state;
  const { correctOption } = que;
  const hasAnswered = answers[index] !== undefined;

  return (
    <div className="options">
      {que.options.map((option, optionIndex) => (
        <button
          className={`btn btn-ui btn-option ${answers[index] === optionIndex && "answer"} ${hasAnswered && (correctOption === optionIndex ? "correct" : "wrong")}`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "answer", payload: optionIndex })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
