"use client"

const Cards = () => {
  const handleNavigation = (category) => {
    console.log(`Navigating to: ${category}`)
    // Replace with your actual navigation logic
  }

  const cardCategories = [
    // Top row
    { id: 1, title: "Wedding Invitations", route: "/wedding-invitations" },
    { id: 2, title: "Party Invitations", route: "/party-invitations" },
    { id: 3, title: "Wedding Itinerary", route: "/wedding-itinerary" },
    { id: 4, title: "Tags & Stickers", route: "/tags-stickers" },
    // Bottom row
    { id: 5, title: "Pooja Invitations", route: "/pooja-invitations" },
    { id: 6, title: "Ceremony Invitations", route: "/ceremony-invitations" },
    { id: 7, title: "Wedding Calendars", route: "/wedding-calendars" },
    { id: 8, title: "Wedding Games", route: "/wedding-games" },
  ]

  const handleShopNow = () => {
    console.log("Shop Now clicked - Navigate to shop page")
  }

  return (
    <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-16" style={{ backgroundColor: "#8B4513" }}>
      <div className="max-w-6xl mx-auto">
        {/* Top Row Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-12">
          {cardCategories.slice(0, 4).map((card) => (
            <div
              key={card.id}
              onClick={() => handleNavigation(card.title)}
              className="flex flex-col items-center cursor-pointer group transition-transform duration-200 hover:scale-105"
            >
              {/* Perfect Arch-shaped Card */}
              <div className="w-32 h-40 md:w-40 md:h-48 lg:w-44 lg:h-52 mb-6 relative">
                <div
                  className="w-full h-full bg-white shadow-md group-hover:shadow-lg transition-shadow duration-200"
                  style={{
                    borderRadius: "50% 50% 0 0",
                  }}
                />
              </div>
              {/* Card Title */}
              <h3 className="text-white text-sm md:text-base lg:text-lg font-medium text-center leading-tight px-1 max-w-36">
                {card.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Central Hexagonal Shop Now Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleShopNow}
            className="relative text-white font-bold py-4 px-10 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            style={{
              backgroundColor: "#E91E63",
              clipPath: "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
              minWidth: "180px",
              minHeight: "60px",
            }}
          >
            <span className="relative z-10">SHOP NOW</span>
          </button>
        </div>

        {/* Bottom Row Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {cardCategories.slice(4, 8).map((card) => (
            <div
              key={card.id}
              onClick={() => handleNavigation(card.title)}
              className="flex flex-col items-center cursor-pointer group transition-transform duration-200 hover:scale-105"
            >
              {/* Perfect Arch-shaped Card */}
              <div className="w-32 h-40 md:w-40 md:h-48 lg:w-44 lg:h-52 mb-6 relative">
                <div
                  className="w-full h-full bg-white shadow-md group-hover:shadow-lg transition-shadow duration-200"
                  style={{
                    borderRadius: "50% 50% 0 0",
                  }}
                />
              </div>
              {/* Card Title */}
              <h3 className="text-white text-sm md:text-base lg:text-lg font-medium text-center leading-tight px-1 max-w-36">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
