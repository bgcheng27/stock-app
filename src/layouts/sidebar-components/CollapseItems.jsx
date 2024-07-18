import { NavLink } from "react-router-dom";


export function CollapseItems({ children }) {
  return (
    <div className="bg-white py-2 collapse-inner rounded">
      { children }
    </div>
  );
}
