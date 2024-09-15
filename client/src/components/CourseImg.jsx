import React from "react";

const CourseImg = ({ img }) => {
  return (
    <>
      <div className="w-full h-64">
        {img.length === 0 ? (
          <div className="object-cover w-full h-full bg-gray-700"></div>
        ) : (
          <img
            src={`http://localhost:5000/uploads/${img}`}
            alt={"Report an error to us now!"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
    </>
  );
};

export default CourseImg;
