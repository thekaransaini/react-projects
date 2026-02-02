export default function Progress({ index, numQuestions, answer }) {
  return (
    <div className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question {index + 1} / {numQuestions}
      </p>
    </div>
  );
}
