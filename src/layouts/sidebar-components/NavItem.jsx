import { NavLink } from "react-router-dom"
import { CollapseItems } from "./CollapseItems";

export function NavItem({ children, name, icon, to = "#", collapsable = false, control }) {
  // CHANGE ID to USE ID. PLEASE!!!!!


  return (
    <li className="nav-item">
      <NavLink 
        className="nav-link" 
        to={to}
        { ...(collapsable && {
          "data-toggle": "collapse",
          "data-target": `#${control}`,
          "aria-expanded": "true",
          "aria-controls": `${control}`
        })}
      >
        <i className={`fas fa-fw ${icon}`}></i>
        <span>{name}</span>
      </NavLink>

      { 
        collapsable && 
        
        <div
          id={control}
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <CollapseItems>
            { children }
          </CollapseItems>
        </div>
      }
    </li>
  );
}
