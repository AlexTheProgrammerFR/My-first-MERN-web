import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/imgs/banner.png";
import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
} from "../assets/imgs/img.jsx";
import { useState } from "react";
import Course from "../components/Course.jsx";
import { UserContext } from "../UserContext.jsx";
const Home = () => {
  const customers = [
    {
      name: "Alex Huynh",
      comment:
        "I love how user-friendly and well-organized this course website is! The design is clean, and the content is presented in a way that's easy to navigate and understand. It's clear that a lot of thought went into making the learning experience as smooth as possible.",
    },
    {
      name: "Johny",
      comment:
        "This product has exceeded my expectations in every way. The quality and attention to detail are fantastic, making it well worth the investment.",
    },
    {
      name: "Abert Ainstan",
      comment:
        "This app is a game-changer! It's packed with features, yet it's easy to use. I can't imagine my daily routine without it.",
    },
    {
      name: "Samantha Green",
      comment:
        "The customer support is top-notch! They were quick to respond and resolved my issue in no time. Highly recommend this service to anyone looking for reliability and efficiency.",
    },
    {
      name: "Michael Thompson",
      comment:
        "I'm really impressed with the customization options available. It allowed me to tailor the product exactly to my needs, and the results are outstanding!",
    },
    {
      name: "Emily Johnson",
      comment:
        "The user interface is so intuitive and visually appealing. I found it really easy to get started, and the learning curve was minimal. Great job on the design!",
    },
    {
      name: "David Lee",
      comment:
        "The performance of this app is unmatched. It's fast, reliable, and works seamlessly without any glitches. It's definitely worth every penny!",
    },
    {
      name: "Sarah White",
      comment:
        "This course has really helped me improve my skills. The content is thorough, and the interactive elements make learning engaging and fun.",
    },
  ];
  const { user } = useContext(UserContext);
  const [flexShowAll, setflexShowAll] = useState(false);
  const flexItemsToShow = flexShowAll ? customers.length : 4;
  return (
    <>
      {/* BANNER */}
      <div className="flex flex-col lg:flex-row items-center m-8 mb-20">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center text-2xl lg:w-1/2 lg:pr-10 mb-8 lg:mb-0">
          <div className="text-4xl flex flex-col gap-y-2 mb-8">
            <h1>Learn from top Courses</h1>
            <h1>Improve Significantly</h1>
            <h1>Get High Paying Jobs</h1>
          </div>
          <h1 className="text-base text-left md:w-2/3 lg:w-full mb-8">
            Master coding with our expert-led courses. Whether you're a beginner
            or sharpening your skills, we offer free and premium content to help
            you succeed. Start learning today and become the developer you
            aspire to be.
          </h1>
          {user ? (
            <Link
              to="/profile"
              className="w-full bg-biBlue py-1 rounded-full shadow-lg text-xl hover:bg-bidBlue"
            >
              Go to Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="w-full bg-biBlue py-1 rounded-full shadow-lg text-xl hover:bg-bidBlue"
            >
              Start Now!
            </Link>
          )}
        </div>
        {/* RIGHT */}
        <div className="flex lg:w-1/2 justify-center">
          <img className="max-w-md w-full" src={banner} alt="banner image" />
        </div>
      </div>

      {/* CUSTOMER SAY ABOUT US */}
      <div className="flex flex-col m-8 items-center gap-12 mb-32">
        <h1 className="text-3xl mb-8 font-bold">
          What do our customers say about us?
        </h1>
        <div className="flex flex-col gap-12 w-full px-[13%]">
          {/* ITEM */}
          {customers.slice(0, flexItemsToShow).map(({ name, comment }) => (
            <div className="bg-biGray p-8 rounded-2xl">
              {/* info */}
              <div className="mb-4">
                <button className="mr-3 bg-biBlue py-1 px-3 rounded-full">
                  {name[0]}
                </button>
                <span className="text-2xl">{name}</span>
              </div>
              {/* comment */}
              <h1 className="text-lg">"{comment}"</h1>
            </div>
          ))}
        </div>
        <button
          onClick={() => setflexShowAll((cur) => !cur)}
          className={`max-w-40 bg-biBlue py-1 px-4 rounded-full shadow-lg text-lg hover:bg-bidBlue`}
        >
          {flexShowAll ? "Show less" : "Show more"}
        </button>
      </div>

      {/* OUR COURSES */}
      <div className="flex flex-col m-8 items-center gap-12 mb-20">
        <h1 className="text-4xl font-bold mb-12">
          Top FREE Courses We Want to Share
        </h1>
        <Course requiredLimit={10} />
      </div>
      <div className="mx-4 text-center">
        <span className="text-gray-300 text-lg mr-2">
          Explore hundreds of courses now!
        </span>{" "}
        <Link to="/courses" className="primary">
          Click here!
        </Link>
      </div>
    </>
  );
};

export default Home;
