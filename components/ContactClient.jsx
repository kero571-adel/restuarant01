"use client";

import { useState, useEffect } from "react";

export default function ContactClient() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Phone",
      value: "(555) 123-4567",
      color: "bg-red-600",
    },
    {
      icon: "📍",
      title: "Address",
      value: "123 Crunch Street, Food City, FC 12345",
      color: "bg-yellow-500",
    },
    {
      icon: "🕐",
      title: "Opening Hours",
      value: "Mon-Thu: 11AM - 10PM | Fri-Sun: 11AM - 11PM",
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-black flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1600&h=900&fit=crop)",
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 md:mb-4 leading-tight"
            style={{
              animation: "fadeInUp 1s ease-out forwards",
            }}
          >
            Contact <span className="text-red-500">Crunchy Bite</span>
          </h1>
          <p
            className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto"
            style={{
              animation: "fadeInUp 1s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            We'd love to hear from you! Get in touch with us today.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 md:py-16 lg:py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group h-full flex flex-col"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.15}s forwards`,
                  opacity: 0,
                }}
              >
                <div
                  className={`${info.color} rounded-t-lg md:rounded-t-2xl p-4 md:p-6 lg:p-8 text-white transform group-hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-black">
                    {info.title}
                  </h3>
                </div>
                <div className="bg-white border-2 border-t-0 border-gray-200 rounded-b-lg md:rounded-b-2xl p-3 md:p-4 lg:p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 flex-1">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-lg font-semibold line-clamp-3">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-8 md:py-16 lg:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Contact Form */}
            <div
              style={{
                animation: "slideInLeft 0.8s ease-out forwards",
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black mb-2 md:mb-4">
                Send us a <span className="text-red-600">Message</span>
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-lg mb-6 md:mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-black font-bold mb-1 md:mb-2 text-xs md:text-base"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none text-xs md:text-base ${
                      errors.name
                        ? "border-red-600 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-red-600 bg-gray-50 hover:bg-white"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs md:text-sm mt-1 md:mt-2 font-semibold">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-black font-bold mb-1 md:mb-2 text-xs md:text-base"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none text-xs md:text-base ${
                      errors.email
                        ? "border-red-600 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-red-600 bg-gray-50 hover:bg-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs md:text-sm mt-1 md:mt-2 font-semibold">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-black font-bold mb-1 md:mb-2 text-xs md:text-base"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none text-xs md:text-base ${
                      errors.phone
                        ? "border-red-600 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-red-600 bg-gray-50 hover:bg-white"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs md:text-sm mt-1 md:mt-2 font-semibold">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-black font-bold mb-1 md:mb-2 text-xs md:text-base"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you think about Crunchy Bite..."
                    rows="4"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none text-xs md:text-base ${
                      errors.message
                        ? "border-red-600 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-red-600 bg-gray-50 hover:bg-white"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-xs md:text-sm mt-1 md:mt-2 font-semibold">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 md:py-3 lg:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-xs md:text-base lg:text-lg"
                >
                  Send Message
                </button>

                {submitted && (
                  <div
                    className="bg-green-100 border-2 border-green-500 text-green-700 px-3 md:px-6 py-2 md:py-4 rounded-lg font-bold animate-pulse text-xs md:text-base"
                    style={{
                      animation: "slideUp 0.4s ease-out forwards",
                    }}
                  >
                    ✓ Thank you! Your message has been sent successfully. We'll
                    be in touch soon!
                  </div>
                )}
              </form>
            </div>

            {/* Map Section */}
            <div
              style={{
                animation: "slideInRight 0.8s ease-out forwards",
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black mb-2 md:mb-4">
                Find <span className="text-red-600">Us Here</span>
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-lg mb-6 md:mb-8">
                Visit our restaurant and enjoy the best fried chicken in town!
              </p>

              <div className="rounded-lg md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl mb-4 md:mb-6 transform hover:scale-105 transition-transform duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.00601234567890!3d40.71234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3a5f5f5f5f%3A0x1a1a1a1a1a1a1a1a!2s123%20Crunch%20Street%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>

              <div className="bg-gradient-to-r from-red-50 to-yellow-50 border-2 border-red-200 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 shadow-lg">
                <h3 className="text-lg md:text-xl lg:text-2xl font-black text-black mb-2 md:mb-4">
                  📍 Our Location
                </h3>
                <p className="text-gray-700 font-semibold mb-2 md:mb-4 text-xs md:text-base">
                  123 Crunch Street, Food City, FC 12345
                </p>
                <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-base">
                  Located in the heart of the city, easily accessible by car or
                  public transportation.
                </p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs md:text-base">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-4"
            style={{
              animation: "fadeInUp 0.8s ease-out forwards",
            }}
          >
            Follow <span className="text-red-500">Crunchy Bite</span>
          </h2>
          <p
            className="text-gray-300 text-xs sm:text-sm md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2"
            style={{
              animation: "fadeInUp 0.8s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            Connect with us on social media for updates, promotions, and food
            inspiration!
          </p>

          <div
            className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8"
            style={{
              animation: "fadeInUp 0.8s ease-out 0.4s forwards",
              opacity: 0,
            }}
          >
            {[
              { icon: "f", name: "Facebook" },
              { icon: "𝕏", name: "Twitter" },
              { icon: "📷", name: "Instagram" },
              { icon: "▶️", name: "YouTube" },
            ].map((social, index) => (
              <button
                key={index}
                className="w-10 md:w-14 lg:w-16 h-10 md:h-14 lg:h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                {social.icon}
              </button>
            ))}
          </div>

          <p className="text-gray-400 text-xs md:text-sm">
            © 2026 Crunchy Bite. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
