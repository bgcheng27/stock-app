export function ProgressBar({ label, percent = 0, color = "" }) {
    
  return (
    <>
      <h4 className="small font-weight-bold">
        {label} <span className="float-right">{percent}%</span>
      </h4>
      <div className="progress mb-4">
        <div
          className={`progress-bar ${color}`}
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </>
  );
}
