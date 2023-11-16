import { useCallback, useEffect, useState } from "react";
import dummyMovieInfo from "../../resources/movieInfo.json";
import ottList from "../../resources/ottlist.json";
import { MovieThumbnailSkeletionComponent } from "../../Common/SkeletonComponent";
import ThumbnailCard from "./Card";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./CategoryContent.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

export default function ContentCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [ottHotContentList, setOttHotContentList] = useState([]);
  const [ottNewContentList, setOttNewContentList] = useState([]);
  const [ottRatingContentList, setOttRatingContentList] = useState([]);
  const [selectOtt, setSelectOtt] = useState(ottList.ott_list[0]);
  // 스켈레톤 컴포넌트의 배열 개수
  const tempCount = 5;
  const tempArr = Array.from({ length: tempCount }, (_, index) => index);

  const handleSelectOtt = (id) => {
    //여기서 Ott 값을 바꿔 페이지 참조값을 갱신
    setSelectOtt(id);
  };
  const getOttData = useCallback(async () => {
    // selectOtt 값이  변경될때마다 서버에서 ott 데이터를 받아옴
    console.log(selectOtt.id);
  }, [selectOtt]);

  /**
   * 추후 useEffect 에서 페이지 로딩시 데이터를 가져오는 역활
   */
  const getCategoryData = async () => {
    // const response = await GetData("url");
    const response = null;
    if (response !== null) {
      setCategoryList(response);
    } else {
      // 연출용 랜덤 타임
      setTimeout(() => {
        setCategoryList(dummyMovieInfo.movie_list_info);
      }, Math.floor(Math.random() * 3000));
      setTimeout(() => {
        setOttHotContentList(dummyMovieInfo.movie_list_info);
      }, Math.floor(Math.random() * 3000));
      setTimeout(() => {
        setOttNewContentList(dummyMovieInfo.movie_list_info);
      }, Math.floor(Math.random() * 3000));
      setTimeout(() => {
        setOttRatingContentList(dummyMovieInfo.movie_list_info);
      }, Math.floor(Math.random() * 3000));
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  useEffect(() => {
    getOttData();
  }, [getOttData]);
  return (
    <div>
      <div>
        <div className="text-3xl text-white font-bold">
          👀 watchHere 에서 리뷰 많은 컨텐츠 모아보기
        </div>
        <div className="flex mt-10">
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1080: {
                slidesPerView: 5,
              },
            }}
            slidesPerView={1}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
          >
            {categoryList.length > 0
              ? categoryList?.map((element) => (
                  <SwiperSlide key={element.id}>
                    <ThumbnailCard props={element} />
                  </SwiperSlide>
                ))
              : tempArr.map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <MovieThumbnailSkeletionComponent />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
      <div className="mt-10 w-full flex items-center justify-around">
        {ottList.ott_list.map((element, idx) => (
          <button
            className={`border-2 w-40 h-12 rounded-3xl text-xl font-bold border-[#40AD80] ${
              element.id === selectOtt.id && "bg-[#40AD80] text-white"
            }`}
            key={idx}
            onClick={() => handleSelectOtt(element)}
          >
            {element.name}
          </button>
        ))}
      </div>

      <div className="mt-10 text-3xl text-white font-bold">
        🔥 지금 {selectOtt.name} 에서 인기 많은 컨텐츠
      </div>
      <div className="mt-10 flex">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1080: {
              slidesPerView: 5,
            },
          }}
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
        >
          {ottHotContentList.length > 0
            ? ottHotContentList?.map((element) => (
                <SwiperSlide key={element.id}>
                  <ThumbnailCard props={element} />
                </SwiperSlide>
              ))
            : tempArr.map((_, idx) => (
                <SwiperSlide key={idx}>
                  <MovieThumbnailSkeletionComponent />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      <div className="mt-10 text-3xl text-white font-bold">
        📢 새로 업데이트 된 {selectOtt.name} 컨텐츠
      </div>
      <div className="mt-10 flex">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1080: {
              slidesPerView: 5,
            },
          }}
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
        >
          {ottNewContentList.length > 0
            ? ottNewContentList?.map((element) => (
                <SwiperSlide key={element.id}>
                  <ThumbnailCard props={element} />
                </SwiperSlide>
              ))
            : tempArr.map((_, idx) => (
                <SwiperSlide key={idx}>
                  <MovieThumbnailSkeletionComponent />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
      <div className="mt-10 text-3xl text-white font-bold">
        ⭐ 높은 평점을 받은 {selectOtt.name} 컨텐츠
      </div>
      <div className="mt-10 flex">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1080: {
              slidesPerView: 5,
            },
          }}
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
        >
          {ottRatingContentList.length > 0
            ? ottRatingContentList?.map((element) => (
                <SwiperSlide key={element.id}>
                  <ThumbnailCard props={element} />
                </SwiperSlide>
              ))
            : tempArr.map((_, idx) => (
                <SwiperSlide key={idx}>
                  <MovieThumbnailSkeletionComponent />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
