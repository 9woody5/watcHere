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
import { useEffect, useState } from "react";

export const Slider = ({ content, numberOfContent }) => {
  const [isHovered, setIsHoverd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const data = generateContentList(numberOfContent);
          setContentList(data);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("에러 발생", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [numberOfContent]);

  return (
    <div
      className="slider w-full h-full object-cover relative font-pretendard"
      onMouseOver={() => !isLoading && setIsHoverd(true)}
      onMouseLeave={() => !isLoading && setIsHoverd(false)}
    >
      {isLoading ? (
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-full h-[330px] bg-zinc-500 rounded sm:w-96 dark:bg-gray-700"></div>
        </div>
      ) : (
        <img src={content.posterImage} alt={content.title} />
      )}

      {isHovered && (
        <div
          className={`additional_info w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-zinc-800 text-white flex flex-col items-center justify-center bg-opacity-60 px-6 transition-opacity duration-300 ease-in-out  opacity-0 hover:opacity-100`}
        >
          <h3>{content.title}</h3>
          <p>{content.rank}위</p>
          <span>개봉일: {content.releaseDate}</span>
          <span>{content.runningTime}min</span>
        </div>
      )}
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
          1080: {
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
