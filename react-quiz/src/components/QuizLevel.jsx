import useQuiz from "../hooks/useQuiz";

export default function QuizLevel() {
  const { dispatch } = useQuiz();

  return (
    <div className="quiz-level">
      <label htmlFor="quiz-level">Choose difficulty level:</label>
      <select
        id="quiz-level"
        onChange={(e) =>
          dispatch({ type: "setLevel", payload: e.target.value })
        }
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="veryHard">Very Hard</option>
      </select>
    </div>
  );
}
