import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import Feed from "./feed";
import Pagination from "@mui/material/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import { BsFilter } from "react-icons/bs";

function ListingFeed() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery, filterType]);

  const fetchData = () => {
    const query = searchQuery ? `&q=${searchQuery}` : "";
    const type = filterType ? `&type=${filterType}` : "";
    const url = `http://localhost:5000/api/a/?page=${currentPage}${query}${type}`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  console.log(data);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleFilterType = (event) => {
    setFilterType(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing the filter
  };

  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const toggleNavVisibility = () => {
    setNavVisible(!navVisible);
  };

  return (
    <section>
      <nav className={"navbar open"}>
        <div className="filter-icon-container" onClick={toggleNavVisibility}>
          <BsFilter className="filter-icon" />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="filter-container">
          <select value={filterType} onChange={handleFilterType}>
            <option value="">All</option>
            <option value="lost">Lost</option>
            <option value="find">Find</option>
            {/* Add more filter options as needed */}
          </select>
        </div>
        <div className="pagination-container">
          <Pagination
            count={data.totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </nav>

      <AnimatePresence>
        <div className="feed-grid">
          {data &&
            data.data &&
            data.data.slice(startIndex, endIndex).map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Feed
                  data={item}
                  id={item._id}
                  totalPages={data.totalPages}
                  limit={data.limit}
                />
              </motion.div>
            ))}
        </div>
      </AnimatePresence>

      <div className="pagination-container">
        <Pagination
          count={data.totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default ListingFeed;
