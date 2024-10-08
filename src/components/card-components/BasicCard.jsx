export function BasicCard({ children, title, styleClasses = "", }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
      </div>
      <div className={`card-body ${styleClasses}`}>{children}</div>
    </div>
  );
}
