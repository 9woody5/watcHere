import React from "react";
import { useRecoilValue } from "recoil";
import { userFavoriteContentState } from "../../Common/CommonAtom";

// 기본 이미지 호스팅 URL
const baseUrl = "https://image.tmdb.org/t/p/w500";

function UserFavoriteContents() {
  const favoriteContent = useRecoilValue(userFavoriteContentState);
  console.log(favoriteContent);

  let contentDisplay;

  if (favoriteContent.title) {
    const imageUrl = baseUrl + favoriteContent.poster_path;

    // 이미 선택된 컨텐츠가 있는 경우, 직접 표시
    contentDisplay = (
      <div className="max-w-[60%] max-h-[70%]">
        <img
          src={imageUrl}
          alt={favoriteContent.title}
          className="max-w-full max-h-full object-contain p-4 border-solid border border-[#40AD80] rounded-xl bg-[#2c2c2c]"
        />
      </div>
    );
  } else {
    // 선택된 컨텐츠가 없는 경우
    contentDisplay = <p className="text-xl">나만의 포스터를 선정하세요! 🥳</p>;
  }

  return (
    <div className="flex justify-center items-center object-cover">
      {contentDisplay}
    </div>
  );
}

export default UserFavoriteContents;
