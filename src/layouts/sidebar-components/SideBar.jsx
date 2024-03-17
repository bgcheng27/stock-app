import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "./NavItem";
import { USER_STOCKS } from "./CollapseItems";

export function SideBar() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          isToggled ? "toggled" : ""
        }`}
        id="accordionSidebar"
      >
        <NavLink
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </NavLink>

        <hr className="sidebar-divider my-0" />

        <NavItem name="Dashboard" icon="fa-tachometer-alt" to="/dashboard" />

        <hr className="sidebar-divider" />

        <NavItem
          name="My Stocks"
          icon="fa-folder"
          collapsable={true}
          control="collapseStocks"
        >
          {USER_STOCKS.map((stock) => {
            return <NavLink className="collapse-item" to={`/stocks/${stock}`}>
              {stock}
            </NavLink>
          })}
        </NavItem>

        <NavItem name="Demo" icon="fa-chart-area" to="/demo" />
        <NavItem name="Learn" icon="fa-table" to="/learn" />

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="sidebar-heading">Articles</div>

        <NavItem name="About the Stock Market" icon="fa-chart-area" to="/articles/stock-market"/>
        <NavItem name="Picking Individual Stocks" icon="fa-table" to="/articles/pick-stocks" />
        <NavItem name="Important Vocabulary" icon="fa-table" to="/articles/vocab" />

        <NavItem
          name="Reading Financials"
          icon="fa-folder"
          collapsable={true}
          control="collapseFinancialArticles"
        >
          <NavLink className="collapse-item" to="/articles/financials/income-statement">
            Income Statement
          </NavLink>
          <NavLink className="collapse-item" to="/articles/financials/balance-sheet">
            Balance Sheet
          </NavLink>
          <NavLink className="collapse-item" to="/articles/financials/cash-flow">
            Cash Flow
          </NavLink>
        </NavItem>

        <hr className="sidebar-divider d-none d-md-block" />
        <div className="text-center d-none d-md-inline">
          <button
            onClick={() => setIsToggled(!isToggled)}
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    </>
  );
}
