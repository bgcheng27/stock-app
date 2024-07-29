import { NavLink } from "react-router-dom";

export function SearchDropdown({ options }) {
  return (
    <div className="dropdown">
      <ul className="search-bar-list">
        {options.map((option) => {
          return (
            <li className="search-list-item">
              <NavLink>{option["1. symbol"]}</NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
