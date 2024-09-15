const express = require("express");
const app = express();
const Route = require("./routes/routes.js");
const dotenv = require("dotenv");
const connectDB = require("./db/connect.js");
dotenv.config();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/uploads", express.static(__dirname+"/uploads"))
app.use("/", Route);

const User = require("./models/User.js");
const Course = require("./models/Course.js");
app.get("/", async (_, res) => {
  try {
    const users = await Course.find(); // Wait for the database operation to complete
    res.status(200).json(users); // Send the users as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response if something goes wrong
  }
});

app.post("/create-courses", async (req, res) => {
  try {
    const data = req.body;
    const courses = await Course.create(data);
    res.status(201).json(courses);
  } catch (err) {
    res.json(err);
  }
});

async function start() {
  try {
    const DB_URI = process.env.URI_PASS;
    await connectDB(DB_URI);

    const PORT = Number(process.env.PORT);
    app.listen(PORT, () => console.log(`App is running on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
start();
