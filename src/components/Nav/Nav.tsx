import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-evenly items-center py-7 px-8">
      <Link to="/">Home</Link>
      <Link to="/highscores">High Scores</Link>
    </nav>
  );
};

export default Nav;
