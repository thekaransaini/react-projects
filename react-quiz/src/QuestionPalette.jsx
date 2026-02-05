export default function QuestionPalette({ numQuestions }) {
  return (
    <div className="question-palette">
      {Array.from({ length: numQuestions }, (_, i) => (
        <button key={i} className="nav-btn clickable">
          {i + 1}
        </button>
      ))}
    </div>
  );
}
