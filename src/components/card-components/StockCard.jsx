export function StockCard({ children, title, color, icon }) {
  return (
    <div className={`card border-left-${color} shadow h-100 py-2`}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
              {title}
            </div>

            {children}
          </div>
          <div className="col-auto">
            <i className={`fas fa-${icon} fa-2x text-gray-300`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
