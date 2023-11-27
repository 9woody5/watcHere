import React, {useState, useEffect} from 'react';
import * as contentFakeData from './createFakerData';
import ContentBasicInfo from './ContentBasicInfo.jsx';
import ContentComplexInfo from './ContentComplexInfo';
import * as Fetchers from './Fetchers'; 

function ContentInfo({id, contentType='movie'}) {
  // img, title, story, score, date, genres, nation, learningTime : basic info
  const [img, setImg] = useState(''); // default 이미지도 찾아서 넣기
  const [title, setTitle] = useState('Title');
  const [story, setStory] = useState('...');
  const [score, setScore] = useState("0");
  const [date, setDate] = useState('');
  const [genres, setGenres] = useState([]);
  const [nation, setNation] = useState('');
  const [learningTime, setLearningTime] = useState('');
  
  // actors, director, availablePlatforms : complex info
  const [actors, setActors] = useState([]);
  const [director, setDirector] = useState({});
  const [availablePlatforms, setAvailablePlatforms] = useState([]);

  /* take related data */
  useEffect(()=>{
    // 기본 정보 
    Fetchers.callGetContentAPI(contentType, id)
      .then(({data})=>{
        console.log("movie api response", data);
        setImg(data.full_poster_path);
        setTitle(data.title);
        setStory(data.overview);
        setDate(data.release_date);
        setGenres(data.genres.map(x=>x.name));
        setNation('korea'); // 설정필요
        setLearningTime(data.runtime)
      });
    
      Fetchers.callGetReviewsRatingsAPI(id)
        .then(({data})=>{
        const sumScore = Object.entries(data.ratings).reduce((prev, [score, num])=>prev+(score*num), 0);
        const totalRatingNum = Object.entries(data.ratings).reduce((prev, [score, num])=>prev+num, 0);
        setScore((sumScore/totalRatingNum).toFixed(2));
      })
      

    let actorsInfo=[], directorInfo={}, availablePlatformsInfo=[];
    setTimeout(()=>{
      actorsInfo = contentFakeData.createContentActors();
      directorInfo = contentFakeData.createContentDirector();
      availablePlatformsInfo = contentFakeData.createAvailablePlatforms();

      setActors(actorsInfo);
      setDirector(directorInfo);
      setAvailablePlatforms(availablePlatformsInfo);
    }, 1000);

  }, []);

  return (
    <div>
      <ContentBasicInfo img={img} title={title} story={story} score={score} date={date} genres={genres} nation={nation} learningTime={learningTime} />
      <ContentComplexInfo actors={actors} director={director} availablePlatforms={availablePlatforms} ></ContentComplexInfo>
    </div>
  )
}

export default ContentInfo;