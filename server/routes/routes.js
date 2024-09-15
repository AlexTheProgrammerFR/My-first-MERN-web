const express = require("express");
const Router = express.Router();

const {
  getProfile,
  signUp,
  logIn,
  logOut,
  getCourses,
  getOneCourse,
  createCourse,
  linkUpload,
  localUpload,
  photosMiddleware,
  addFavoriteCourse,
  getFavoriteCourses,
  unFavoriteCourse,
  getCreatedCourses,
  updateCourse,
  deleteCourse,
  checkAuthorization,
  checkBoughtCourse,
  checkAddedToCart,
  checkIsFavorite,
  addToCart,
  getCartCourses,
  notAddToCart,
  getBoughtCoures,
  buyCourse,
} = require("../controllers/routes.js");

Router.route("/profile").get(getProfile);

Router.route("/signup").post(signUp);

Router.route("/login").post(logIn);

Router.route("/logout").post(logOut);

Router.route("/courses").get(getCourses);
Router.route("/courses/:id")
  .get(getOneCourse)
  .delete(deleteCourse)
  .patch(updateCourse);
Router.route("/courses-favorite")
  .post(addFavoriteCourse)
  .get(getFavoriteCourses)
  .patch(unFavoriteCourse);
Router.route("/courses-created").get(getCreatedCourses).post(createCourse);

Router.route("/upload-by-link").post(linkUpload);
Router.route("/upload-by-local").post(
  photosMiddleware.array("photos", 100),
  localUpload
);

Router.route("/author/:owner").get(checkAuthorization);
Router.route("/boughtCourse/:course").get(checkBoughtCourse);
Router.route("/addedToCart/:course").get(checkAddedToCart);
Router.route("/isFavorite/:course").get(checkIsFavorite);

Router.route("/cart/:id").post(addToCart).delete(notAddToCart);
Router.route("/cart").get(getCartCourses);

Router.route("/purchase").get(getBoughtCoures);
Router.route("/purchase/:id").post(buyCourse);
module.exports = Router; // Use module.exports instead of export default
