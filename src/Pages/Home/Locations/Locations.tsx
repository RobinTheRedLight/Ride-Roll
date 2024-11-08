import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import newYork from "../../../assets/Home/New York.jpg";
import chicago from "../../../assets/Home/Chicago.jpg";
import sanFrancisco from "../../../assets/Home/San Francisco.jpg";
import sanJose from "../../../assets/Home/San Jose.jpg";
import lasVegas from "../../../assets/Home/Las Vegas.jpg";
import { IoLocationOutline } from "react-icons/io5";
import "./style.css";

const Locations = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [swiperRef, setSwiperRef] = useState(null as any);
  console.log(swiperRef);
  return (
    <section className="max-w-7xl mx-auto pb-8 px-4 md:px-10">
      <div className="text-3xl font-[Oswald] mb-2 text-start mx-0 md:mx-4 text-secondary-content">
        <h1 className="uppercase flex">
          <span className="  py-1">
            <IoLocationOutline className="" />
          </span>
          <span>Locations</span>
        </h1>
        <div className="border-b-2 border-accent mt-2 w-full "></div>
      </div>
      <div className="pt-2">
        <Swiper
          modules={[Navigation]}
          onSwiper={setSwiperRef}
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="mySwiper"
        >
          {[
            { img: newYork, title: "New York" },
            { img: chicago, title: "Chicago" },
            { img: sanJose, title: "San Jose" },
            { img: lasVegas, title: "Las Vegas" },
            { img: sanFrancisco, title: "San Francisco" },
          ].map(({ img, title }) => (
            <SwiperSlide key={title}>
              <div className="w-full md:w-60 h-60 mx-auto rounded-lg ">
                <img
                  className="w-full h-full object-cover mx-auto "
                  src={img}
                  alt=""
                />
                <h3 className="-mt-36 md:-mt-14 text-3xl text-center md:text-2xl text-white font-semibold">
                  {title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Locations;
