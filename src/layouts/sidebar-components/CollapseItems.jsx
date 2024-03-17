import { NavLink } from "react-router-dom";

// To Be
const USER_STOCKS = ["GOOG", "HD", "JPM", "JNJ"]

export function CollapseItems({ children }) {
  return (
    <div className="bg-white py-2 collapse-inner rounded">
      { children }
    </div>
  );
}
