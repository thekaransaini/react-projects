export default function PrevButton({ dispatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "prevQuestion" })}
    >
      Prev
    </button>
  );
}
