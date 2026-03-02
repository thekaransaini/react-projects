import useQuiz from "../hooks/useQuiz";

export default function PrevButton() {
  const { state, dispatch } = useQuiz();
  const { index } = state;
  return (
    <button
      className={`btn btn-ui ${index <= 0 && "hide"}`}
      onClick={() => dispatch({ type: "prevQuestion" })}
    >
      Prev
    </button>
  );
}
