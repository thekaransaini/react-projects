export default function QuizLevel() {
  return (
    <div className="quiz-level">
      <label htmlFor="quiz-level">Choose difficulty level:</label>
      <select id="quiz-level">
        <option value="easyQuestions">Easy</option>
        <option value="mediumQuestions">Medium</option>
        <option value="hardQuestions">Hard</option>
        <option value="veryHardQuestions">Very Hard</option>
      </select>
    </div>
  );
}
