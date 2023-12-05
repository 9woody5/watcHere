import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../Common/CommonAtom";
import FavoriteContentSkeleton from "./FavoriteContentSkeleton"; // 스켈레톤 UI 컴포넌트 임포트

function UserFavoriteContents() {
  const userInfo = useRecoilValue(userInfoState);
  const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태

  useEffect(() => {
    if (userInfo.full_poster_path) {
      const image = new Image();
      image.src = userInfo.full_poster_path;
      image.onload = () => setIsLoading(false); // 이미지 로딩 완료 시
    } else {
      setIsLoading(false); // 이미지 경로가 없을 경우
    }
  }, [userInfo.full_poster_path]);

  let contentDisplay;

  return (
    <div className="flex justify-center items-center object-cover">
      {isLoading ? (
        <FavoriteContentSkeleton />
      ) : userInfo.full_poster_path ? (
        <div className="max-w-[50%] max-h-[70%]">
          <img
            src={userInfo.full_poster_path}
            alt="Favorite Content"
            className="max-w-full max-h-full object-contain p-4 border-solid border border-[#40AD80] rounded-xl bg-[#2c2c2c]"
          />
        </div>
      ) : (
        <p className="text-xl">나만의 포스터를 선정하세요! 🥳</p>
      )}
    </div>
  );
}

export default UserFavoriteContents;
