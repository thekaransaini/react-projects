import { useState } from "react";
import GeneralInstructions from "./GeneralInstructions";
import QuizLevel from "./QuizLevel";
import QuizTerms from "./QuizTerms";

export default function StartScreen({ dispatch, numQuestions }) {
  const [check, setCheck] = useState(false);

  function handleChange(value) {
    setCheck(value);
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <GeneralInstructions />
      <QuizLevel />
      <QuizTerms check={check} onChange={handleChange} />
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
