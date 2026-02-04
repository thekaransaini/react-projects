export default function Progress({ index, numQuestions, points, maxPoints }) {
  return (
    <div className="progress">
      <progress value={index + 1} max={numQuestions} />
      <p>
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        {points} / {maxPoints}
      </p>
    </div>
  );
}
