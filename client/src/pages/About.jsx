import React from "react";
import { Link } from "react-router-dom";
import { aboutBanner } from "../assets/imgs/img";
const About = () => {
  return (
    <div className=" text-white min-h-screen flex flex-col justify-center items-center px-4">
      <div className="flex flex-col lg:flex-row items-center m-8 mb-20">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center text-2xl lg:w-1/2 lg:pr-10 mb-8 lg:mb-0">
          <h1 className="text-4xl font-bold mb-8">About Us</h1>
          <h1 className="text-base text-left md:w-2/3 lg:w-full mb-8">
            Welcome to our website! We’re a small, passionate team of
            individuals who created this platform just for fun. Our aim is to
            share cool ideas and projects that we enjoy working on, with no
            serious agenda—just creativity and innovation.
          </h1>
          <Link className="primary" to="/contact">
            Contact Us!
          </Link>
        </div>
        {/* RIGHT */}
        <div className="flex lg:w-1/2 justify-center">
          <img
            className="max-w-md w-full"
            src={aboutBanner}
            alt="banner image"
          />
        </div>
      </div>

      <div className="w-full max-w-lg border border-biBlue p-6 rounded-lg mb-10">
        <h2 className="text-2xl text-biBlue font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          Our mission is simple: to experiment, create, and inspire. Whether
          it’s through fun projects, tutorials, or sharing knowledge, we aim to
          encourage others to explore their creative side.
        </p>

        <h2 className="text-2xl text-biBlue font-semibold mb-4">Who We Are</h2>
        <p className="mb-4">
          We’re a group of enthusiasts who love coding, design, and everything
          in between. Each of us brings unique skills to the table, and
          together, we create things we’re proud of.
        </p>

        <h2 className="text-2xl text-biBlue font-semibold mb-4">
          Why We Do It
        </h2>
        <p>
          This project is a labor of love. We enjoy building and sharing ideas
          without any formal goal. It’s about learning, growing, and having fun
          in the process!
        </p>
      </div>

      <p className="text-biBlue text-lg mb-8">
        Thank you for visiting and being a part of our journey!
      </p>
    </div>
  );
};

export default About;
