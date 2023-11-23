import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Slider from "./Slider";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/swiper.css";

export const SwiperComponent = ({ contents, customSlidesPerView, autoplayEnabled }) => {
  console.log("autoplayEnabled:", autoplayEnabled);
  // 마우스 오버 시, 슬라이드 정지
  const [swiper, setSwiper] = useState(null);
  const toggleSlideAutoplay = (playStatus) => {
    if (swiper && swiper.autoplay) {
      const isAutoplay = playStatus;
      swiper.autoplay[isAutoplay ? "start" : "stop"]();
    }
  };
  // 슬라이드 별 콘텐츠 개수 동적 변경
  const slidesPerView = customSlidesPerView || 4;

  const autoplayConfig = {
    delay: 2300,
    disableOnInteraction: false,
  };

  return (
    <>
      <Swiper
        onSwiper={setSwiper}
        breakpoints={{
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            pagination: {
              clickable: false,
            },
          },
          876: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            pagination: {
              clickable: false,
            },
          },
          1080: {
            slidesPerView: slidesPerView,
            slidesPerGroup: 2,
            pagination: {
              clickable: true,
            },
          },
        }}
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        autoplay={autoplayEnabled ? autoplayConfig : false}
        navigation={true}
        modules={[FreeMode, Pagination, Autoplay, Navigation]}
        className="mySwiper font-pretendard"
      >
        {contents.map((content, index) => (
          <SwiperSlide
            key={index}
            onMouseOver={() => toggleSlideAutoplay(false)}
            onMouseLeave={() => toggleSlideAutoplay(true)}
          >
            <Link to={`/contentDetail/${content.id}`} className="w-full h-full flex items-center justify-center">
              <Slider content={content} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
