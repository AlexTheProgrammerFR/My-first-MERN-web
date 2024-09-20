import React, { useContext, useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
const NewCreatedCourse = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState({});
  const [navigateToCreated, setNavigateToCreated] = useState(false);
  const navigate = useNavigate();

  // Get the Course (if exist else navigate back to profile page)
  useEffect(() => {
    if (courseId) {
      axios
        .get(`/courses/${courseId}`)
        .then(({ data }) => {
          setCourse(data);
        })
        .catch(() => setNavigateToCreated(true));
    }
  }, [courseId]);

  const [header, setHeader] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [image, setImage] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [link, setLink] = useState("");
  const [longDes, setLongDes] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cost, setCost] = useState({ amount: 0, currency: "USD" });
  const [perks, setPerks] = useState({ web: false, dsa: false });

  const [deletePage, setDeletePage] = useState(false);
  const { setUser } = useContext(UserContext);

  // authorize
  useEffect(() => {
    if (course.owner && courseId) {
      axios.get(`/author/${course.owner}`).catch(({ response }) => {
        alert(response.data.message);
        navigate(-1);
      });
    }
  }, [course]);

  // decide update or create page
  useEffect(() => {
    setHeader(course.header || "");
    setImage(course.img || "");
    setLink(course.link || "");
    setShortDes(course.shortDes || "");
    setLongDes(course.longDes || "");
    setDifficulty(course.difficulty || "");
    setCost(course.cost || { amount: 0, currency: "USD" });
    setPerks(course.perks || { web: false, dsa: false });
  }, [course]);

  function handleDiff(diff) {
    setDifficulty(diff);
  }

  function handlePerk(name) {
    setPerks((prevPerks) => ({
      ...prevPerks,
      [name]: !prevPerks[name],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!header || !shortDes || !link || !longDes || !difficulty) {
      alert("Please fill in the missing infomation before submitting!");
    } else {
      if (!courseId) {
        axios
          .post("courses-created", {
            img: image,
            header,
            shortDes,
            longDes,
            link,
            difficulty,
            cost,
            perks,
          })
          .then((data) => {
            alert("You created a course!");
            setUser(data);
            setNavigateToCreated(true);
          })
          .catch(({ response }) => alert(response.data.message));
      } else {
        axios
          .patch(`/courses/${courseId}`, {
            img: image,
            header,
            shortDes,
            longDes,
            link,
            difficulty,
            cost,
            perks,
          })
          .then((data) => {
            alert("You updated a course!");
            setUser(data);
            setNavigateToCreated(true);
          })
          .catch(({ response }) => alert(response.data.message));
      }
    }
  }

  function preHeaderClass(preHeader) {
    return <h2 className="text-2xl mt-4">{preHeader}</h2>;
  }
  function preLabelClass(preLabel) {
    return <label className="text-gray-300 text-2sm">{preLabel}</label>;
  }

  function linkedClasses(preHeader, preLabel) {
    return (
      <>
        {preHeaderClass(preHeader)}
        {preLabelClass(preLabel)}
      </>
    );
  }

  function handleImageLink() {
    axios
      .post("upload-by-link", { url: imageLink })
      .then(({ data }) => {
        setImage(data);
      })
      .catch(({ response }) => alert(response.data.message));
    setImageLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    data.set("photos", files[0]);

    axios
      .post("upload-by-local", data, {
        header: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => setImage(data))
      .catch(({ response }) => alert(response.data.message));
  }

  function handleDelete() {
    axios
      .delete(`/courses/${courseId}`, { id: courseId })
      .then(({ data }) => {
        alert("Delete successfully!");
        setUser(data);
        setNavigateToCreated(true);
      })
      .catch(({ response }) => alert(response.data.message));
  }

  if (navigateToCreated) {
    return <Navigate to="/profile/created-courses" />;
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center text-xl font-semibold mb-5">
          <h1 className="">
            {courseId
              ? "Update Your Course down there"
              : "Create Your Course down there"}
          </h1>
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
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </div>
      {courseId && (
        <button
          className={`block mx-auto font-semibold ${
            deletePage ? "primary" : "dangerous"
          }`}
          onClick={() => setDeletePage((cur) => !cur)}
        >
          {deletePage ? "Update this Course?" : "Delete this Course?"}
        </button>
      )}
      <GoBack />
      {!deletePage ? (
        <form onSubmit={handleSubmit}>
          {linkedClasses(
            "Header",
            "The second thing the user sees, make it catchy!"
          )}
          <input
            type="text"
            className="mb-2"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />

          {linkedClasses(
            "Short Description",
            "A short description for you course."
          )}
          <input
            type="text"
            className="mb-2"
            value={shortDes}
            onChange={(e) => setShortDes(e.target.value)}
          />

          {linkedClasses(
            "Long Description",
            "A long description, tell users about your course."
          )}
          <textarea
            className="mb-2"
            value={longDes}
            onChange={(e) => setLongDes(e.target.value)}
          />

          {linkedClasses(
            "Link",
            "A link, which points to the page you want to promote."
          )}
          <input
            type="text"
            className="mb-2"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          {linkedClasses(
            "Difficulty",
            "Who is this course for? beginners, or experts?"
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleDiff("Easy")}
              className={`py-1 px-4 rounded-lg shadow-lg text-lg flex items-center justify-center p-3 cursor-pointer ${
                difficulty === "Easy" ? "bg-biBlue" : "bg-biGray"
              }`}
            >
              Easy
            </button>
            <button
              type="button"
              onClick={() => handleDiff("Medium")}
              className={`py-1 px-4 rounded-lg shadow-lg text-lg flex items-center justify-center p-3 cursor-pointer ${
                difficulty === "Medium" ? "bg-biBlue" : "bg-biGray"
              }`}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => handleDiff("Hard")}
              className={`py-1 px-4 rounded-lg shadow-lg text-lg flex items-center justify-center p-3 cursor-pointer ${
                difficulty === "Hard" ? "bg-biBlue" : "bg-biGray"
              }`}
            >
              Hard
            </button>
          </div>

          {linkedClasses(
            "Images",
            "Describe your course with quality images (only 1 image is valid at a time, to change the image just insert another one)"
          )}
          <div className="flex gap-2">
            <input
              type="text"
              className="mb-2"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="http://randomImages.com/example1"
            />
            <button
              type="button"
              onClick={handleImageLink}
              className="px-4 bg-biBlue rounded-full"
            >
              Add&nbsp;photo
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <label className="inline-flex w-fit items-center text-xl font-semibold bg-biGray hover:bg-biBlue px-8 py-10 rounded-xl hover:cursor-pointer">
              <input
                type="file"
                hidden={true}
                accept="image/*"
                onChange={uploadPhoto}
              />
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
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                />
              </svg>
              Upload image
            </label>
            {image && (
              <div className="w-60">
                <img
                  className="object-cover w-full h-full rounded-2xl"
                  src={`https://devcourse.onrender.com/uploads/${image}`}
                  alt={image}
                />
              </div>
            )}
          </div>

          {linkedClasses(
            "Cost",
            "The cost of your course, can be free, or not free."
          )}
          <div className="flex gap-3">
            <input
              type="number"
              value={cost.amount}
              onChange={(e) => setCost({ ...cost, amount: e.target.value })}
              className="mb-2 placeholder-gray-400"
              placeholder="The cost of your website here"
            />
            <input type="text" className="mb-2" value={cost.currency} />
          </div>

          <h2 className="text-2xl mt-4">Perks</h2>
          <h2 className="text-gray-300 text-2sm">
            Here are the perks of your website
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handlePerk("web")}
              className={`inline-flex gap-1 hover:bg-biBlue px-4 py-2 rounded-full  ${
                perks.web ? "bg-biBlue" : "bg-biGray"
              }`}
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
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              Web
            </button>

            <button
              type="button"
              onClick={() => handlePerk("dsa")}
              className={`inline-flex gap-1 hover:bg-biBlue px-4 py-2 rounded-full ${
                perks.dsa ? "bg-biBlue" : "bg-biGray"
              }`}
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
                  d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                />
              </svg>
              DSA
            </button>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full primary my-20 font-semibold"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-10 font-semibold flex flex-col items-center">
          <h1 className="mb-2 text-2xl">
            Are you sure you want to Delete this course?
          </h1>
          <button className="w-fit dangerous" onClick={handleDelete}>
            Yes, delete this course.
          </button>
        </div>
      )}
    </>
  );
};

export default NewCreatedCourse;
