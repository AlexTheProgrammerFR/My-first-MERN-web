import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewCreatedCourse from "./NewCreatedCourse";
import CreatedCourseComp from "../components/CreatedCourseComp";
const CreatedCourse = () => {
  const { action } = useParams();

  function Main() {
    return (
      <>
        <div className="flex flex-col md:flex-row justify-center mb-14 gap-4">
          <span className="text-2xl font-bold">Let's create more course and earn money!</span>
          <Link to="new">
            <button className="my-auto inline-flex items-center gap-1 bg-biGray hover:bg-biBlue px-4 py-2 rounded-full hover:bg-bidBlue text-lg font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create New Course!
            </button>
          </Link>
        </div>
        <CreatedCourseComp />
      </>
    );
  }
  return !action ? (
    <Main />
  ) : action === "new" ? (
    <NewCreatedCourse />
  ) : (
    <Main />
  );
};

export default CreatedCourse;
