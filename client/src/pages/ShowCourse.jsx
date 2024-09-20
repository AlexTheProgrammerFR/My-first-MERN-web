import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadAnimation from "../components/LoadAnimation.jsx";
import GoBack from "../components/GoBack.jsx";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
const ShowCourse = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, user, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  // user
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [boughtThisCourse, setBoughtThisCourse] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // get course
  useEffect(() => {
    axios
      .get(`/courses/${id}`)
      .then(({ data }) => {
        setCourse(data);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        alert(response.data.message);
        setIsLoading(true);
        setRedirect(true);
      });
  }, [id]);

  if (redirect) {
    navigate(-1);
  }

  // bought Course?
  useEffect(() => {
    axios
      .get(`/boughtCourse/${id}`)
      .then(({ data }) => setBoughtThisCourse(data))
      .catch(() => setBoughtThisCourse(false));
  }, [user, course, id]);
  // OWN COURSE?
  useEffect(() => {
    // courseId
    if (course.owner) {
      axios
        .get(`/author/${course.owner}`)
        .then(() => {
          setIsOwner(true);
        })
        .catch(() => {
          setIsOwner(false);
        });
    }
  }, [course, user]);

  //ADDED TO CART?
  useEffect(() => {
    axios
      .get(`/addedToCart/${id}`)
      .then(({ data }) => setAddedToCart(data))
      .catch(() => setAddedToCart(false));
  }, [user, course, id]);

  // is Favorite?
  useEffect(() => {
    axios
      .get(`/isFavorite/${id}`)
      .then(({ data }) => setIsFavorite(data))
      .catch(() => setIsFavorite(false));
  }, [user, course, id]);

  if (!ready || isLoading || !course) {
    return <LoadAnimation />;
  }

  const handleAddFavorite = () => {
    axios
      .post("/courses-favorite", { courseId: course._id })
      .then(({ data }) => {
        setUser(data);
        alert("Added to your favorites successfully!");
      })
      .catch(({ response }) => {
        alert("Something went wrong, please try again later!");
      });
  };

  const handleUnFavorite = () => {
    axios
      .patch("/courses-favorite", { courseId: course._id })
      .then(({ data }) => {
        setUser(data);
        alert("Unfavorited this course successfully!");
      })
      .catch((err) => alert(err));
  };

  const addToCart = () => {
    axios
      .post(`/cart/${id}`)
      .then(({ data }) => {
        setUser(data);
        setAddedToCart((prev) => !prev);
        alert("Added to cart.");
      })
      .catch(({ response }) => alert(response.data.message));
  };

  const unAddFromCart = () => {
    axios
      .delete(`/cart/${id}`)
      .then(({ data }) => {
        setUser(data);
        setAddedToCart((prev) => !prev);
        alert("Removed from cart.");
      })
      .catch(({ response }) => alert(response.data.message));
  };

  return (
    <div className="p-4">
      <GoBack />
      {isOwner && (
        <div className="flex gap-3 flex-col md:flex-row items-center justify-center text-2xl font-semibold">
          Hey! You are the owner of this course.
          <Link to={`/profile/created-courses/new/${id}`} className="primary">
            Update this course?
          </Link>
        </div>
      )}
      <div className="w-full h-128 my-8 md:px-4 sm:px-12">
        <img
          src={`https://devcourse.onrender.com/uploads/${course.img}`}
          alt={course.img}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center my-8 ml-4">
        {isFavorite ? (
          <>
            <span className="mb-2 text-2xl font-semibold">
              Don't like this course anymore?
            </span>
            <button className="md:ml-2 primary" onClick={handleUnFavorite}>
              Unfavorite it!
            </button>
          </>
        ) : (
          <>
            <span className="mb-2 text-2xl font-semibold">
              Like this course?
            </span>
            <button className="md:ml-2 primary" onClick={handleAddFavorite}>
              Favorite it!
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col max-w-2xl gap-3 items-center mx-auto">
        <h1 className="text-3xl font-semibold text-center">{course.header}</h1>
        <span className="w-full text-left break-words overflow-hidden">
          {course.longDes}
        </span>
        <div className="w-full text-left break-words overflow-hidden">
          {boughtThisCourse || isOwner ? (
            <span>
              Link to the course:{" "}
              <a
                href={`https://${course.link}`}
                target="_blank"
                className="underline text-biBlue"
              >
                here
              </a>
            </span>
          ) : (
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <span className="text-base">
                Please buy the Course to View Link
              </span>
              <div className="flex gap-3">
                {addedToCart ? (
                  <button onClick={unAddFromCart} className="primary">
                    Remove from cart
                  </button>
                ) : (
                  <button onClick={addToCart} className="primary">
                    Add to cart
                  </button>
                )}
                <button className="safe">
                  <Link to={`/profile/cart/buy/${course._id}`}>
                    Buy it now!
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={`w-full text-left`}>
          Difficulty:{" "}
          <span
            className={`text-left ${
              course.difficulty === "Easy"
                ? "text-green-400"
                : course.difficulty === "Medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {course.difficulty}
          </span>
        </div>
        <div className="w-full text-left">
          Type of Course:
          {Object.entries(course.perks).map(([perk, isActive]) =>
            isActive ? (
              <span className="ml-2">
                {perk.charAt(0).toUpperCase() + perk.slice(1)}
              </span>
            ) : null
          )}
        </div>
        <div className="w-full text-left">
          Cost of Course: {course.cost.amount}{" "}
          {course.cost.currency === "USD" && "$"}
        </div>
      </div>
    </div>
  );
};

export default ShowCourse;
