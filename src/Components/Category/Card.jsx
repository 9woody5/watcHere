import { RiBookmarkFill } from "react-icons/ri";
import { Link } from "react-router-dom";
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
    <div className="border border-blue-300 shadow rounded-md p-4 w-full h-full">
      <div className="flex-1 space-y-2 group">
        <div className="h-72 bg-slate-700 rounded">
          <img
            src={thumbnail}
            className="w-full h-full group-hover:opacity-50"
            // style={{ backgroundColor: "rgba(255,0,0,0.5" }}
            alt=""
          />
        </div>
        <div className="hidden group-hover:block absolute transform -translate-y-full text-white w-56 h-72">
          <div className="w-full h-full flex flex-col justify-between p-4">
            <div>
              <div className="text-xl font-bold">{name_kr}</div>
              <div>별점 </div>
            </div>
            <div>
              <div>리뷰 (49개)</div>
              <div className="mt-2 w-full border flex items-center justify-between">
                <div className="w-1/3 h-12  flex items-center justify-center border bg-gray-700 ">
                  <RiBookmarkFill className="w-[60%] h-[60%]" />
                </div>
                <div className="ml-2 w-2/3 h-12 flex items-center justify-center rounded-md bg-[#00B9AE] text-black font-bold text-md ">
                  <Link to={`/contentDetail/${idx}`}> 상세보기 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 flex items-center text-center bg-slate-700 text-xl font-bold">
          {name_kr}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-slate-700 rounded col-span-2">{year}</div>
            <div className="h-4 bg-slate-700 rounded col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
