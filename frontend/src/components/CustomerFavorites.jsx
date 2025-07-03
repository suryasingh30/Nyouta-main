"use client"

const CustomersFavorites = () => {
  const favoriteItems = [
    {
      id: 1,
      title: "Playing Cards",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      title: "Room Itinerary",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      title: "Passport Invites",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      title: "News paper Invites",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 5,
      title: "Mini Calendars",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 6,
      title: "Dining Mats",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  const handleShopNow = (itemTitle) => {
    console.log(`Shopping for: ${itemTitle}`)
    // Add your navigation or shopping logic here
  }

  return (
    <div className="w-full bg-gradient-to-b from-yellow-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">Customer Favorites</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Top picks chosen by our happy customers</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {favoriteItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* Circular Product Placeholder */}
              <div className="relative mb-6">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-3 border-yellow-400 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full opacity-30"
                  />
                </div>
                {/* Decorative border effect */}
                <div className="absolute inset-0 rounded-full border-2 border-yellow-300 opacity-50"></div>
              </div>

              {/* Product Title */}
              <h3 className="text-center text-amber-800 font-semibold text-sm md:text-base mb-4 px-2 leading-tight">
                {item.title}
              </h3>

              {/* Shop Now Button */}
              <button
                onClick={() => handleShopNow(item.title)}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                SHOP NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomersFavorites
