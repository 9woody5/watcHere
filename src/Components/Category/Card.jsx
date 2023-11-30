import { RiBookmarkFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AddedFavoritesModal } from "./CategoryModal";
import { useLocation } from "react-router-dom";
import Connect from "../../Network/Connect.json";
import { GetData } from "../../Network/Connect";
import { useEffect, useState } from "react";
import errorImg from "../../assets/img/no_img.png";
/**
 *영화 썸네일 카드 리스트
 *
 * @param {Number} idx 인덱스
 * @param {String} name_kr 영화 이름
 * @param {String} Thumbnail 영화 썸네일 이미지 링크 주소
 * @param {String} year 영화 제작 년도
 * @returns
 */

export default function ThumbnailCard({ props, type }) {
  const { year, id, title, name, poster_path, movie_id, tv_show_id } = props;
  const [review, setReview] = useState(0);
  const location = useLocation();
  const handleImgError = (e) => {
    e.target.src = errorImg;
  };
  useEffect(() => {
    async function GetReview() {
      let type = "";

      switch (location.pathname) {
        case "/movie":
          type = "MOVIE";
          break;
        case "/tv":
          type = "TV";
          break;
        case "/animation":
          type = "TV";
          break;
        default:
          break;
      }
      let page = 0;
      let size = 10;
      let sortBy = "createdAtDesc";
      let queryString = `?contentType=${type}&page=${page}&size${size}&sortBy=${sortBy}`;
      const response = await GetData(
        Connect["mainUrl"] +
          Connect["contentReviews"].replace(
            "{contentId}",
            id || movie_id || tv_show_id
          ) +
          queryString
      );
      return response;
    }
    setReview(GetReview());
  }, [id, movie_id, tv_show_id, location.pathname]);
  return (
    <div className="w-full">
      <div className="rounded group flex items-center justify-center lg:mx-50 ">
        <img
          src={poster_path}
          className="group-hover:opacity-50 transition-all duration-300 ease-in-out"
          loading="lazy"
          alt=""
          onError={handleImgError}
        />
        <div className="w-64 h-80 hidden group-hover:block absolute text-white ">
          <div className="h-full py-4 flex flex-col justify-between">
            <div>
              <div className="text-xl font-bold w-full bg-emerald-500 text-black">
                {title || name}
              </div>
            </div>
            <div className="">
              <div>
                리뷰 (
                {review?.total_elements === undefined
                  ? 0
                  : review.total_elements}
                개)
              </div>
              <div className="mt-2 px-4 w-full flex items-center justify-between">
                <div className="flex items-center justify-center bg-emerald-500 w-12 h-12 cursor-pointer rounded-lg">
                  <RiBookmarkFill
                    className="w-10 h-10"
                    onClick={() =>
                      document
                        .getElementById("addFavoritesModal" + id)
                        .showModal()
                    }
                  />
                </div>
                {/* 텍스트만 클릭 가능한 상태라 수정했습니다 */}
                {location.pathname === "/animation" && type === "movie" ? (
                  <Link
                    to={`/movie/${id || movie_id || tv_show_id}`}
                    className="flex items-center justify-center rounded-md bg-emerald-500 text-black font-bold text-xl w-2/3 h-12"
                  >
                    <div className="">상세보기</div>
                  </Link>
                ) : (
                  <Link
                    to={`/tv/${id || movie_id || tv_show_id}`}
                    className="flex items-center justify-center rounded-md bg-emerald-500 text-black font-bold text-xl w-2/3 h-12"
                  >
                    <div className="">상세보기</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-1">
        <div className="">{year}</div>
        <div className="ml-2"></div>
      </div>
      <AddedFavoritesModal props={props} />
    </div>
  );
}
