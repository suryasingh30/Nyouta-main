"use client"

import { Instagram } from "lucide-react"

const OurTrending = () => {
  const trendingItems = [
    { id: 1, title: "Trending Item 1", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, title: "Trending Item 2", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, title: "Trending Item 3", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, title: "Trending Item 4", image: "/placeholder.svg?height=200&width=200" },
    { id: 5, title: "Trending Item 5", image: "/placeholder.svg?height=200&width=200" },
    { id: 6, title: "Trending Item 6", image: "/placeholder.svg?height=200&width=200" },
  ]

  const handleCardClick = (itemId) => {
    console.log(`Navigating to trending item ${itemId}`)
    // Replace with your navigation logic
    // navigate(`/trending/${itemId}`)
  }

  const handleButtonClick = (type) => {
    console.log(`Navigating to ${type}`)
    // Replace with your navigation logic
    // navigate(`/${type.toLowerCase().replace(/\s+/g, '-')}`)
  }

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-3">What's Trending !</h2>
          <p className="text-lg text-gray-600">Find out what's making waves in the event world</p>
        </div>

        {/* Trending Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 mb-12">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="aspect-square rounded-lg border-2 border-pink-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-2 flex items-center justify-center"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover rounded opacity-0"
              />
            </div>
          ))}
        </div>

        {/* Follow Us Section */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">Follow us on</h3>
          <div className="flex justify-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 p-1 rounded-full"
            >
              <div className="bg-white rounded-full p-2">
                <Instagram className="w-8 h-8 text-pink-600" />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-amber-50 rounded-lg p-6 md:p-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Button */}
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <p className="text-amber-800 font-medium mb-2">Wedding & Events</p>
              <button
                onClick={() => handleButtonClick("News E-Paper")}
                className="bg-pink-600 hover:bg-pink-700 cursor-pointer text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                News E-Paper
              </button>
            </div>

            {/* Center Content */}
            <div className="text-center mb-8 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">Surprise your Guests !</h3>
              <p className="text-amber-800 italic mb-2">'Creative Impression with story'</p>
              <p className="text-amber-800 font-semibold">SHARE THE MAGIC</p>
            </div>

            {/* Right Button */}
            <div className="text-center md:text-right ">
              <p className="text-amber-800 font-medium mb-2">Wedding & Events</p>
              <button
                onClick={() => handleButtonClick("E-Magazine")}
                className="bg-pink-600 cursor-pointer hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                E-Magazine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurTrending
