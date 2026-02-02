export default function Progress({
  index,
  numQuestions,
  answer,
  points,
  maxPoints,
}) {
  return (
    <div className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        {points} / {maxPoints}
      </p>
    </div>
  );
}
