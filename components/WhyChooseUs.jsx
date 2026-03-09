"use client";

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: "🥒",
      title: "Fresh Ingredients",
      description:
        "We source only the freshest, highest quality chicken and ingredients daily",
    },
    {
      id: 2,
      icon: "⚡",
      title: "Fast Delivery",
      description:
        "Hot, crispy chicken delivered to your door in under 30 minutes",
    },
    {
      id: 3,
      icon: "🔐",
      title: "Secret Recipe",
      description:
        "Our proprietary blend of 11 spices creates the perfect crispy coating",
    },
  ];

  return (
    <section className="py-20 px-4 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Why Choose <span className="text-red-600">Crunchy Bite</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're committed to delivering the best fried chicken experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.2}s forwards`,
                opacity: 0,
              }}
            >
              {/* Feature Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                {/* Icon */}
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-1 bg-red-600 mt-4 group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
