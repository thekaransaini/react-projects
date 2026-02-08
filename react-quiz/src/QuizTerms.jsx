export default function QuizTerms({ check, onChange }) {
  return (
    <div className="quiz-terms">
      <input
        type="checkbox"
        id="quiz-terms"
        required
        checked={check}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor="quiz-terms">
        I have read and understood the above instructions and agree to follow
        them during the quiz.
      </label>
    </div>
  );
}
