import { Link } from "react-router-dom";
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
//   Email,
// } from "lucide-react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-[#4B1E00] text-[#F8EDD9] font-avalonN">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <div className="bg-[#F8EDD9] text-[#4B1E00] px-6 py-10 w-full lg:w-1/4 flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold mb-4">Designed and Developed by</p>
            {/* Logo text */}
            <div className="leading-tight">
              <h1 className="text-5xl font-extrabold">House of</h1>
              <h1 className="text-5xl font-extrabold">MarkTech</h1>
            </div>
          </div>
          <div className="mt-10 text-sm font-semibold">
            <p>© 2025 Nyouta.</p>
            <p>All rights reserved.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Nyuota Column */}
          <div>
            <h2 className="text-2xl font-avalonB mb-4">Nyuota</h2>
            <ul className="space-y-2">
              <li><Link to="/aboutus" className="hover:underline">About us</Link></li>
              <li><Link to="/contactus" className="hover:underline">Join us</Link></li>
              <li><Link to="#" className="hover:underline">Offers</Link></li>
              <li><Link to="#" className="hover:underline">Awards</Link></li>
              <li><Link to="/product/:id" className="hover:underline">Shops</Link></li>

            </ul>
          </div>

          {/* Explore Column */}
          <div>
            <h2 className="text-2xl font-avalonB mb-4">Explore</h2>
            <ul className="space-y-2">
              <li><Link to="/join-e-nyouta" className="hover:underline">Share Memories</Link></li>
              <li><Link to="#" className="hover:underline">Free Greetings</Link></li>
          {/* <li><Link to="/join-e-nyouta" className="hover:underline">Submit form to join</Link></li> */}

            </ul>
          </div>

          {/* Resources Column */}
          {/* <div>
            <h2 className="text-2xl font-avalonB mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li>TEXT HERE</li>

            </ul> */}

            
          {/* Contact Us */}
          <div>
            <h2 className="text-xl font-avalonB mb-4 text-white">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:info@nyouta.com"
                  className="hover:text-white transition-colors"
                >
                  info@nyouta.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <a
                  href="tel:+919549541111"
                  className="hover:text-white transition-colors"
                >
                  +91-954-954-1111
                </a>
              </div>
              <div className="text-sm">
                <p>{"Monday to Saturday 10am-5pm IST"}</p>
                <p>Closed all Sunday & holidays</p>
              </div>
            </div>
          {/* </div>
        </div>
      </div> */}
            

            {/* Social Icons */}
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/nyoutastores"
                  target="_blank"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/Nyoutastore"
                  target="_blank"
                  className="hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@nyoutastore"
                  target="_blank"
                  className="hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/nyoutastore/"
                  target="_blank"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
