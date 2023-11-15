import { useEffect, useRef, useState } from "react";
import dummyMovieInfo from "../resources/movieInfo.json";
import { MovieThumbnailSkeletionComponent } from "../Common/SkeletonComponent";
export default function ContentCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [youtubeURL, setYoutubeUrl] = useState("");

  const playerRef = useRef(null);
  const getCategoryData = async () => {
    // const response = await GetData("url");
    const response = null;
    if (response !== null) {
      setCategoryList(response);
    } else {
      setTimeout(() => {
        setCategoryList(dummyMovieInfo.movie_list_info);
      }, 1000);
    }
  };
  const tempCount = 4;
  const tempArr = Array.from({ length: tempCount }, (_, index) => index);
  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div>
      <dialog
        id="youtube_modal"
        className="p-1"
        onClick={() => {
          document.getElementById("youtube_modal").close();
          console.log(playerRef);
        }}
      >
        <div className="p-auto">
          <iframe
            width="560"
            height="315"
            src={youtubeURL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ref={playerRef}
          ></iframe>
        </div>
      </dialog>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>

      <div>
        <div>watchHerer 에서 리뷰 많은 컨텐츠 모아보기</div>

        <div className="flex">
          {categoryList.length > 0
            ? categoryList?.map((element) => (
                <div
                  className="border border-blue-300 shadow rounded-md p-4 w-64 h-96"
                  key={element.idx}
                >
                  <div className="flex-1 space-y-2 py-1">
                    <div
                      className="h-72 bg-slate-700 rounded"
                      onClick={() => {
                        document.getElementById("youtube_modal").showModal();
                        setYoutubeUrl(element.link);
                      }}
                    >
                      <img
                        src={element.thumnail}
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                    <div className="h-8 flex items-center text-center bg-slate-700 text-xl font-bold">
                      {element.name_kr}
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-4 bg-slate-700 rounded col-span-2">
                          {element.year}
                        </div>
                        <div className="h-4 bg-slate-700 rounded col-span-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : tempArr.map((_, idx) => (
                <MovieThumbnailSkeletionComponent key={idx} />
              ))}
        </div>
      </div>
      <div>지금 NETFLIX 에서 인기 많은 컨텐츠</div>

      <div className="flex">
        {categoryList.length > 0
          ? categoryList?.map((element) => (
              <div
                className="border border-blue-300 shadow rounded-md p-4 w-64 h-96"
                key={element.idx}
              >
                <div className="flex-1 space-y-2 group">
                  <div className="h-72 bg-slate-700 rounded">
                    <img
                      src={element.thumnail}
                      className="w-full h-full group-hover:opacity-50"
                      alt=""
                    />
                  </div>
                  <div className="hidden group-hover:block absolute transform -translate-y-full text-white w-56 h-72">
                    <div className="w-full h-full flex flex-col justify-between p-4">
                      <div>
                        <div className="text-xl font-bold text-gray-700">
                          {element.name_kr}{" "}
                        </div>
                        <div>별점 </div>
                      </div>
                      <div>
                        <div>리뷰 카운트</div>
                        <div>
                          <div>즐찾</div>
                          <div>상세보기</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-8 flex items-center text-center bg-slate-700 text-xl font-bold">
                    {element.name_kr}
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-slate-700 rounded col-span-2">
                        {element.year}
                      </div>
                      <div className="h-4 bg-slate-700 rounded col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : tempArr.map((element, idx) => (
              <MovieThumbnailSkeletionComponent key={idx} />
            ))}
      </div>
      <div>새로 업데이트 된 NETFLEX 컨텐츠</div>

      <div className="flex">
        {categoryList.length > 0
          ? categoryList?.map((element) => (
              <div
                className="border border-blue-300 shadow rounded-md p-4 w-64 h-96"
                key={element.idx}
              >
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-72 bg-slate-700 rounded">
                    <img
                      src={element.thumnail}
                      className="w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="h-8 flex items-center text-center bg-slate-700 text-xl font-bold">
                    {element.name_kr}
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-slate-700 rounded col-span-2">
                        {element.year}
                      </div>
                      <div className="h-4 bg-slate-700 rounded col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : tempArr.map((element, idx) => (
              <MovieThumbnailSkeletionComponent key={idx} />
            ))}
      </div>
      <div>높은 평점을 받은 NETFLIX 컨텐츠</div>

      <div className="flex">
        {categoryList.length > 0
          ? categoryList?.map((element) => (
              <div
                className="border border-blue-300 shadow rounded-md p-4 w-64 h-96"
                key={element.idx}
              >
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-72 bg-slate-700 rounded">
                    <img
                      src={element.thumnail}
                      className="w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="h-8 flex items-center text-center bg-slate-700 text-xl font-bold">
                    {element.name_kr}
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-slate-700 rounded col-span-2">
                        {element.year}
                      </div>
                      <div className="h-4 bg-slate-700 rounded col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : tempArr.map((element, idx) => (
              <MovieThumbnailSkeletionComponent key={idx} />
            ))}
      </div>
    </div>
  );
}
