import { useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import ContentInfo from "../Components/ContentDetails/ContentInfo";
import ReviewInfo from "../Components/ContentDetails/ReviewInfo";
import ContentScoreInfo from '../Components/ContentDetails/ContentScoreInfo';

const ContentDetail = () => {
  const [contentType, setContentType] = useState(null);
  const [contentId, setContentId] = useState('502356');
  const location = useLocation();

  useEffect(()=>{
    const pathname = location.pathname;
    if (pathname.length>3 && pathname.slice(1,3)==='tv'){
      setContentType('tv');
    } 
    else if (pathname.length>6 && pathname.slice(1,6)==='movie'){
      setContentType('movie');
    }
  }, [])

  return (
    <div className="w-full m-auto mt-10 px-36" style={{ backgroundColor: "#2c2c2c" }}>
      <ContentInfo id={contentId}/>
      <ContentScoreInfo id={contentId}/>
      <ReviewInfo id={contentId}/>
    </div>
  );
};

export default ContentDetail;
