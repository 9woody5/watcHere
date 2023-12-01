import React, { useState, useEffect } from "react";
import { Select } from "flowbite-react";
import { useSetRecoilState } from "recoil";
import { userFavoriteContentState } from "../../Common/CommonAtom";

const ContentsSearchSelect = ({ onContentSelect }) => {
  const [inputText, setInputText] = useState("");
  const [contents, setContents] = useState([]); // 영화와 TV 프로그램을 포함하는 배열
  const [selectedContent, setSelectedContent] = useState(""); // 선택된 컨텐츠
  const setFavoriteContent = useSetRecoilState(userFavoriteContentState);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const selected = contents.find(
      (content) => content.id === parseInt(selectedId)
    );

    if (selected) {
      setSelectedContent(selected.id);
      setFavoriteContent(selected); // 전체 객체를 저장
      onContentSelect(selected.id, selected.title, selected.full_poster_path); // poster 정보 포함하여 호출
    }
  };

  useEffect(() => {
    const fetchContents = async () => {
      if (inputText.length > 0) {
        // TV 프로그램 검색
        const tvResponse = await fetch(
          `https://kdt-sw-6-team05.elicecoding.com/api/v1/search/tv?query=${encodeURIComponent(
            inputText
          )}&page=1`
        );
        const tvData = await tvResponse.json();

        // 영화 검색
        const movieResponse = await fetch(
          `https://kdt-sw-6-team05.elicecoding.com/api/v1/search/movie?query=${encodeURIComponent(
            inputText
          )}&page=1`
        );
        const movieData = await movieResponse.json();

        // TV 프로그램과 영화 목록 합치기
        const combinedContents = [...tvData.results, ...movieData.results];

        // 중복 제거 (예: id 기준)
        const uniqueContents = Array.from(
          new Map(combinedContents.map((item) => [item["id"], item])).values()
        );

        setContents(uniqueContents);
      }
    };

    fetchContents();
  }, [inputText]);

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="input-style01 w-[300px] h-[54px] text-sm text-gray-400 mx-5 p-0 px-5 bg-[#2e2e2e] border-none rounded-lg align-middle"
        placeholder="영화나 TV 프로그램 제목 입력 (띄어쓰기 포함)"
      />
      <Select
        onChange={handleSelect}
        value={selectedContent} // 현재 선택된 컨텐츠 ID를 사용
        className="my-2 w-[300px]"
        style={{
          backgroundColor: "#2e2e2e",
          border: "none",
          position: "absolute",
          translate: "(10px, 10px)",
        }}
      >
        <option value="" disabled>
          검색된 목록 중에서 선택해주세요.
        </option>
        {contents
          .filter((content) => content.title) // title이 undefined가 아닌 항목만 필터링
          .map((content) => (
            <option key={content.id} value={content.id}>
              {content.title}
            </option>
          ))}
      </Select>
    </div>
  );
};

export default ContentsSearchSelect;
