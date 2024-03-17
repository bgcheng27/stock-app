import { NavLink } from "react-router-dom";

export const USER_STOCKS = ["GOOG", "HD", "JPM", "JNJ", "TSLA", "NVDA"]

export function CollapseItems({ children }) {
  return (
    <div className="bg-white py-2 collapse-inner rounded">
      { children }
    </div>
  );
}
