import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import mockData from "../../resources/mockData.json";
import { BsBookmarkStarFill } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/swiper.css";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

const UsersBookmark = () => {
  return (
    <div className="border-solid border-2 border-custom-light-gray rounded-sm bg-custom-middle-gray px-4 w-[60%] h-[400px] ">
      <header className="flex justify-between items-center p-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">북마크</h2>
          <div className="mx-2">
            <BsBookmarkStarFill size={20} color="#40AD80" />
          </div>
        </div>
        <div className="text-right text-[#40AD80] btn btn-ghost avatar hover:bg-zinc-700">
          <Link to="bookmark-list">더보기</Link>
        </div>
      </header>
      <div className="w-[full] h-[80%]">
        <Swiper
          style={{
            width: "100%",
            height: "100%",
            margin: 0,
          }}
          slidesPerView={5}
          spaceBetween={20}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
        >
          {mockData.map((movie, index) => (
            <SwiperSlide
              key={index}
              style={{
                width: "33%",
                height: "100%",
              }}
            >
              <div className=" flex flex-col items-center justify-center w-[full] h-[full] border-solid border rounded border-[#40AD80]">
                <img
                  src={movie.Images[0]}
                  alt={movie.Title}
                  style={{
                    width: "100%",
                    height: "180px",
                  }}
                />
                <h3 className="text-white mt-2 truncate w-32">{movie.Title}</h3>
                <div
                  className="text-xs font-normal leading-4.5 whitespace-nowrap overflow-hidden truncate"
                  style={{
                    color: "rgb(255, 161, 54)",
                    height: "18px",
                  }}
                >
                  평가함
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default UsersBookmark;
