import React, { useState } from "react";
import { useTheme } from "../ThemeToggle/ThemeContext";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  IoMailOutline,
  IoLocationOutline,
  IoCallOutline,
} from "react-icons/io5";

function ContactUs() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error(
        <div>
          Please{" "}
          <a href="/login" className="underline text-black">
            log in
          </a>{" "}
          to send a message.
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.RENDER}/api/contact`,
        {
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject,
          Message: formData.message,
        },
        { withCredentials: true }
      );
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending message.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div id="contact" className="py-16 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div
            className={`inline-block rounded-full p-2 mb-4 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-orange-50"
            }`}
          >
            <span
              className={`font-medium text-base tracking-wide transition-colors duration-300 p-4 ${
                isDarkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              Get In Touch
            </span>
          </div>
          <h2
            className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
              Us
            </span>
          </h2>
          <p
            className={`max-w-2xl mx-auto text-lg transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Have questions about our startup programs or want to join our
            network? We're here to help you fuel your entrepreneurial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div
              className={`p-6 rounded-xl transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 shadow-gray-900/20"
                  : "bg-white shadow-lg shadow-orange-100/20"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-700" : "bg-orange-50"
                  }`}
                >
                  <IoMailOutline
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isDarkMode ? "text-orange-400" : "text-orange-500"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-lg mb-1 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Email
                  </h3>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    hello@startupfuel.com
                  </p>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    support@startupfuel.com
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 shadow-gray-900/20"
                  : "bg-white shadow-lg shadow-orange-100/20"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-700" : "bg-orange-50"
                  }`}
                >
                  <IoLocationOutline
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isDarkMode ? "text-orange-400" : "text-orange-500"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-lg mb-1 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Location
                  </h3>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    New Plaza Marg
                  </p>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Kathmandu 44600, Nepal
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 shadow-gray-900/20"
                  : "bg-white shadow-lg shadow-orange-100/20"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-700" : "bg-orange-50"
                  }`}
                >
                  <IoCallOutline
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isDarkMode ? "text-orange-400" : "text-orange-500"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-lg mb-1 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Phone
                  </h3>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    +977 (1) 123-4567
                  </p>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Mon-Fri: 9AM - 6PM NPT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-2 p-8 rounded-2xl transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 shadow-gray-900/20"
                : "bg-white shadow-xl shadow-orange-100/30"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block mb-2 text-sm font-medium transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500"
                    } border outline-none focus:ring-2 focus:ring-orange-500/50`}
                    placeholder="Utsab Shrestha"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block mb-2 text-sm font-medium transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500"
                    } border outline-none focus:ring-2 focus:ring-orange-500/50`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className={`block mb-2 text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500"
                  } border outline-none focus:ring-2 focus:ring-orange-500/50`}
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`block mb-2 text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500"
                  } border outline-none focus:ring-2 focus:ring-orange-500/50`}
                  placeholder="Tell us about your startup idea or question..."
                ></textarea>
              </div>
              <button
                type="submit"
                className={`
                    w-full
                    py-4
                    px-6
                    rounded-lg
                    font-bold
                    text-white
                    transition-all
                    duration-300
                    shadow-lg
                    hover:shadow-xl
                    ${
                      isDarkMode
                        ? "bg-orange-700 hover:bg-orange-600"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    }
                  `}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h3
            className={`text-4xl font-bold mb-4 transition-colors duration-300 text-center ${
              isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
            }`}
          >
            Find{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
              Us
            </span>
          </h3>

          <div
            className={`w-full h-96 rounded-2xl overflow-hidden shadow-lg transition-colors duration-300 ${
              isDarkMode ? "shadow-gray-900/20" : "shadow-orange-100/30"
            }`}
          >
            <div className="w-full h-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2718882108224!2d85.31274931506107!3d27.70984798279363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19017507a6a9%3A0xfb4a18a45109470!2sNew%20Plaza%20Marg%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1585397098532!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
                className={`transition-opacity duration-300 ${
                  isDarkMode ? "opacity-90" : "opacity-100"
                }`}
              ></iframe>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-[#485eac]" : "text-[#485eac]"
              }`}
            >
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
                Questions
              </span>
            </h2>
            <p
              className={`max-w-2xl mx-auto transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Find answers to the most common questions about our startup
              programs and support services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: "How can I apply for the startup program?",
                answer:
                  "You can apply by clicking the 'Apply Now' button on our homepage and filling out the application form. Our team reviews applications on a rolling basis.",
              },
              {
                question: "What kind of startups do you support?",
                answer:
                  "We support innovative startups across various industries, with a focus on technology, sustainability, healthcare, and education. We look for passionate founders with scalable business models.",
              },
              {
                question: "How long is the program?",
                answer:
                  "Our core accelerator program runs for 12 weeks, with additional support and resources available to alumni afterward. We also offer shorter workshops and bootcamps throughout the year.",
              },
              {
                question: "Do you provide funding?",
                answer:
                  "Yes, selected startups receive initial seed funding, and we also connect founders with our network of investors for follow-on funding opportunities based on progress and milestones.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 shadow-gray-900/20"
                    : "bg-white shadow-lg shadow-orange-100/20"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </h3>
                <p
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
