import { RiBookmarkFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AddedFavoritesModal } from "./CategoryModal";
import { useLocation } from "react-router-dom";
import Connect from "../../Network/Connect.json";
import { GetData } from "../../Network/Connect";
import { useEffect, useState } from "react";
import errorImg from "../../assets/img/404.png";
/**
 *영화 썸네일 카드 리스트
 *
 * @param {Number} idx 인덱스
 * @param {String} name_kr 영화 이름
 * @param {String} Thumbnail 영화 썸네일 이미지 링크 주소
 * @param {String} year 영화 제작 년도
 * @returns
 */

export default function ThumbnailCard({ props }) {
  const { year, id, title, poster_path } = props;
  const [review, setReview] = useState(0);
  const [rating, setRating] = useState();
  const location = useLocation();
  const handleImgError = (e) => {
    e.target.src = errorImg;
  };
  useEffect(() => {
    async function GetRatings() {
      const response = await GetData(
        Connect["mainUrl"] +
          Connect["contentRatings"].replace("{contentId}", id)
      );
      return response;
    }
    async function GetReview() {
      const response = await GetData(
        Connect["mainUrl"] +
          Connect["contentReviews"].replace("{contentId}", id)
      );
      return response;
    }

    setRating(GetRatings());
    setReview(GetReview());
  }, [id]);
  return (
    <div className="w-full">
      <div className="rounded group flex items-center justify-center lg:mx-50 ">
        <img
          src={poster_path}
          className="group-hover:opacity-50"
          loading="lazy"
          alt=""
          onError={handleImgError}
        />
        <div className="w-64 h-80 hidden group-hover:block absolute text-white ">
          <div className="h-full py-4 flex flex-col justify-between">
            <div>
              <div className="text-xl font-bold w-full bg-[#00B9AE] text-black">
                {title}
              </div>
              <div>
                <div className="rating rating-lg rating-half">
                  <input
                    type="radio"
                    name="rating-10"
                    className="rating-hidden"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                  />
                </div>
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
                <div className="flex items-center justify-center bg-gray-700 w-12 h-12">
                  <RiBookmarkFill
                    className="w-10 h-10"
                    onClick={() =>
                      document
                        .getElementById("addFavoritesModal" + id)
                        .showModal()
                    }
                  />
                </div>
                <div className="flex items-center justify-center rounded-md bg-[#00B9AE] text-black font-bold text-xl w-2/3 h-12">
                  <Link to={`${location.pathname}/${id}`}> 상세보기 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-xl font-bold mt-2 flex items-center justify-center">
        {title}
      </div>
      <div className="flex mt-1">
        <div className="">{year}</div>
        <div className="ml-2"></div>
      </div>
      <AddedFavoritesModal props={props} />
    </div>
  );
}
