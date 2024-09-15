import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { bannerCourse } from "../assets/imgs/img.jsx";
import Course from "../components/Course.jsx";

const Courses = () => {
  return (
    <div className="p-4">
      {/* BANNER */}
      <div className="flex flex-col lg:flex-row items-center mx-8 mt-8 mb-6 mb-20">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center text-2xl lg:w-1/2 lg:pr-10 mb-8 lg:mb-0">
          <div className="md:w-2/3 lg:w-full text-center text-5xl mb-8">
            <h1 className="text-left leading-tight">
              The biggest Course Collection you’ve ever found
            </h1>
          </div>
          <span className="text-base text-left md:w-2/3 lg:w-full mb-8">
            Immerse yourself in our expansive, high-quality collection that
            offers a majestic experience. With friendly guidance and
            cutting-edge resources.
          </span>
          {/* <button className="w-full bg-biBlue py-1 rounded-full shadow-lg text-xl hover:bg-bidBlue">
            Start Now!
          </button> */}
        </div>
        {/* RIGHT */}
        <div className="flex lg:w-1/2 h-full justify-center">
          <img
            className="max-w-md w-full h-full object-cover"
            src={bannerCourse}
            alt="banner image"
          />
        </div>
      </div>
      {/* CREATE COURSE LINK */}
      <div className="flex gap-4 flex-row items-center justify-left mb-10">
        <h2 className="text-xl">
          Want to share your course with the community?
        </h2>
        <Link
          to="/profile/created-courses/new"
          className="px-4 py-2 bg-biBlue rounded-full"
        >
          Create a course
        </Link>
      </div>

      {/* COURSES */}
      <h1 className="text-4xl font-bold text-center mb-10">Courses</h1>
      <Course />
    </div>
  );
};

export default Courses;
