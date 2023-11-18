import { RiBookmarkFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AddedFavoritesModal } from "./CategoryModal";

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
  const {
    idx,
    //  link,
    name_kr,
    thumbnail,
    // type,
    year,
  } = props;
  return (
    <div className="">
      <div className="rounded group">
        <img src={thumbnail} className="group-hover:opacity-50" alt="" />
        <div className="w-64 h-80 hidden group-hover:block absolute transform -translate-y-full text-white">
          <div className="h-full py-4 flex flex-col justify-between">
            <div>
              <div className="text-xl font-bold w-full bg-[#00B9AE] text-black">
                {name_kr}
              </div>
              <div>별점</div>
            </div>
            <div className="">
              <div>리뷰 (49개)</div>
              <div className="mt-2 px-4 w-full flex items-center justify-between">
                <div className="flex items-center justify-center bg-gray-700 w-12 h-12">
                  <RiBookmarkFill className="w-10 h-10" />
                </div>
                <div className="flex items-center justify-center rounded-md bg-[#00B9AE] text-black font-bold text-xl w-2/3 h-12">
                  <Link to={`/contentDetail/${idx}`}> 상세보기 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center text-center text-xl font-bold mt-2">
        {name_kr}
      </div>
      <div className="flex mt-1">
        <div className="">{year}</div>
        <div className="ml-2">104</div>
      </div>
    </div>
  );
}
