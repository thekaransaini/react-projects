export default function PrevButton({ dispatch, index }) {
  return (
    <button
      className={`btn btn-ui ${index <= 0 && "hide"}`}
      onClick={() => dispatch({ type: "prevQuestion" })}
    >
      Prev
    </button>
  );
}
