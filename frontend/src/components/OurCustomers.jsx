"use client"

import { Star } from "lucide-react"

const OurCustomers = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "TextTextText TextTextText TextTextText TextTextText",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "TextTextText TextTextText TextTextText TextTextText",
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "TextTextText TextTextText TextTextText TextTextText",
    },
    {
      id: 4,
      name: "David Wilson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "TextTextText TextTextText TextTextText TextTextText",
    },
    {
      id: 5,
      name: "Lisa Brown",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "TextTextText TextTextText TextTextText TextTextText",
    },
  ]

  const inspirationCards = [
    {
      id: 1,
      title: "Ideas and Inspiration",
      description:
        "Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration",
      image: "/placeholder.svg?height=200&width=200",
      link: "/inspiration-1",
    },
    {
      id: 2,
      title: "Ideas and Inspiration",
      description:
        "Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration",
      image: "/placeholder.svg?height=200&width=200",
      link: "/inspiration-2",
    },
    {
      id: 3,
      title: "Ideas and Inspiration",
      description:
        "Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration",
      image: "/placeholder.svg?height=200&width=200",
      link: "/inspiration-3",
    },
    {
      id: 4,
      title: "Ideas and Inspiration",
      description:
        "Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration Ideas and Inspiration",
      image: "/placeholder.svg?height=200&width=200",
      link: "/inspiration-4",
    },
  ]

  const handleTestimonialClick = (testimonialId) => {
    console.log(`Testimonial ${testimonialId} clicked`)
    // Add navigation logic here
  }

  const handleReadMore = (cardId) => {
    console.log(`Read More clicked for inspiration card ${cardId}`)
    // Add navigation logic here
  }

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">
            Real Stories, Real Experiences - Our Customers Speak
          </h1>
        </div>

        {/* Testimonials Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              onClick={() => handleTestimonialClick(testimonial.id)}
              className="relative cursor-pointer group hover:scale-105 transition-all duration-300"
            >
              {/* Ornate Border SVG */}
              <svg
                viewBox="0 0 200 280"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
              >
                {/* Ornate decorative border path */}
                <path
                  d="M20 20 
                     Q30 10, 40 15 
                     Q50 5, 60 10 
                     Q70 0, 80 5 
                     Q90 0, 100 5 
                     Q110 0, 120 5 
                     Q130 0, 140 10 
                     Q150 5, 160 15 
                     Q170 10, 180 20 
                     Q190 30, 185 40 
                     Q195 50, 190 60 
                     Q200 70, 195 80 
                     Q200 90, 195 100 
                     Q200 110, 195 120 
                     Q200 130, 195 140 
                     Q200 150, 195 160 
                     Q200 170, 195 180 
                     Q200 190, 195 200 
                     Q200 210, 195 220 
                     Q190 230, 180 235 
                     L20 235 
                     Q10 230, 5 220 
                     Q0 210, 5 200 
                     Q0 190, 5 180 
                     Q0 170, 5 160 
                     Q0 150, 5 140 
                     Q0 130, 5 120 
                     Q0 110, 5 100 
                     Q0 90, 5 80 
                     Q0 70, 5 60 
                     Q0 50, 5 40 
                     Q10 30, 20 20 Z"
                  fill="#6B7280"
                  stroke="#D97706"
                  strokeWidth="3"
                />

                {/* Card Content */}
                <foreignObject x="15" y="15" width="170" height="205">
                  <div className="h-full flex flex-col items-center justify-between p-4 text-center">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-amber-600 rounded-full mb-3 flex items-center justify-center">
                      <div className="w-8 h-8 bg-amber-700 rounded-full"></div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <Star key={index} className="w-4 h-4 text-yellow-500 fill-current mx-0.5" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <div className="flex-1 flex flex-col justify-center mb-4">
                      <p className="text-xs text-amber-700 leading-tight">
                        TextTextText
                        <br />
                        TextTextText
                        <br />
                        TextTextText
                        <br />
                        TextTextText
                      </p>
                    </div>

                    {/* Name Button */}
                    <div className="w-full bg-pink-600 text-white text-sm font-bold py-2 px-4 text-center">NAME</div>
                  </div>
                </foreignObject>
              </svg>
            </div>
          ))}
        </div>

        {/* Inspiration Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {inspirationCards.map((card) => (
            <div
              key={card.id}
              className="bg-amber-50 border-2 border-yellow-500 rounded-lg p-4 cursor-pointer group hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {/* Image Placeholder */}
              <div className="w-full h-32 bg-white border border-gray-300 rounded mb-4 flex items-center justify-center">
                <div className="w-full h-full bg-white"></div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-base font-bold text-amber-800 mb-2">{card.title}</h3>
                <p className="text-xs text-amber-700 leading-tight">{card.description}</p>
              </div>

              {/* Read More Button */}
              <button
                onClick={() => handleReadMore(card.id)}
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-200"
              >
                Read More {">"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurCustomers
