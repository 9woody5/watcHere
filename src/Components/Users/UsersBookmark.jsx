import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { movieListState } from "../../Common/CommonAtom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsBookmarkStarFill } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/swiper.css";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

const UsersBookmark = () => {
  const [bookmarkedMovies, setBookmarkedMovies] =
    useRecoilState(movieListState);

  // 토큰을 로컬 스토리지에서 가져오는 함수
  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = getToken();

        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [moviesResponse, tvShowsResponse] = await Promise.allSettled([
          axios.get(
            "https://kdt-sw-6-team05.elicecoding.com/api/v1/likes/my-movie?page=0&size=20",
            axiosConfig
          ),
          axios.get(
            "https://kdt-sw-6-team05.elicecoding.com/api/v1/likes/my-tv-show?page=0&size=20",
            axiosConfig
          ),
        ]);

        const movies =
          moviesResponse.status === "fulfilled"
            ? moviesResponse.value.data.content
            : [];
        const tvShows =
          tvShowsResponse.status === "fulfilled"
            ? tvShowsResponse.value.data.content
            : [];

        // 영화와 TV 프로그램 데이터를 하나의 배열로 병합
        const combinedContent = [...movies, ...tvShows];

        setBookmarkedMovies(combinedContent.reverse());
      } catch (error) {
        console.error("콘텐츠 데이터를 불러오는 데 실패했습니다", error);
      }
    };

    fetchContent();
  }, [setBookmarkedMovies]);

  return (
    <div className="border-solid border-2 border-custom-light-gray rounded-sm bg-custom-middle-gray px-4 w-[60%] h-[400px] ">
      <header className="flex justify-between items-center p-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">북마크</h2>
          <div className="mx-2">
            <BsBookmarkStarFill size={20} color="#40AD80" />
          </div>
        </div>
        <div className="text-right font-bold text-[#40AD80] btn btn-ghost avatar hover:bg-zinc-700">
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
          {" "}
          {bookmarkedMovies.length > 0 ? (
            bookmarkedMovies.map((content, index) => (
              <SwiperSlide key={index} style={{ width: "33%", height: "100%" }}>
                <div className="flex flex-col items-center justify-center w-[full] h-[full] ">
                  <img
                    src={content.poster_path}
                    alt={content.title || content.name}
                    style={{ width: "100%", height: "180px" }}
                  />
                  <h3 className="text-left text-white mt-2 truncate w-32">
                    {content.title || content.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center text-white text-lg font-bold translate-y-[300%]">
              나만의 북마크를 지정해주세요 😴
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default UsersBookmark;
