import React from "react";
import CartCourseComp from "../components/CartCourseComp";
import { Link, useParams } from "react-router-dom";
import Buy from "./Buy";
const Cart = () => {
  const { action } = useParams();
  return (
    <>
      {action ? (
        <Buy />
      ) : (
        <>
          <div className="flex items-center justify-center mb-10">
            <span className="text-2xl font-semibold">
              Want to add more to your Cart?
            </span>
            <button className="ml-4 primary">
              <Link to={"/courses"}>Get more!</Link>
            </button>
          </div>
          <CartCourseComp />
        </>
      )}
    </>
  );
};

export default Cart;
