import ThumbnailCard from "./Card";
import { MovieThumbnailSkeletionComponent } from "../../Common/SkeletonComponent";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cssModule from "./CategorySwiper.module.css";
// import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

export default function CategorySwiper({ props }) {
  // 스켈레톤 컴포넌트의 배열 개수
  const tempCount = 5;
  const tempArr = Array.from({ length: tempCount }, (_, index) => index);

  return (
    <Swiper
      breakpoints={{
        720: {
          slidesPerView: 1,
        },
        1080: {
          slidesPerView: 3,
        },
        1599: {
          slidesPerView: 5,
        },
      }}
      navigation={true}
      modules={[FreeMode, Pagination, Autoplay, Navigation]}
      className={cssModule["swiper"]}
    >
      {props.length > 0
        ? props?.map((element) => (
            <SwiperSlide key={element.id} className={cssModule["swiper-slide"]}>
              <ThumbnailCard props={element} />
            </SwiperSlide>
          ))
        : tempArr.map((_, idx) => (
            <SwiperSlide key={idx} className={cssModule["swiper-slide"]}>
              <MovieThumbnailSkeletionComponent />
            </SwiperSlide>
          ))}
    </Swiper>
  );
}
