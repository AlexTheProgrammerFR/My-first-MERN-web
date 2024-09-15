import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import LoadAnimation from "../components/LoadAnimation.jsx";
const Buy = () => {
  const { setUser, user, ready } = useContext(UserContext);
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [sureToBuyCourse, setSureToBuyCourse] = useState(false);
  useEffect(() => {
    axios
      .get(`/courses/${id}`)
      .then(({ data }) => setCourse(data))
      .catch(({ response }) => {
        alert(response.data.message);
        setRedirect(true);
      });
  }, [id]);

  if (!ready || Object.keys(course).length === 0) {
    return <LoadAnimation />;
  }
 
  if (ready && !id) {
    return setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/profile/cart" />;
  }

  function buyCourse() {
    axios
      .post(`/purchase/${id}`)
      .then(({ data }) => {
        alert("Bought Successfully!");
        setRedirect(true);
        setUser(data);
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <div className="w-full text-left space-y-2">
        <h1 className="text-2xl font-bold">
          My amount of dollars: ${user.money}
        </h1>
        <h1 className="text-xl">Course Price: ${course.cost.amount}</h1>
      </div>

      {!sureToBuyCourse ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={() => setSureToBuyCourse((cur) => !cur)}
        >
          Buy Course?
        </button>
      ) : (
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">
            Do you really want to buy the course?
          </h1>
          <h2 className="text-lg">Course Name: {course.header}</h2>
          <div className="space-x-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              onClick={buyCourse}
            >
              Buy Now!
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              onClick={() => setSureToBuyCourse((cur) => !cur)}
            >
              Maybe Later!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
