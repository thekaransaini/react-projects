export default function FinishScreen({
  points,
  maxPoints,
  dispatch,
  highscore,
  quizLevel,
}) {
  const levelLabels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    veryHard: "Very Hard",
  };
  const isScoreNonNegative = points >= 0;
  const percentage = (points / maxPoints) * 100;
  let emoji = "😔";
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "😐";

  return (
    <div className="finish">
      <p className="result">
        <span>{emoji}</span>You scored{" "}
        <strong>{isScoreNonNegative ? points : 0}</strong> out of {maxPoints}{" "}
        {isScoreNonNegative && `(${percentage.toFixed(2)}%)`} in the{" "}
        {levelLabels[quizLevel]} level.
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Restart
      </button>
    </div>
  );
}
