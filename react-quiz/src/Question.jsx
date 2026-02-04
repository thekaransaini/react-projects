import Options from "./Options";

export default function Question({ questions, index, answers, dispatch }) {
  const que = questions[index];

  return (
    <div className="question">
      <h4>{que.question}</h4>
      <Options que={que} answers={answers} dispatch={dispatch} index={index} />
    </div>
  );
}
