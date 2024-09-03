/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
import Hero from "../Hero/Hero";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import ChooseUs from "../ChooseUs/ChooseUs";
import Discount from "../Discount/Discount";
import ContactUs from "../ContactUs/ContactUs";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const Home = () => {
  const user = useAppSelector(selectCurrentUser) as any;
  return (
    <div>
      <Helmet>
        <title>Ride & Roll | Home</title>
      </Helmet>
      <Hero />
      <Featured />
      <Testimonials />
      <ChooseUs />
      {user && (
        <>
          <Discount />
        </>
      )}
      <ContactUs />
    </div>
  );
};

export default Home;
