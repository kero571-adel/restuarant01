"use client";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Best fried chicken I have ever had! The coating is perfectly crispy and the meat is always juicy. Will definitely order again!",
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Marcus Chen",
      rating: 5,
      comment:
        "Crunchy Bite delivers super fast and the food is always hot. Their secret recipe is no joke - this chicken is addictive!",
      avatar: "👨‍💼",
    },
    {
      id: 3,
      name: "Emma Williams",
      rating: 5,
      comment:
        "Family bucket is perfect for our weekly gatherings. Fresh ingredients, amazing taste, and great value for money. Highly recommended!",
      avatar: "👩‍🦰",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            What Our <span className="text-red-600">Customers Say</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who love Crunchy Bite
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="group"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.15}s forwards`,
                opacity: 0,
              }}
            >
              {/* Review Card */}
              <div className="bg-linear-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                {/* Avatar and Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{review.avatar}</div>
                  <div>
                    <h3 className="font-bold text-black text-lg">
                      {review.name}
                    </h3>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed grow italic">
                  "{review.comment}"
                </p>

                {/* Quote Mark Decoration */}
                <div className="text-5xl text-red-200 opacity-50 mt-4">"</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-red-600">4.9/5</div>
            <p className="text-gray-600 text-lg">Average Rating</p>
          </div>
          <div>
            <div className="text-4xl font-black text-red-600">2,000+</div>
            <p className="text-gray-600 text-lg">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-black text-red-600">98%</div>
            <p className="text-gray-600 text-lg">Would Recommend</p>
          </div>
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
