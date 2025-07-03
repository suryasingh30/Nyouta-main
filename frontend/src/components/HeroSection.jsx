"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Sample wedding images for the slider
  const sliderImages = [
    "/a1.jpg",
    "/a2.jpg?height=400&width=1200",
    "/a3.jpg?height=400&width=1200",
    "/a4.svg?height=400&width=1200",
  ]

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, sliderImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="w-full">
      {/* First Div - Image Slider */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {/* Breadcrumb Navigation */}
        <div className="absolute top-4 left-4 z-20 flex items-center text-white bg-black bg-opacity-30 px-3 py-1 rounded">
          <span className="text-sm font-medium">Home</span>
          <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
        </div>

        {/* Slider Images */}
        <div className="relative w-full h-full">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Wedding slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm transition-all duration-200 z-20"
        >
          {isAutoPlay ? "Pause" : "Play"}
        </button>
      </div>

      {/* Second and Third Divs - Promotional Cards */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Second Div - Left Promotional Card */}
        <div className="flex-1 bg-gradient-to-br from-orange-50 to-pink-50 p-8 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-amber-700 text-sm font-medium mb-2">Make your own - FREE</p>
            <h2 className="text-4xl font-bold text-pink-600 mb-1">WEDDING</h2>
            <h2 className="text-4xl font-bold text-pink-600 mb-4">WEBSITE</h2>
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 mb-4">
              EXPLORE DESIGNS
            </button>
            <p className="text-amber-700 text-sm">A simple, beautiful website just for you - FREE</p>
          </div>
          <div className="ml-8">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Wedding website mockup"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-16 h-20 bg-white rounded-lg shadow-md flex items-center justify-center">
                <img src="/placeholder.svg?height=60&width=40" alt="Mobile mockup" className="rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Third Div - Right Promotional Card */}
        <div className="flex-1 bg-gradient-to-br from-orange-50 to-pink-50 p-8 flex items-center justify-between border-l border-pink-100">
          <div className="flex-1">
            <p className="text-amber-700 text-sm font-medium mb-2">Make your own - FREE</p>
            <h2 className="text-4xl font-bold text-pink-600 mb-1">WEDDING</h2>
            <h2 className="text-4xl font-bold text-pink-600 mb-4">WEBSITE</h2>
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 mb-4">
              EXPLORE DESIGNS
            </button>
            <p className="text-amber-700 text-sm">A simple, beautiful website just for you - FREE</p>
          </div>
          <div className="ml-8">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Wedding website mockup"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-16 h-20 bg-white rounded-lg shadow-md flex items-center justify-center">
                <img src="/placeholder.svg?height=60&width=40" alt="Mobile mockup" className="rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
