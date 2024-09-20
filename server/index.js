const express = require("express");
const app = express();
const Route = require("./routes/routes.js");
const dotenv = require("dotenv");
const connectDB = require("./db/connect.js");
dotenv.config();

const cors = require("cors");
app.use(
  cors({
    origin: "https://devcourse-frontend.onrender.com",
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
