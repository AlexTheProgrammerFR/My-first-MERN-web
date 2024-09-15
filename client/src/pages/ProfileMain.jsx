import React, { useContext } from "react";
import UserContext from "../UserContext";

const ProfileMain = ({ user, handleLogout }) => {
  console.log(user);
  return (
    <div className="mx-auto w-fit flex flex-col gap-4 items-center text-base">
      <h1 className="text-base">
        Logged in as {user.name} ({user.email})
      </h1>
      <h1 className="text-lg font-semibold">Amount of money: {user.money} $</h1>
      <button
        onClick={handleLogout}
        className="font-semibold rounded-full w-full primaryRound"
      >
        Log out
      </button>
    </div>
  );
};

export default ProfileMain;
