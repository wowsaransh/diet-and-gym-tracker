import React, { useState } from "react";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("exercises");

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery, filter);
  };

  const onSearch = async (searchQuery, filter) => {
    window.location.href = `/search/${filter}/${searchQuery}`;
  };

  const handleLogout = async () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <nav>
        <a href="/">Home</a>
        {/* <a href="/profile">Profile</a> */}
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </nav>
      <form className="searchbar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInput}
        />
        <select value={filter} onChange={handleFilter}>
          <option value="exercises">Exercises</option>
          <option value="recipes">Recipes</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default NavBar;
