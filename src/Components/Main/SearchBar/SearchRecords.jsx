// 검색 내역 전체 key event 적용되도록
// 삭제 버튼 이벤트 버블링 이슈

const SearchRecords = ({
  autoCompleteValue,
  selectedItemIndex,
  setSelectedIndex,
  recentSearches,
  handleSearchInteraction,
  handleClearAllRecentSearches,
  handleRemoveRecentSearch,
}) => {
  const handleItemClick = (suggestions, index) => {
    handleSearchInteraction(suggestions, index);
  };
  return (
    <div className="bg-white w-full h-auto flex flex-col gap-1 pt-10 pb-5 px-4 rounded-b-3xl mt-[-25px]">
      {recentSearches.length > 0 && (
        <div>
          <div className="flex justify-between items-center">
            <span className="w-20 h-6 flex justify-center items-center rounded-full text-xs font-pretendardBold text-white bg-emerald-700 ">
              최근 검색
            </span>
            <button
              className="text-xs font-pretendardBold w-14 h-5 text-zinc-400 underline"
              onClick={handleClearAllRecentSearches}
            >
              전체 삭제
            </button>
          </div>
          <ul>
            {recentSearches.map((search, index) => (
              <li
                className="px-1 my-2 text-sm flex justify-between"
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(index);
                }}
              >
                <p
                  className="text-black cursor-pointer block"
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleSearchInteraction(search);
                  }}
                >
                  {search}
                </p>
                <button
                  className="border-emerald-500 border-1 border-solid rounded-lg px-2 text-xs"
                  onClick={() => handleRemoveRecentSearch(index)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <span className="w-20 h-6 my-1 flex justify-center items-center rounded-full text-xs font-pretendardBold text-white bg-emerald-700 ">
          연관 콘텐츠
        </span>
        <ul>
          {autoCompleteValue.map((suggestion, index) => (
            <li
              className={`px-1 py-[2px] text-sm flex cursor-pointer rounded-md ${
                index === selectedItemIndex ? "bg-zinc-700" : ""
              }`}
              key={suggestion}
              onClick={() => {
                handleItemClick(suggestion, index);
                setSelectedIndex(index);
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
