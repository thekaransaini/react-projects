export default function QuestionPalette({ numQuestions, dispatch }) {
  return (
    <div className="question-palette">
      {Array.from({ length: numQuestions }, (_, i) => (
        <button
          key={i}
          className="nav-btn clickable"
          onClick={() => dispatch({ type: "goToQuestion", payload: i })}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
