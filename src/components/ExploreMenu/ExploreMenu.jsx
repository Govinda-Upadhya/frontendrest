import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import axios from "axios";

const ExploreMenu = ({ category, setCategory }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://16.171.161.210/foodtypes");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        "Dive into a world of flavors with our diverse menu, crafted to
        tantalize your taste buds and satisfy your cravings. Explore a symphony
        of culinary delights that promise to leave you craving for more."
      </p>
      <div className="explore-menu-list">
        {data.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) => (prev === item.name ? "All" : item.name))
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.name ? "active" : ""}
                src={`http://16.171.161.210${item.image}`}
                alt=""
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
