import React, {useState, useEffect} from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function StarRating({handleUserScore, initialScore=0}){
  const [score, setScore] = useState(initialScore);
  const [hoverScore, setHoverScore] = useState(0);
  const [starIndex, setStarIndex] = useState(0);
  
  const handleHoverStar = (index) => {
    setHoverScore(index);
  }
  const handleMouseLeaveStar = () => {
    setHoverScore(0);
  }
  const handleClickStar = (index) => {
    setScore((cur) => cur===index?0:index);
  }

  useEffect(()=>{
    let curStarIndex = (hoverScore!=0? hoverScore: score);
    setStarIndex(curStarIndex);
  }, [score, hoverScore])

  useEffect(()=>{
    handleUserScore(score);
  }, [score])

  return (
    <div>{[1,2,3,4,5].map((index)=>
      starIndex>=index? 
      (<AiFillStar  key={`my-review-score-star-${index}`} className= 'inline-block text-3xl text-yellow-500'
        onMouseEnter={()=>handleHoverStar(index)}
        onMouseLeave={()=>handleMouseLeaveStar()}
        onClick={()=>handleClickStar(index)} />) :
      ((<AiOutlineStar key={`my-review-score-star-${index}`} className= 'inline-block text-3xl text-yellow-500' 
        onMouseEnter={()=>handleHoverStar(index)}
        onMouseLeave={()=>handleMouseLeaveStar()}
        onClick={()=>handleClickStar(index)}
      />))
    )}</div>
  )

}


export default StarRating;
