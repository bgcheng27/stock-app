import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "./NavItem";
import { USER_STOCKS } from "../../js/mockData";

export function SideBar() {
  const [isToggled, setIsToggled] = useState(true);

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
          to={`/stocks/${USER_STOCKS[0]}`}
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </NavLink>

        <hr className="sidebar-divider my-0" />

        <NavItem
          name="My Stocks"
          icon="fa-folder"
          collapsable={true}
          control="collapseStocks"
        >
          {USER_STOCKS.map((stock) => {
            return <NavLink key={stock} className="collapse-item" to={`/stocks/${stock}`}>
              {stock}
            </NavLink>
          })}
        </NavItem>
      </ul>
    </>
  );
}
