/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
import Hero from "../Hero/Hero";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import ChooseUs from "../ChooseUs/ChooseUs";
import Discount from "../Discount/Discount";
import ContactUs from "../ContactUs/ContactUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Ride & Roll | Home</title>
      </Helmet>
      <Hero />
      <Featured />
      <Testimonials />
      <ChooseUs />
      <Discount />
      <ContactUs />
    </div>
  );
};

export default Home;
