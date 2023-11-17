import React, {useState, useEffect} from 'react';

import * as contentFakeData from './createFakerData';
import ContentBasicInfo from './ContentBasicInfo/ContentBasicInfo.jsx';
import ContentComplexInfo from './ContentComplexInfo';

function ContentInfo({id}) {
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

  let basicInfo = {};
  // take related data
  useEffect(()=>{
    setTimeout(()=>{
      basicInfo = contentFakeData.createContentBasicInfo();
      console.log("basicInfo", basicInfo);
      setImg('https://picsum.photos/seed/EgMqkPTE/640/480');
      setTitle(basicInfo.title);
      setStory(basicInfo.story);
      setScore(basicInfo.score);
      setDate(basicInfo.date);
      setGenres(basicInfo.genres);
      setNation(basicInfo.nation);
      setLearningTime(basicInfo.learningTime);
  
    } , 500);

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