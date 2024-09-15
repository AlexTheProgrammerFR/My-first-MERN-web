import React, { useState, useContext } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loggedin, setLoggedin] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("/signup", { email, password, name })
      .then(({ data }) => {
        alert("Signed up successfully!");
        setUser(data);
        setLoggedin(true);
      })
      .catch(({response}) => {
        alert(`${response.data.message}`);
      });
  };

  if (loggedin === true) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-white font-semibold text-4xl mb-8">Sign up</h1>
      <form
        className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-8 space-y-4"
        onSubmit={handleSignup}
      >
        <input
          type="text"
          placeholder="yourUsername"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="YourEmail1234@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="YourPassword1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="primary w-full font-bold">
          Submit
        </button>
        <div className="text-center">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Log in!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
