export default function QuestionPalette({
  numQuestions,
  dispatch,
  answers,
  queVisited,
}) {
  return (
    <div className="question-palette">
      {Array.from({ length: numQuestions }, (_, i) => (
        <button
          key={i}
          className={`nav-btn clickable ${answers[i] !== undefined && "answered"} ${queVisited[i] !== undefined && answers[i] === undefined && "not-answered"} ${queVisited[i] === undefined && "not-visited"}`}
          onClick={() => dispatch({ type: "goToQuestion", payload: i })}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
