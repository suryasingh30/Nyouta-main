"use client"

const WeddingJourney = () => {
  const plannerCards = [
    {
      id: 1,
      title: "Wedding Management Planner",
      subtitle: "{ Easy to Manage Wedding }",
      image: "/placeholder.svg?height=80&width=80",
      route: "/wedding-planner-1",
    },
    {
      id: 2,
      title: "Wedding Management Planner",
      subtitle: "{ Easy to Manage Wedding }",
      image: "/placeholder.svg?height=80&width=80",
      route: "/wedding-planner-2",
    },
    {
      id: 3,
      title: "Wedding Management Planner",
      subtitle: "{ Easy to Manage Wedding }",
      image: "/placeholder.svg?height=80&width=80",
      route: "/wedding-planner-3",
    },
    {
      id: 4,
      title: "Wedding Management Planner",
      subtitle: "{ Easy to Manage Wedding }",
      image: "/placeholder.svg?height=80&width=80",
      route: "/wedding-planner-4",
    },
    {
      id: 5,
      title: "Wedding Management Planner",
      subtitle: "{ Easy to Manage Wedding }",
      image: "/placeholder.svg?height=80&width=80",
      route: "/wedding-planner-5",
    },
    {
      id: 6,
      title: "Wedding Management Planner",
      subtitle: "{ Easy to Manage Wedding }",
      image: "/placeholder.svg?height=80&width=80",
      route: "/wedding-planner-6",
    },
  ]

  const handleShopNow = (cardId) => {
    console.log(`Shop Now clicked for planner ${cardId}`)
    // Add your navigation logic here
    // navigate(`/shop/wedding-planner/${cardId}`)
  }

  const handleCardClick = (cardId) => {
    console.log(`Card ${cardId} clicked`)
    // Add your navigation logic here
    // navigate(`/wedding-planner/${cardId}`)
  }

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">
            Your wedding journey starts here !
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            The Perfect Planner for your Big Day | Plan your Perfect Day, Step by Step
          </p>
        </div>

        {/* Planner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {plannerCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="bg-amber-50 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 hover:bg-amber-100"
            >
              {/* Card Content */}
              <div className="flex items-center space-x-3 mb-4">
                {/* Placeholder Image */}
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-shadow duration-300">
                  <img src={card.image || "/placeholder.svg"} alt="Wedding Planner" className="w-6 h-6 opacity-30" />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-amber-800 mb-1 leading-tight">{card.title}</h3>
                  <p className="text-amber-700 text-xs md:text-sm">{card.subtitle}</p>
                </div>
              </div>

              {/* Shop Now Button */}
              <div className="flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShopNow(card.id)
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeddingJourney
