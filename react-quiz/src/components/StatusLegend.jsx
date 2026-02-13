export default function StatusLegend() {
  return (
    <div className="status-legend">
      <span>
        <button className="nav-btn not-visited">34</button>
        <p className="nav-btn-label">Not Visited</p>
      </span>
      <span>
        <button className="nav-btn not-answered">1</button>
        <p className="nav-btn-label">Not Answered</p>
      </span>
      <span>
        <button className="nav-btn answered">0</button>
        <p className="nav-btn-label">Answered</p>
      </span>
    </div>
  );
}
