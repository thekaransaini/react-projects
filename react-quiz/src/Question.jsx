import Options from "./Options";

export default function Question({ questions, index, answer, dispatch }) {
  const que = questions[index];

  return (
    <div className="question">
      <h4>{que.question}</h4>
      <Options que={que} answer={answer} dispatch={dispatch} />
    </div>
  );
}
