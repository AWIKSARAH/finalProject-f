import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Feed from './feed';

function ListingFeed() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/api/a/")
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="search-container">
          <input
            type="text"
            className="form-control main-search"
            placeholder="Search"
          />
        </div>
      </header>
      <main className="holygrail-body">
        <section className="holygrail-content section-main">
          <div className="middle-content">
            {data && data.data && data.data.map((item) => (
              <Link key={item._id} to={`/a/${item._id}`}>
                <Feed
                  data={item}
                  id={item._id}
                  totalPages={data.data.totalPages}
                  limit={data.data.limit}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ListingFeed;
