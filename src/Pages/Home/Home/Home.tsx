/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import ChooseUs from "../ChooseUs/ChooseUs";
import Discount from "../Discount/Discount";

import NavBarHero from "../Hero/Hero";
import Footer from "../../Shared/Footer/Footer";
import Locations from "../Locations/Locations";
import Clients from "../Clients/Clients";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <title>Ride & Roll | Home</title>
      </Helmet>
      <NavBarHero />
      <ChooseUs />
      <Locations />
      <Featured />
      <Discount />
      <Testimonials />
      <Clients />
      <Footer />
    </div>
  );
};

export default Home;
