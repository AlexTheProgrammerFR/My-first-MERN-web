import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import FavoriteCoursesComp from "../components/FavoriteCourseComp";
const Favorites = () => {
  return (
    <>
      <div className="flex items-center justify-center mb-10">
        <span className="text-2xl font-semibold">
          Want to add more to your Favorites?
        </span>
        <button className="ml-4 primary">
          <Link to={"/courses"}>Get more!</Link>
        </button>
      </div>
      <FavoriteCoursesComp />
    </>
  );
};

export default Favorites;
