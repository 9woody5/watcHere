import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { movieListState } from "../../Common/CommonAtom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const BookmarkList = () => {
  const navigate = useNavigate();
  const contentList = useRecoilValue(movieListState);

  const goBack = () => {
    navigate(-1);
  };

  const handleContentClick = (contentId, contentType) => {
    const type = contentType === "Scripted" ? "tv" : "movie";
    navigate(`/${type}/${contentId}`);
  };

  // UI 렌더링 부분
  return (
    <div>
      <section className="p-10">
        <div className="fixed top-20 left-0 50 bg-custom-middle-gray  w-full">
          <header className="relative box-border text-left text-lg font-bold leading-6 w-full p-0 px-4 h-auto border-0 top-0 ">
            <div className="flex items-center">
              <button
                onClick={goBack}
                className="text-[#40AD80] btn btn-ghost btn-circle avatar hover:bg-zinc-700 p-2"
              >
                <FaArrowLeft size={21} />
              </button>
            </div>
            <div className="flex justify-start items-center m-5 h-7 mx-1 my-2.5 opacity-100 transition-all duration-150 ease-in-out">
              <h1 className="text-xl font-bold text-white">북마크 작품들</h1>
            </div>
          </header>
          <ul className="list-none m-0 flex items-end  box-border w-full h-12 px-4 ">
            <li className="inline-flex justify-center items-center text-[#40AD80] text-sm font-medium leading-5 min-w-12 h-11 border-solid border-b-2 border-[#40AD80] cursor-pointer box-border w-[20%]">
              전체
            </li>
          </ul>
        </div>
      </section>

      <section className="box-border pt-20">
        <div className="box-border">
          <div className="box-border mx-5">
            <ul className="box-border leading-normal list-none p-0 mt-[14px] mx-[-5px]  overflow-hidden">
              {contentList.length > 0 ? (
                contentList.map((content, index) => (
                  <li
                    className="inline-block align-top box-border leading-normal list-none px-[5px] m-[0px_0px_24px]  "
                    key={index}
                    onClick={() => handleContentClick(content.id, content.type)}
                  >
                    <div className="box-border inline-block w-[full]  no-underline cursor-pointer">
                      <div className="relative box-border w-[140px] h-[200px]  pb-[145.37%%] list-none leading-normal">
                        <div className="absolute top-0 left-0 box-border overflow-hidden w-[full] h-[200px] border-solid border border-custom-watcha-color rounded-md bg-custom-watcha-bg transition-all duration-300 ease-in-out">
                          <img
                            className="box-border opacity-100 align-top w-[full] h-[full] object-cover border-none min-h-[1px] transition-all duration-420 ease-in-out"
                            src={content.poster_path}
                            alt={content.title || content.name}
                          />
                        </div>
                      </div>
                      <div className="text-left text-white mt-[5px] mr-[10px] w-[140px] truncate">
                        <div className="text-base font-medium	tracking-tight leading-6	whitespace-nowrap	">
                          {content.title || content.name}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-left text-white text-lg text-bold">
                  나만의 북마크를 지정해주세요 😴
                </div>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookmarkList;
