import React from "react";
import { assets } from "../assets/assets";
import { FaHeadphones } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
const Contact = () => {
  return (
    <section className=" py-16 px-6 sm:px-12 lg:px-32" id="contact">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Get in Touch with <span className="text-pink-600">AkShoppe</span>
        </h2>
        <p className="text-gray-600 mb-10">
          Have questions about your order, want to know more about our products, or just want to say hi? We’d love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Contact Form */}
          <div className="contact ms:order-last">
            <form className="space-y-6 mx-auto">
              <div>
                <input
                  type="text"
                  id="name"
                  className="md:w-[80%] w-full mx-auto border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  className="md:w-[80%] w-full mx-auto border border-gray-300 rounded-2xl  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="phone"
                  className="md:w-[80%] mx-auto w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div>
                <textarea
                  id="message"
                  rows="4"
                  className="md:w-[80%] mx-auto w-full border border-gray-300 rounded-2xl px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-pink-600 mx-auto md:w-[80%] w-full cursor-pointer hover:bg-pink-500 text-white font-semibold py-2 px-6 rounded-2xl transition duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          {/* Contact Info */}
          <div className=" flex justify-center items-center">
            <img src={assets.contact_image} className=" " alt="" />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg shadow-md max-w-7xl mx-auto">
          {/* Phone Section */}
          <div className="bg-white p-6 rounded-lg shadow-2xl hover:shadow-md transition duration-300 text-center">
            <div className=" flex justify-center text-5xl mb-3 text-pink-700"><FaHeadphones  /></div>
            <h2 className="font-semibold text-2xl text-gray-800 mb-2">My Phone</h2>
            <span className="text-sm font-medium text-gray-500 block mb-4">(Monday to Friday, 9am to 4pm)</span>
            <p className="text-gray-600 mb-2">East India Toll Free</p>
            <strong className="text-lg text-gray-800 block mb-4">830317584</strong>
            <p className="text-gray-600 mb-2">International Toll Free</p>
            <strong className="text-lg text-gray-800">830317584</strong>
          </div>

          {/* New Case Section */}
          <div className="bg-white p-6 rounded-lg shadow-2xl hover:shadow-md transition duration-300 text-center">
          <div className=" flex justify-center text-5xl mb-3 text-pink-700"> <MdFiberNew /></div>
         

            <h2 className="font-semibold text-2xl text-gray-800 mb-4">Start A New Case</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Just send us your questions or concern by starting a new case and we will give you the help you need.
            </p>
            <button className="bg-amber-400 cursor-pointer hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded w-full transition duration-300">
              Start Here
            </button>
          </div>

          {/* Live Chat Section */}
          <div className="bg-white p-6 rounded-lg shadow-2xl hover:shadow-md transition duration-300 text-center">
          <div className=" flex justify-center text-5xl mb-3 text-pink-700"><FaRocketchat /></div>
            <h2 className="font-semibold text-2xl text-gray-800 mb-4">Live Chat</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Chat with a member of our in-house team.
            </p>
            <button className="bg-amber-400 cursor-pointer hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded w-full transition duration-300">
              Start Chat
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
