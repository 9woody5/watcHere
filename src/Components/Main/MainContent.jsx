// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { generateContentList } from "./fakeData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../styles/swiper.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

export const Slider = ({ content }) => {
  return (
    <div className="slider w-full object-cover">
      <img src={content.posterImage} alt={content.title} />
      <h3>{content.title}</h3>
      <p>{content.rank}</p>
      <span>{content.releaseDate}</span>
      <span>{content.runningTime}</span>
    </div>
  );
};

export default function MainContent({ numberOfContent }) {
  const contents = generateContentList(numberOfContent);

  return (
    <>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            pagination: {
              clickable: false,
            },
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            pagination: {
              clickable: false,
            },
          },
          [1080]: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            pagination: {
              clickable: true,
            },
          },
        }}
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        // autoplay={{
        //   delay: 3500,
        //   disableOnInteraction: false,
        // }}
        navigation={true}
        modules={[FreeMode, Pagination, Autoplay, Navigation]}
        className="mySwiper font-pretendard"
      >
        {contents.map((content, index) => (
          <SwiperSlide key={index}>
            <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
              <Slider content={content} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
