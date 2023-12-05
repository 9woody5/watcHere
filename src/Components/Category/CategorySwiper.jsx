import ThumbnailCard from "./Card";
import { SkeletionComponent } from "../../Common/SkeletonComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cssModule from "./CategorySwiper.module.css";
// import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";

export default function CategorySwiper({ props, type }) {
  // 스켈레톤 컴포넌트의 배열 개수
  const tempCount = 5;
  const tempArr = Array.from({ length: tempCount }, (_, index) => index);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="mt-10 relative -top-20 left-full flex md:hidden">
        <button
          ref={prevRef}
          className="w-12 h-12 -ml-44 rounded-full bg-white flex items-center justify-center"
        >
          <MdOutlineArrowBackIosNew className="text-3xl" />
        </button>
        <button
          ref={nextRef}
          className="w-12 h-12 ml-10 rounded-full bg-[#40AD80] flex items-center justify-center"
        >
          <MdArrowForwardIos className="text-white text-3xl" />
        </button>
      </div>

      <Swiper
        breakpoints={{
          720: {
            slidesPerView: 1,
          },
          1080: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 5,
          },
          1650: {
            slidesPerView: 6,
          },
          1800: {
            slidesPerView: 6,
          },
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        modules={[FreeMode, Pagination, Autoplay, Navigation]}
        className={cssModule["swiper"]}
      >
        {props.length > 0
          ? props?.map((element, idx) => (
              <SwiperSlide key={idx} className={cssModule["swiper-slide"]}>
                <ThumbnailCard props={element} type={type} />
              </SwiperSlide>
            ))
          : tempArr.map((_, idx) => (
              <SwiperSlide key={idx} className={cssModule["swiper-slide"]}>
                <SkeletionComponent />
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
