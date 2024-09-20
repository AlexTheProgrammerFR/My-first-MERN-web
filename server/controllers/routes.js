const User = require("../models/User.js");
const Course = require("../models/Course.js");

const bcrypt = require("bcryptjs");
const gen = Number(process.env.gen);
const bcryptSalt = bcrypt.genSaltSync(gen);

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

const path = require("path");
const fs = require("fs");
const imageDownloader = require("image-downloader");
const { v4: uuidv4 } = require("uuid");

const multer = require("multer");

async function signCookie(res, id) {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, jwtSecret, {}, (err, token) => {
      if (err) {
        console.log(err)
        return reject(err);
      }
      console.log(token)
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      resolve();
    });
  });
}

async function verifyCookie({ token: hashedUserId }) {
  return new Promise((resolve, reject) => {
    jwt.verify(hashedUserId, jwtSecret, {}, (err, { id }) => {
      if (err) {
        return reject(null);
      }
      const userId = id;
      resolve(userId);
    });
  });
}

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists. Please use a different one!" });
    }

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await signCookie(res, user._id);
    res.status(201).json(user);
  } catch (err) {
    res
      .status(402)
      .json({ message: "Something went wrong, please try again later" });
  }
}

async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(422)
        .json({ message: "Email or password is wrong, please try again." });
    }

    await signCookie(res, user._id);
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function getProfile(req, res) {
  const { token } = req.cookies;
  if (token && typeof token === "string") {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({ message: "No user found!" });
      }
      const {
        name,
        email,
        createdCourse,
        favoriteCourse,
        addedToCartCourse,
        boughtCourse,
        money,
      } = await User.findById(user.id);

      res.json({
        name,
        email,
        createdCourse,
        favoriteCourse,
        addedToCartCourse,
        boughtCourse,
        id: user.id,
        money,
      });
    });
  } else {
    res.json(null);
  }
}

async function checkAuthorization(req, res) {
  try {
    const userId = await verifyCookie(req.cookies);
    const { owner: ownerId } = req.params;
    if (userId && ownerId && userId === ownerId) {
      res.status(200).json({ message: "Verified!" });
    } else {
      res
        .status(403)
        .json({ message: "You do NOT have the permission to view this page!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function checkBoughtCourse(req, res) {
  try {
    const cookie = req.cookies;
    if (Object.keys(cookie).length === 0 || !(await verifyCookie(cookie))) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const { course: courseId } = req.params;
    const user = await User.findById(await verifyCookie(cookie));

    const isBoughtCourse = user.boughtCourse.some(
      (bCourse) => bCourse === courseId
    );
    return res.status(200).json(isBoughtCourse);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function checkAddedToCart(req, res) {
  try {
    const cookie = req.cookies;
    if (Object.keys(cookie).length === 0 || !(await verifyCookie(cookie))) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const { course: courseId } = req.params;
    const user = await User.findById(await verifyCookie(cookie));

    const isAddedToCartCourse = user.addedToCartCourse.some(
      (aCourse) => aCourse === courseId
    );
    return res.status(200).json(isAddedToCartCourse);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function checkIsFavorite(req, res) {
  try {
    const cookie = req.cookies;
    if (Object.keys(cookie).length === 0 || !(await verifyCookie(cookie))) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const { course: courseId } = req.params;
    const user = await User.findById(await verifyCookie(cookie));

    const isFavoriteCourse = user.favoriteCourse.some(
      (fCourse) => fCourse === courseId
    );
    return res.status(200).json(isFavoriteCourse);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logOut(req, res) {
  res.cookie("token", "").json({});
}

async function getCourses(req, res) {
  try {
    const data = await Course.find({});
    res.status(200).json(data);
  } catch (er) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function getOneCourse(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.status(200).json(course);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function linkUpload(req, res) {
  try {
    const uploadDirname = path.join(__dirname, "..", "/uploads/");
    const { url } = req.body;
    const newName = "upload_" + uuidv4() + ".jpg";
    await imageDownloader.image({
      url,
      dest: uploadDirname + newName,
    });
    res.json(newName);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

const photosMiddleware = multer({ dest: "uploads/" });
async function localUpload(req, res) {
  try {
    const uploadedFiles = [];

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const {
      path: tempPath,
      destination,
      filename,
      originalname,
    } = req.files[0];
    const ext = path.extname(originalname);
    const newName = `upload_${filename}${ext}`;
    const newPath = `${destination}${newName}`;

    fs.renameSync(tempPath, newPath);
    uploadedFiles.push(newPath);
    res.json(newName);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function addFavoriteCourse(req, res) {
  try {
    const { token: hashedUserId } = req.cookies;
    const { courseId } = req.body;
    jwt.verify(hashedUserId, jwtSecret, {}, async (err, user) => {
      if (err) {
        return res.status(409).json({
          message: "Please Sign up / Log in to add your favorite course!",
        });
      }

      const newUser = await User.findByIdAndUpdate(
        user.id,
        { $push: { favoriteCourse: courseId } },
        { new: true }
      );

      res.status(201).json(newUser);
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function getFavoriteCourses(req, res) {
  try {
    if (
      Object.keys(req.cookies).length === 0 ||
      !(await verifyCookie(req.cookies))
    ) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const { favoriteCourse: favoriteCourseId } = await User.findById(
      await verifyCookie(req.cookies)
    );

    const favoriteCourses = [];
    for (const id of favoriteCourseId) {
      const course = await Course.findById(id);
      favoriteCourses.push(course);
    }
    res.json(favoriteCourses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function unFavoriteCourse(req, res) {
  try {
    const { courseId } = req.body;
    if (
      Object.keys(req.cookies).length === 0 ||
      !(await verifyCookie(req.cookies))
    ) {
      return res.status(403).json({ message: "Please check your cookie" });
    }
    const newUser = await User.findByIdAndUpdate(
      await verifyCookie(req.cookies),
      {
        $pull: { favoriteCourse: courseId },
      },
      { new: true, runValidators: true }
    );
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function getCreatedCourses(req, res) {
  try {
    if (
      Object.keys(req.cookies).length === 0 ||
      !(await verifyCookie(req.cookies))
    ) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const { createdCourse: createdCourseId } = await User.findById(
      await verifyCookie(req.cookies)
    );

    const createdCourse = [];
    for (const id of createdCourseId) {
      const course = await Course.findById(id);
      createdCourse.push(course);
    }
    res.json(createdCourse);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function createCourse(req, res) {
  try {
    const { token } = req.cookies;
    const { img, header, shortDes, longDes, link, difficulty, cost, perks } =
      req.body;

    jwt.verify(token, jwtSecret, {}, async (err, { id }) => {
      if (err) {
        return res.status(401).json({ message: "Invalid cookie!" });
      }
      const course = await Course.create({
        owner: id,
        img,
        header,
        shortDes,
        longDes,
        link,
        difficulty,
        cost,
        perks,
      });
      const newUser = await User.findByIdAndUpdate(
        id,
        { $push: { createdCourse: course._id } },
        { new: true, runValidators: true }
      );
      res.status(201).json(newUser);
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const newCourse = req.body;

    await Course.findByIdAndUpdate(id, newCourse, {
      new: true,
      runValidators: true,
    });
    res.json(newCourse);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}
async function deleteCourse(req, res) {
  try {
    const { id: courseId } = req.params;

    const user = await User.findByIdAndUpdate(
      await verifyCookie(req.cookies),
      { $pull: { createdCourse: courseId } },
      { new: true, runValidators: true }
    );
    await Course.findByIdAndDelete(courseId);

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function addToCart(req, res) {
  try {
    const { token: hashedUserId } = req.cookies;
    const { id: courseId } = req.params;
    jwt.verify(hashedUserId, jwtSecret, {}, async (err, user) => {
      if (err) {
        return res.status(409).json({
          message: "Please Sign up / Log in to add to your cart!",
        });
      }

      const { owner } = await Course.findById(courseId);
      if (user.id === owner) {
        return res
          .status(403)
          .json({ message: "You can't by your OWN course!" });
      }
      const newUser = await User.findByIdAndUpdate(
        user.id,
        { $addToSet: { addedToCartCourse: courseId } },
        { new: true }
      );

      res.status(201).json(newUser);
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function getCartCourses(req, res) {
  try {
    if (
      Object.keys(req.cookies).length === 0 ||
      !(await verifyCookie(req.cookies))
    ) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const { addedToCartCourse: cartCourseIds } = await User.findById(
      await verifyCookie(req.cookies)
    );

    const cart = [];
    for (const id of cartCourseIds) {
      const course = await Course.findById(id);
      cart.push(course);
    }
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function notAddToCart(req, res) {
  try {
    const { id: courseId } = req.params;
    if (
      Object.keys(req.cookies).length === 0 ||
      !(await verifyCookie(req.cookies))
    ) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const newUser = await User.findByIdAndUpdate(
      await verifyCookie(req.cookies),
      {
        $pull: { addedToCartCourse: courseId },
      },
      { new: true, runValidators: true }
    );
    res.json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function getBoughtCoures(req, res) {
  try {
    if (
      Object.keys(req.cookies).length === 0 ||
      !(await verifyCookie(req.cookies))
    ) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const { boughtCourse: boughtCourseIds } = await User.findById(
      await verifyCookie(req.cookies)
    );

    const bought = [];
    for (const id of boughtCourseIds) {
      const course = await Course.findById(id);
      bought.push(course);
    }
    res.json(bought);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

async function buyCourse(req, res) {
  try {
    const cookie = req.cookies;
    if (Object.keys(cookie).length === 0 || !(await verifyCookie(cookie))) {
      return res.status(403).json({ message: "Please check your cookie" });
    }

    const userId = await verifyCookie(cookie);
    const user = await User.findById(userId);
    const { id: courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseOwner = await User.findById(course.owner);

    if (courseOwner && courseOwner._id.equals(user._id)) {
      return res
        .status(402)
        .json({ message: "You can't buy your own course!" });
    }

    if (user.boughtCourse.some((course) => course === courseId)) {
      return res
        .status(402)
        .json({ message: "You have already bought this course!" });
    }

    if (user.money >= course.cost.amount) {
      user.boughtCourse.push(courseId);
      user.addedToCartCourse = user.addedToCartCourse.filter(
        (id) => id !== courseId
      );
      user.money -= course.cost.amount;

      if (courseOwner) {
        courseOwner.money += course.cost.amount;
        await courseOwner.save();
      }

      await user.save();
      return res.status(200).json(user);
    } else {
      return res
        .status(402)
        .json({ message: "You do NOT have enough money for this course!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}

module.exports = {
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
};
