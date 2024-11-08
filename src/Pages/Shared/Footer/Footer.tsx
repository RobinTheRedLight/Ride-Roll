import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
  return (
    <div className=" ">
      {/* Links Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 t border-t border-gray-600 py-10 px-6">
        <div>
          <h6 className="font-semibold  mb-4">Discover</h6>
          <nav>
            <a className="block  mb-2">Top Destinations</a>
            <a className="block  mb-2">Customer Stories</a>
            <a className="block  mb-2">Travel Tips</a>
            <a className="block mb-2">Adventure Guides</a>
          </nav>
        </div>
        <div>
          <h6 className="font-semibold  mb-4">Our Services</h6>
          <nav>
            <a className="block hover: mb-2">Flight Bookings</a>
            <a className="block  mb-2">Hotel Reservations</a>
            <a className="block  mb-2">Car Rentals</a>
            <a className="block  mb-2">Travel Insurance</a>
          </nav>
        </div>
        <div>
          <h6 className="font-semibold mb-4">Company</h6>
          <nav>
            <a className="block hover: mb-2">Our Story</a>
            <a className="block hover: mb-2">Team</a>
            <a className="block hover: mb-2">Careers</a>
            <a className="block hover: mb-2">Contact Us</a>
          </nav>
        </div>
        <div>
          <h6 className="font-semibold  mb-4">Connect With Us</h6>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Twitter" className="">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="">
              <FaFacebook />
            </a>
            <a href="#" aria-label="LinkedIn" className="">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 py-6 text-center text-sm ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <p className="flex items-center mb-4 md:mb-0">
            <AiOutlineCopyright className="mr-2" /> {new Date().getFullYear()}{" "}
            Ride & Roll Inc.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="#" className="">
              New York
            </a>
            <a href="#" className="">
              Toronto
            </a>
            <a href="#" className="">
              Sydney
            </a>
            <a href="#" className="">
              Berlin
            </a>
            <a href="#" className="">
              Tokyo
            </a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="">
              Privacy Policy
            </a>
            <a href="#" className="">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
