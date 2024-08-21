export function OverviewRow({ label, value }) {
  return (
    <>
      <div className="overview-label-styles d-flex justify-content-between">
        <span className="font-weight-bold">{label}:</span>
        <span>{value}</span>
      </div>
    </>
  );
}
