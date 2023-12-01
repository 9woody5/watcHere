
const defaultImg = 'https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=1480'

export function reformatContentDirector(name, img){
  return {name, img:img??defaultImg}
}

export function reformatContentActors(actors){
  return actors.slice(0,3).map(({name, profile_path})=> {return {name, 'img':profile_path?? defaultImg}})
}


export function reformatContentScoreData(scores){
  const sumScore = Object.entries(scores).reduce((prev, [score, num])=>prev+(score*num), 0);
  const totalScoreNum = Object.entries(scores).reduce((prev, [score, num])=>prev+num, 0);
  
  return {
    meanScore: (sumScore/totalScoreNum).toFixed(2), 
    totalScoreNum,
    'scoreNum': 
      { 
        '1': scores['1']?? 0, 
        '2': scores['2']?? 0, 
        '3': scores['3']?? 0, 
        '4': scores['4']?? 0, 
        '5': scores['5']?? 0, 
      }
  }
}

export function reformatReviewData(reviews){
  return reviews.map(({author, id, detail, rating, reports})=>{
    const {nickname, updated_at, profile_image} = author;
    return {'userImg': profile_image,'userName': nickname,
            'reviewId': id,
            'text': detail,
            'date': (new Date(updated_at)).toLocaleDateString("ko-KR"),
            'score': rating,
            'reports': reports
    }
  })

}

export function reformatMyReviewData(review){
  const {author, id, detail, rating} = review;
  const {nickname, updated_at, profile_image} = author;

  return [{'userImg': profile_image,'userName': nickname,
            'reviewId': id,
            'text': detail,
            'date': (new Date(updated_at)).toLocaleDateString("ko-KR"),
            'score': rating,
            'isMine': true
          }]
}

export function reformatVideos(videos){
  for (let video of videos){
    if (video.type === 'Trailer' && video.site === 'YouTube'){
      return video.key
    }
  }
  return null;
}