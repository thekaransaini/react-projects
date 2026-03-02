import { useState } from "react";
import useQuiz from "../hooks/useQuiz";

export default function QuizTerms() {
  const [check, setCheck] = useState(false);
  const { dispatch } = useQuiz();

  return (
    <div className="quiz-terms">
      <div className="terms">
        <input
          type="checkbox"
          id="terms"
          required
          checked={check}
          onChange={(e) => setCheck(e.target.checked)}
        />
        <label htmlFor="terms">
          I have read and understood the above instructions and agree to follow
          them during the quiz.
        </label>
      </div>
      <button
        className="btn btn-ui"
        disabled={!check}
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
