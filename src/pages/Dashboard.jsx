import { StockCard } from "../components/card-components/StockCard";
import { MyPieChart } from "../components/chart-components/MyPieChart";
import { MyAreaChart } from "../components/chart-components/MyAreaChart";
import { DropdownCard } from "../components/card-components/DropdownCard";
import { ProgressBar } from "../components/ProgressBar";

function Dashboard() {
  return (
    <>
      {/* Begin Page Content */}
      {/* <div className="container-fluid"> */}
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <a
            href="#"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Generate
            Report
          </a>
        </div>

        {/* Content Row */}
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <StockCard
              title="Earnings (Monthly)"
              color="primary"
              icon="calendar"
            >
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $69,000
              </div>
            </StockCard>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <StockCard
              title="Earnings (Annual)"
              color="success"
              icon="dollar-sign"
            >
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $420,000
              </div>
            </StockCard>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <StockCard title="Tasks" color="info" icon="clipboard-list">
              <div className="row no-gutters align-items-center">
                <div className="col-auto">
                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                    50%
                  </div>
                </div>

                <div className="col">
                  <div className="progress progress-sm mr-2">
                    <div
                      className="progress-bar bg-info a1"
                      role="progressbar"
                      style={{ width: `${50}%` }}
                      aria-valuenow={50} aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            </StockCard>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <StockCard title="Pending Requests" color="warning" icon="comments">
              <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
            </StockCard>
          </div>
        </div>

        {/* Content Row */}
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <DropdownCard>
              <MyAreaChart />
            </DropdownCard>
          </div>
 
          <div className="col-xl-4 col-lg-5">
            <DropdownCard>
              <MyPieChart />
            </DropdownCard>
          </div>
        </div>

        {/* Content Row */}
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
              </div>
              <div className="card-body">
                <ProgressBar label="Server Migration" percent={20} color="bg-danger" />
                <ProgressBar label="Sales Tracking" percent={40} color="bg-warning" />
                <ProgressBar label="Customer Database" percent={90} />
                <ProgressBar label="Payout Details" percent={30} color="bg-info" />
                <ProgressBar label="Account Setup" percent={100} color="bg-success" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card bg-primary text-white shadow">
                  <div className="card-body">
                    Primary
                    <div className="text-white-50 small">#4e73df</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-success text-white shadow">
                  <div className="card-body">
                    Success
                    <div className="text-white-50 small">#1cc88a</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-info text-white shadow">
                  <div className="card-body">
                    Info
                    <div className="text-white-50 small">#36b9cc</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-warning text-white shadow">
                  <div className="card-body">
                    Warning
                    <div className="text-white-50 small">#f6c23e</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-danger text-white shadow">
                  <div className="card-body">
                    Danger
                    <div className="text-white-50 small">#e74a3b</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-secondary text-white shadow">
                  <div className="card-body">
                    Secondary
                    <div className="text-white-50 small">#858796</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-light text-black shadow">
                  <div className="card-body">
                    Light
                    <div className="text-black-50 small">#f8f9fc</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-dark text-white shadow">
                  <div className="card-body">
                    Dark
                    <div className="text-white-50 small">#5a5c69</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Illustrations
                </h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4 a7"
                    src="img/undraw_posting_photo.svg"
                    alt="..."
                  />
                </div>
                <p>
                  Add some quality, svg illustrations to your project courtesy
                  of{" "}
                  <a target="_blank" rel="nofollow" href="https://undraw.co/">
                    unDraw
                  </a>
                  , a constantly updated collection of beautiful svg images that
                  you can use completely free and without attribution!
                </p>
                <a target="_blank" rel="nofollow" href="https://undraw.co/">
                  Browse Illustrations on unDraw &rarr;
                </a>
              </div>
            </div>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Development Approach
                </h6>
              </div>
              <div className="card-body">
                <p>
                  SB Admin 2 makes extensive use of Bootstrap 4 utility classes
                  in order to reduce CSS bloat and poor page performance. Custom
                  CSS classes are used to create custom components and custom
                  utility classes.
                </p>
                <p className="mb-0">
                  Before working with this theme, you should become familiar
                  with the Bootstrap framework, especially the utility classes.
                </p>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
      {/* End of Main Content */}

      {/* Footer */}
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2021</span>
          </div>
        </div>
      </footer>
      {/* End of Footer */}
    </>
  );
}

export const dashboardRoute = {
  element: <Dashboard />,
};
