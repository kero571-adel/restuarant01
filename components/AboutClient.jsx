"use client";

import { useState, useEffect } from "react";

export default function AboutClient() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Chef Marcus",
      role: "Head Chef & Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      specialty: "Signature Crispy Recipe",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Kitchen Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      specialty: "Quality Control",
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Sous Chef",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      specialty: "Seasoning Expert",
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      role: "Service Director",
      image: "/gallery/Whisk_a42662441568e8fbfc848a26cc852ddcdr.jpeg",
      specialty: "Fast Service",
    },
  ];

  const missionPoints = [
    {
      icon: "🥇",
      title: "Premium Quality",
      description:
        "Only the freshest, highest-grade chicken sourced daily from trusted suppliers.",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Served hot and fresh within minutes of cooking, never frozen or reheated.",
    },
    {
      icon: "🧂",
      title: "Secret Recipe",
      description:
        "Our proprietary blend of spices creates the perfect crispy, golden exterior.",
    },
    {
      icon: "❤️",
      title: "Passion Driven",
      description:
        "Every piece is crafted with care and dedication to excellence.",
    },
  ];

  const kitchenSteps = [
    {
      number: "01",
      title: "Fresh Selection",
      description: "Premium chicken selected and inspected for quality",
      image: "/about/Whisk_a9e5d49384d24a5a4b54c9b6c56f1b9ddr.jpeg",
    },
    {
      number: "02",
      title: "Expert Seasoning",
      description: "Marinated with our secret blend of spices",
      image: "/about/Whisk_5fc4242cfe449568b404466530e1c2c2dr.jpeg",
    },
    {
      number: "03",
      title: "Perfect Frying",
      description: "Fried to golden perfection in premium oil",
      image: "/about/Whisk_0bd303b5f57861f81a34d9377d4e6d39dr.jpeg",
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Banner */}
      <section className="relative w-full h-64 sm:h-80 md:h-96 lg:h-screen overflow-hidden bg-black flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/about/Whisk_31957c6750fc59b99264db252b7f8fa0dr.jpeg)",
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 leading-tight"
            style={{
              animation: "fadeInUp 1s ease-out forwards",
            }}
          >
            Our Story
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-200 max-w-2xl mx-auto"
            style={{
              animation: "fadeInUp 1s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            Crafting the crispiest fried chicken experience
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-8 md:py-16 lg:py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div
            className="space-y-4 md:space-y-6"
            style={{
              animation:
                scrollY > 500 ? "slideInLeft 0.8s ease-out forwards" : "none",
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              How It All <span className="text-red-600">Started</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              Crunchy Bite was born from a simple passion: creating the perfect
              fried chicken. What started as a family recipe evolved into a
              commitment to quality, taste, and speed.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              We believe that exceptional fried chicken shouldn't be
              complicated. Fresh ingredients, time-tested techniques, and
              unwavering dedication to perfection are our foundation. Every
              piece that leaves our kitchen carries the pride of our team.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              Today, Crunchy Bite is more than just a restaurant—it's a
              destination for those who appreciate quality food and fast,
              friendly service.
            </p>
          </div>
          <div
            className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl"
            style={{
              animation:
                scrollY > 500 ? "slideInRight 0.8s ease-out forwards" : "none",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop"
              alt="Crunchy Bite Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-8 md:py-16 lg:py-24 px-4 md:px-8 bg-gray-50 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-4 text-black">
            Our <span className="text-red-600">Mission</span>
          </h2>
          <p className="text-center text-gray-600 text-xs sm:text-sm md:text-lg mb-8 md:mb-16 max-w-2xl mx-auto">
            We're committed to delivering excellence in every bite
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {missionPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 md:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
                  {point.icon}
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-black mb-2 md:mb-3">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-16 lg:py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-4 text-black">
          Meet Our <span className="text-red-600">Team</span>
        </h2>
        <p className="text-center text-gray-600 text-xs sm:text-sm md:text-lg mb-8 md:mb-16 max-w-2xl mx-auto">
          Passionate professionals dedicated to serving you the best
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.15}s forwards`,
                opacity: 0,
              }}
            >
              <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden mb-3 md:mb-4 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold text-center text-xs sm:text-sm md:text-base px-2">
                    {member.specialty}
                  </p>
                </div>
              </div>
              <h3 className="text-base md:text-lg font-bold text-black">
                {member.name}
              </h3>
              <p className="text-red-600 font-semibold text-xs md:text-sm">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Kitchen Experience Section */}
      <section className="py-8 md:py-16 lg:py-24 px-4 md:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 md:mb-4">
            Our <span className="text-red-600">Process</span>
          </h2>
          <p className="text-center text-gray-300 text-xs sm:text-sm md:text-lg mb-8 md:mb-16 max-w-2xl mx-auto">
            From selection to your table—every step matters
          </p>

          <div className="space-y-8 md:space-y-12">
            {kitchenSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-4 md:gap-6 lg:gap-8 items-center`}
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="flex-1">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-red-600 mb-2 md:mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-lg">
                    {step.description}
                  </p>
                </div>
                <div className="flex-1 relative h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl w-full">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 md:py-16 lg:py-24 px-4 md:px-8 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">
            Experience Crunchy Bite Today
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-red-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Visit us now and taste the difference quality makes
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className="px-6 md:px-8 py-2 md:py-4 bg-white text-red-600 font-bold text-sm md:text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              View Menu
            </button>
            <button className="px-6 md:px-8 py-2 md:py-4 bg-red-800 text-white font-bold text-sm md:text-lg rounded-lg hover:bg-red-900 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Find Us
            </button>
          </div>
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
