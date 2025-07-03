// import Image from "next/image"
import { ChevronRight } from "lucide-react"
import WeddingNotes from "./components/WeddingNotes"
import PlanBook from "./components/PlanBook"
import CARA from './assets/caraousel.png';
import GuestListBooklet from "./components/GuestListBooklet"
import './style/PlannerBooks.scss'
import FreePrintable from "./components/FreePrintable";
import AboutPlanner from "./components/AboutPlanner";
import GetAllPhotoBooksProducts from "../../hooks/GetAllPhotoBooksProducts";
import { useSelector } from "react-redux";
import GetAllFreeGreetingsroducts from "../../hooks/GetAllFreeGreetingsroducts";
import getAllWeddingManagementBook from "../../hooks/getAllWeddingManagementBook";
import { useEffect } from "react";

export default function PlannerBook() {
  GetAllPhotoBooksProducts();
  GetAllFreeGreetingsroducts();
  getAllWeddingManagementBook();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    // <div className="min-h-screen bg-gray-50 planner_book">
    <div className="min-h-screen bg-white-50 planner_book">
      {/* Breadcrumb Navigation */}
      <div className="bg-white px-6 py-4"></div>

      {/* Hero Section */}
      <div className="planner_hero_section">
        <div className="plhs_left_box">
          <h1>Planner Books</h1>
          <p>“The Perfect Planner for Your Special Day Ran Your Perfect Day, Step by Step”</p>
          <p>
            We offer comprehensive wedding planning tools, including a wedding planner book, guest management booklet,
            and a wedding notepad to keep every detail organized. From managing guests to tracking your plans, our
            products ensure a seamless, stress-free celebration.
          </p>
        </div>

        <div className="planner_hero_section_caraousel">
          <img src={CARA} alt="Planner Book Carousel" />
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* planner book component  */}
        <PlanBook />

        {/* For Wedding Notes Section */}
        <WeddingNotes />

        {/* For Guest List Section */}
        <GuestListBooklet />

        {/* Free Printables  */}
        <FreePrintable/>

        {/* about planner book  */}
        <AboutPlanner/>
      
      </div>
    </div>
  )
}

