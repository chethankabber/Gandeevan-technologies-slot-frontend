import React, { useState } from "react";
import ContainerGrid from "../components/admin/ContainerGrid";
import { mockContainers } from "../data/Mockdata";
import SearchBar from "../components/admin/SearchBar";

const Containers = () => {
    const [searchResult, setSearchResult] = useState("");
  return (
    <div className="container my-4" >
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Container Management</h2>
        <p className="text-muted">
          Manage all your containers and slots efficiently
        </p>
      </div>
      <div>
        <div className="mb-4">
        <SearchBar containers={mockContainers} onSearchResult={setSearchResult} />
        {searchResult && (
          <div className="alert alert-info mt-3" role="alert">
            {searchResult}
          </div>
        )}
      </div>
      </div>
      {/* Container List */}
      <div className="d-flex flex-column gap-4 ">
        {mockContainers.map((container) => (
          <ContainerGrid key={container.id} container={container} />
        ))}
      </div>
    </div>
  );
};

export default Containers;
