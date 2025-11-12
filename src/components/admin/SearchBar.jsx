import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";

const SearchBar = ({ containers, onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchResult("");
      onSearchResult("");
      return;
    }

    // Search logic through containers and slots
    for (const container of containers) {
      for (const slot of container.slots) {
        if (
          slot.item &&
          slot.item.name.toLowerCase().includes(term.toLowerCase())
        ) {
          const result = slot.item.takenBy
            ? `Found in ${container.name}, Slot ${slot.slotNumber} - Taken by ${slot.item.takenBy}${
                slot.item.returnDate
                  ? ` (Returns: ${slot.item.returnDate})`
                  : " (Non-returnable)"
              }`
            : `Found in ${container.name}, Slot ${slot.slotNumber} - Available`;

          setSearchResult(result);
          onSearchResult(result);
          return;
        }
      }
    }

    const notFound = `Item "${term}" not found in any container`;
    setSearchResult(notFound);
    onSearchResult(notFound);
  };

  return (
    <div className="card bg-secondary shadow-sm my-3">
      <div className="card-body">
        {/* Search Input */}
        <div className="position-relative">
          <Search
            size={18}
            className="position-absolute text-muted"
            style={{
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Search Result */}
        {searchResult && (
          <div
            className={`mt-3 p-3 border rounded ${
              searchResult.includes("not found")
                ? "bg-light text-danger"
                : "bg-success-subtle text-dark"
            }`}
          >
            <p className="mb-0 small">{searchResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
