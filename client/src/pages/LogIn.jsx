import React, { useState, useContext } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import LoadAnimation from "../components/LoadAnimation";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  const { setUser, user, ready } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/login", { email, password })
      .then(({ data }) => {
        alert("Logged in successfully!");
        setUser(data);
        setLoggedin(true);
      })
      .catch(({ response }) => {
        alert(`${response.data.message}`);
      });
  };

  if (!ready) {
    return <LoadAnimation />;
  }

  if (ready && user) {
    return <Navigate to={`/profile`} />;
  }

  if (loggedin === true) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-white font-semibold text-4xl mb-8">Log In</h1>
      <form
        className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-8 space-y-4"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Youremail1234@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Yourpassword1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="primary w-full font-bold">
          Submit
        </button>
        <div className="text-center">
          Don't have an account?{" "}
          <Link className="underline" to="/signup">
            Sign up!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
