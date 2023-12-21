import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ContentInfo from "../Components/ContentDetails/ContentInfo";
import ReviewInfo from "../Components/ContentDetails/ReviewInfo";
import ContentScoreInfo from "../Components/ContentDetails/ContentScoreInfo";

const getContentType = () => {
  const pathname = useLocation().pathname;
  if (pathname.length > 3 && pathname.slice(1, 3) === "tv") {
    return "tv";
  } else if (pathname.length > 6 && pathname.slice(1, 6) === "movie") {
    return "movie";
  }
};

const ContentDetail = () => {
  const { id } = useParams();
  const [contentType, setContentType] = useState(getContentType());
  const [contentId, setContentId] = useState(id);
  const token = localStorage.getItem("token");

  return (
    <div className="w-full m-auto mt-10 px-36 font-pretendard" style={{ backgroundColor: "#2c2c2c" }}>
      <ContentInfo id={contentId} token={token} contentType={contentType} />
      <ContentScoreInfo id={contentId} token={token} contentType={contentType} />
      <ReviewInfo id={contentId} token={token} contentType={contentType} />
    </div>
  );
};

export default ContentDetail;
