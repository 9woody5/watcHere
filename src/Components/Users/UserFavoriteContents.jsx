import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { userFavoriteContentState } from "../../Common/CommonAtom";

function UserFavoriteContents() {
  const [favoriteContent] = useRecoilState(userFavoriteContentState);
  const [firstMatchingContent, setFirstMatchingContent] = useState(null);

  // 최신 컨텐츠 가져오기
  const { data: latestContents } = useQuery({
    queryKey: ["latestContents"],
    queryFn: async () => {
      const response = await fetch(
        `https://kdt-sw-6-team05.elicecoding.com/api/v1/contents?page=1&sort=RELEASE_DATE_DESC&contentType=MOVIE&anime=true`
      );
      return response.json();
    },
  });

  // 검색 결과 가져오기
  const { data: searchResults } = useQuery({
    queryKey: ["searchResults", favoriteContent.title],
    queryFn: async () => {
      const response = await fetch(
        `https://kdt-sw-6-team05.elicecoding.com/api/v1/search/movie?query=${encodeURIComponent(
          favoriteContent.title
        )}&page=1`
      );
      return response.json();
    },
    enabled: !!favoriteContent.title,
  });

  // 첫 번째 일치하는 결과 찾기
  useEffect(() => {
    if (favoriteContent.title) {
      // 검색 결과와 최신 컨텐츠 합치기
      const combinedResults = [
        ...(searchResults?.results || []),
        ...(latestContents?.results || []),
      ];

      // 조건을 만족하는 첫 번째 요소 찾기
      const firstMatch = combinedResults.find((content) =>
        content.title
          .toLowerCase()
          .includes(favoriteContent.title.toLowerCase())
      );

      setFirstMatchingContent(firstMatch);
    }
  }, [latestContents, searchResults, favoriteContent.title]);

  let contentDisplay;

  if (favoriteContent.title) {
    if (firstMatchingContent) {
      // 일치하는 컨텐츠가 있는 경우
      contentDisplay = (
        <div className="max-w-[40%] max-h-[70%]">
          <img
            src={firstMatchingContent.poster_path}
            alt={firstMatchingContent.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    } else {
      // 일치하는 컨텐츠가 없는 경우
      contentDisplay = <p className="text-xl">일치하는 컨텐츠가 없습니다.</p>;
    }
  } else {
    // 입력값이 없는 경우
    contentDisplay = <p className="text-xl">나만의 포스터를 선정하세요! 🥳</p>;
  }

  return (
    <div className="flex justify-center items-center object-cover">
      {contentDisplay}
    </div>
  );
}

export default UserFavoriteContents;
