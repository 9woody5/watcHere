import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../Common/CommonAtom";

function UserFavoriteContents() {
  const userInfo = useRecoilValue(userInfoState);

  let contentDisplay;

  if (userInfo.full_poster_path) {
    contentDisplay = (
      <div className="max-w-[60%] max-h-[70%]">
        <img
          src={userInfo.full_poster_path}
          alt="Favorite Content"
          className="max-w-full max-h-full object-contain p-4 border-solid border border-[#40AD80] rounded-xl bg-[#2c2c2c]"
        />
      </div>
    );
  } else {
    contentDisplay = <p className="text-xl">나만의 포스터를 선정하세요! 🥳</p>;
  }

  return (
    <div className="flex justify-center items-center object-cover">
      {contentDisplay}
    </div>
  );
}

export default UserFavoriteContents;
