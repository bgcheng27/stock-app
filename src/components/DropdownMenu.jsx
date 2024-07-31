import { useEffect, useRef, useState } from "react";
import { apiKeyVal } from "../js/data/financialsConfig";


export function DropdownMenu({ color, options, fn }) {
  const [isShowing, setIsShowing] = useState(false);
  const [selected, setSelected] = useState(options[0])
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsShowing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return (() => document.removeEventListener("mousedown", handleClickOutside))
  }, [ref])

  return (
    <div className="dropdown" style={{ width: "auto" }} ref={ref}>
      <button
        className={`btn btn-${color} dropdown-toggle`}
        id="dropdownMenuButton"
        type="button"
        onClick={() => setIsShowing((p) => !p)}
      >
        {selected}
      </button>

      <div className={`dropdown-menu ${isShowing ? "show" : ""}`} >
        {options.map((option) => {
          return (
            <div
              key={crypto.randomUUID()}
              onClick={(event) => {
                fn(apiKeyVal[option])
                setSelected(event.target.textContent)
                setIsShowing(false)
              }}
              className="dropdown-item"
            >{option}</div>
          )
        })}
      </div>
    </div>
  );
}
