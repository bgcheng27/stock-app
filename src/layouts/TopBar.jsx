import { useState } from "react";
import { SearchDropdown } from "../components/SearchDropdown";

export function TopBar() {
  const [searchInput, setSearchInput] = useState("");

  const [tickerOptions, setTickerOptions] = useState([]);

  
  const handleInputChange = (event) => {
    const term = event.target.value;

    setSearchInput(term);
    fetchTickerOptions(term);
  };

  // Function to fetch dropdown options from an API
  const fetchTickerOptions = async (term) => {
    const data = await searchDemo()

    setTickerOptions(data.bestMatches)
    console.log(data.bestMatches)
  };



  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>

        {/* Search Bar */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              value={searchInput}
              onChange={handleInputChange}
              type="text"
              className="ticker-search form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary search-btn" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>

            { tickerOptions.length > 0 && <SearchDropdown options={tickerOptions} /> }

          </div>      
        </form>

      </nav>
    </>
  );
}
