export default function StatusLegend() {
  return (
    <div className="status-legend">
      <span>
        <button className="nav-btn">34</button>
        <p className="nav-btn-label">Not Visited</p>
      </span>
      <span>
        <button className="nav-btn red">1</button>
        <p className="nav-btn-label">Not Answered</p>
      </span>
      <span>
        <button className="nav-btn green">0</button>
        <p className="nav-btn-label">Answered</p>
      </span>
    </div>
  );
}
