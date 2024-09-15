import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CourseImg from "./CourseImg";
const CreatedCourse = () => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/courses-favorite")
      .then(({ data }) => setFavoriteCourses(data))
      .catch(({ response }) => alert(response.data.message));
  }, []);
  function getPerkLabel(perk) {
    switch (perk) {
      case "web":
        return "Web";
      case "dsa":
        return "Dsa";
      default:
        return "";
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-20">
      {favoriteCourses.map(
        ({ img, header, shortDes, difficulty, perks, _id }) => (
          <Link
            key={crypto.randomUUID()}
            to={`/courses/detail/${_id}`}
            className="rounded-xl shadow-lg flex flex-col items-center text-center bg-biGray overflow-hidden transition-all transform hover:scale-105 hover:bg-bidBlack"
          >
            <CourseImg img={img} />

            <div className="flex flex-wrap flex-col flex-grow px-6 pt-4 pb-6 gap-4">
              <h2 className="text-2xl font-semibold">{header}</h2>
              <p className="flex-grow text-left">{shortDes}</p>
              <div className="flex flex-row gap-2 mx-auto">
                <span
                  className={`w-fit px-4 py-1 rounded-full ${
                    difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {difficulty}
                </span>

                {Object.entries(perks).map(([perk, isActive]) =>
                  isActive ? (
                    <span
                      className={`w-fit px-4 py-1 rounded-full ${
                        perk === "web"
                          ? "bg-biBlue text-white"
                          : "bg-biPurple text-white"
                      } `}
                    >
                      {getPerkLabel(perk)}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default CreatedCourse;
