import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import ProfileMain from "./ProfileMain";
import Favorites from "./Favorites";
import CreatedCourse from "./CreatedCourse.jsx";
import Cart from "./Cart.jsx";
import BoughtCourseComp from "../components/BoughtCourseComp.jsx";
const Profile = () => {
  const { setUser, user, ready } = useContext(UserContext);
  const [logoutRedirect, setLogoutRedirect] = useState(false);
  const [header, setHeader] = useState("");
  let { subpage } = useParams();
  // Ensure subpage is valid and set to a default value if invalid
  const validSubpages = [
    "profile",
    "created-courses",
    "favorites",
    "cart",
    "purchased",
  ];
  const validSubpage = validSubpages.includes(subpage) ? subpage : "profile";
  useEffect(() => {
    const headers = {
      profile: "My Profile",
      "created-courses": "My Created Courses",
      favorites: "My Favorite Courses",
      cart: "My Cart",
      purchased: "My Purchased Courses",
    };

    setHeader(headers[validSubpage] || "Hello! Be nice to my website!");
  }, [validSubpage]);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  if (logoutRedirect) {
    setUser(null);
    alert("Logged out successfully");
    return <Navigate to="/login" />;
  }

  function handleLogout() {
    axios
      .post("/logout")
      .then(() => {
        setLogoutRedirect(true);
      })
      .catch(() => alert("There was an error, please try again later!"));
  }

  function linkedClasses(typeOfPage) {
    let classes = `${"inline-flex items-center text-white hover:bg-biBlue p-4 rounded-full"}`;
    if (typeOfPage === validSubpage) {
      classes += " bg-biBlue";
    }
    return classes;
  }

  const ProfileNavBar = () => {
    return (
      <nav className="bg-biGray rounded-full shadow-md flex justify-between items-center max-w-3xl mx-auto">
        <Link to="/profile" className={linkedClasses("profile")}>
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
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Profile
        </Link>
        <Link
          to="/profile/created-courses"
          className={linkedClasses("created-courses")}
        >
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Created Courses
        </Link>
        <Link to="/profile/favorites" className={linkedClasses("favorites")}>
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
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          Favorites
        </Link>
        <Link to="/profile/cart" className={linkedClasses("cart")}>
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Cart
        </Link>
        <Link to="/profile/purchased" className={linkedClasses("purchased")}>
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
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
          Purchased Courses
        </Link>
      </nav>
    );
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">{header}</h1>
      <ProfileNavBar />
      <div className="mt-10 p-4">
        {validSubpage === "profile" ? (
          <ProfileMain user={user} handleLogout={handleLogout} />
        ) : validSubpage === "favorites" ? (
          <Favorites />
        ) : validSubpage === "created-courses" ? (
          <CreatedCourse />
        ) : validSubpage === "cart" ? (
          <Cart />
        ) : validSubpage === "purchased" ? (
          <BoughtCourseComp />
        ) : null}
      </div>
    </>
  );
};

export default Profile;
