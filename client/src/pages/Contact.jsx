import React from "react";
import { contactBanner } from "../assets/imgs/img";
import { Link } from "react-router-dom";
const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "5afa4f50-bf85-4aab-bd98-0c3eff1213c4");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      alert("Successfully sent!")
    }
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center m-8 mb-20">
        {/* LEFT */}
        <div className="flex flex-col text-center text-2xl lg:w-1/2 lg:pr-10 lg:px-8 mb-8 lg:mb-0">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <h1 className="text-base md:w-2/3 lg:w-full mb-8">
            Want to get in touch? We'd love to here from you. Just send us a
            message...
          </h1>
          <button
            className="primary"
            onClick={() =>
              document
                .getElementById("target-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Scroll down
          </button>
        </div>
        {/* RIGHT */}
        <div className="flex lg:w-1/2 justify-center">
          <img
            className="max-w-md w-full"
            src={contactBanner}
            alt="banner image"
          />
        </div>
      </div>
      <div className="text-center text-3xl font-semibold" id="target-section">
        Let's have a Conversation!
      </div>
      <div className="text-center text-base mt-2 mb-8">
        Contact Email: alexhuynh019@gmail.com
      </div>
      <form className="flex flex-col gap-4 px-16" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="fname" className="text-xl mb-1">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            name="First Name"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xl mb-1" htmlFor="lname">
            Last Name
          </label>
          <input
            className="p-2 border border-gray-300 rounded-md"
            type="text"
            id="lname"
            name="Last Name"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xl mb-1" htmlFor="email">
            Your Email
          </label>
          <input
            className="p-2 border border-gray-300 rounded-md"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xl mb-1" htmlFor="text">
            Your Message
          </label>
          <textarea
            className="p-2 border border-gray-300 rounded-md"
            id="text"
            name="Message"
            placeholder="Type your message here"
            rows="4"
            required
          ></textarea>
        </div>

        <button className="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
