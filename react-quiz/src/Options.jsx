export default function Options({ que, answer, dispatch }) {
  const { correctOption } = que;
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {que.options.map((option, index) => (
        <button
          className={`btn btn-ui btn-option ${answer === index && "answer"} ${hasAnswered && (correctOption === index ? "correct" : "wrong")}`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "answer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
