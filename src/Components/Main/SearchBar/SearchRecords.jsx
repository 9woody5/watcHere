// 검색 내역 전체 key event 적용되도록
// 삭제 버튼 이벤트 버블링 이슈
import { useRef, useEffect } from "react";
import { SlClose } from "react-icons/sl";

const SearchRecords = ({
  autoCompleteValue,
  selectedItemIndex,
  setSelectedItemIndex,
  recentSearches,
  handleSearchInteraction,
  handleClearAllRecentSearches,
  handleRemoveRecentSearch,
  searchValue,
}) => {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    // 선택된 항목이 변경될 때마다 스크롤 위치를 업데이트
    if (
      // 선택된 콘텐츠가 있는지 먼저 확인
      autoCompleteRef.current &&
      selectedItemIndex !== null &&
      autoCompleteRef.current.childNodes[selectedItemIndex]
    ) {
      const selectedItem = autoCompleteRef.current.childNodes[selectedItemIndex];
      selectedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedItemIndex, searchValue]);

  const handleItemClick = (suggestions, index) => {
    handleSearchInteraction(suggestions, index);
  };

  return (
    <div className="bg-white w-full h-auto overflow-hidden flex flex-col gap-1 pt-10 pb-4 px-4 rounded-b-3xl mt-[-25px]">
      {recentSearches.length > 0 && (
        <div>
          <div className="flex justify-between items-center">
            <span className="w-20 h-6 flex justify-center items-center rounded-full text-sm font-pretendardBold text-white bg-emerald-700 ">
              최근 검색
            </span>
            <button
              className="text-sm font-pretendardBold w-14 h-5 text-zinc-400 underline"
              onClick={handleClearAllRecentSearches}
            >
              전체 삭제
            </button>
          </div>
          <ul className="h-auto flex flex-wrap items-center pt-2">
            {recentSearches.map((search, index) => (
              <li
                className="px-2 py-1 my-1 mx-1 text-md flex items-center justify-between bg-slate-200 w-auto rounded-full"
                key={index}
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
              >
                <p
                  className="text-black cursor-pointer block"
                  onClick={() => {
                    handleSearchInteraction(search);
                  }}
                >
                  {search}
                </p>
                <button
                  className="border-emerald-500 border-1 border-solid rounded-lg ml-2 text-sm"
                  onClick={(e) => handleRemoveRecentSearch(index, e)}
                >
                  <SlClose size={18} color="#047857" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <span className="w-20 h-6 my-1 flex justify-center items-center rounded-full text-sm font-pretendardBold text-white bg-emerald-700 ">
          연관 콘텐츠
        </span>
        <ul className="h-auto max-h-[180px] overflow-y-scroll" ref={autoCompleteRef} tabIndex={0}>
          {autoCompleteValue.map((suggestion, index) => (
            <li
              className={`px-1 py-1 my-2 text-md flex cursor-pointer rounded-md ${
                index === selectedItemIndex ? "bg-zinc-700" : ""
              }`}
              key={suggestion}
              onClick={() => {
                handleItemClick(suggestion, index);
                setSelectedItemIndex(index);
              }}
            >
              <span className={`cursor-pointer ${index === selectedItemIndex ? "text-white" : "text-black"}`}>
                {suggestion}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchRecords;
