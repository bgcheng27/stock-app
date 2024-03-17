export function Table({ children }) {
  return (
    <>
      <div className="table-responsive">
        <table
          className="table table-bordered"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          {children}
        </table>
      </div>
    </>
  );
}
