// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../styles/swiper.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

export default function MainContent() {
  return (
    <>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1080: {
            slidesPerView: 3,
          },
        }}
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        // autoplay={{
        //   delay: 3500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[FreeMode, Pagination, Autoplay, Navigation]}
        className="mySwiper font-pretendard"
      >
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
            <div className="">컨텐츠 데이터</div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
