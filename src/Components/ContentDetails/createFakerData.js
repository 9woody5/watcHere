import { faker, vi } from '@faker-js/faker';

const defaultImg = 'https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=1480'

export function createContentBasicInfo(){
  return {
    id: faker.string.uuid(),
    img: faker.image.url(),
    title: faker.lorem.word({ length: { min: 1, max: 10 },  strategy: 'fail'  }),
    story: faker.lorem.text({ length: { min: 20, max: 60 }, strategy: 'fail' }),
    score: '3.8',
    date: '2002',
    genres: ['Adventure', 'fantasy'],
    nation: 'japan',
    learningTime: '2 hours+'
  }
}


export function createContentDirector(){
  return {
    'name': '이상순', 
    'img': 'https://avatars.githubusercontent.com/u/58373314',

  }
}

export function reformatContentDirector(name, img){
  return {name, img:img??defaultImg}
}

export function createContentActors(){
  return [
    {'name': '정배우', 'img':'https://avatars.githubusercontent.com/u/58373314'},
    {'name': '도배우', 'img':'https://avatars.githubusercontent.com/u/58373314'},
    {'name': '남배우', 'img':'https://avatars.githubusercontent.com/u/58373314'},
  ]
}

export function reformatContentActors(actors){
  return actors.slice(0,3).map(({name, profile_path})=> {return {name, 'img':profile_path?? defaultImg}})
}

export function createAvailablePlatforms(){
  return [
    {'name': 'netflix', 'link': 'www.naver.com'},   
    {'name': 'wave', 'link': 'www.naver.com'}
  ]
}

export function createReviewData(){
  return new Array(10).fill({}).map((x)=>{
    return {'userImg': 'https://avatars.githubusercontent.com/u/58373314', 'userName': faker.person.fullName(), 
    'text': faker.lorem.text({ length: { min: 20, max: 60 }, strategy: 'fail' }),
    'date': faker.date.anytime(),
    'score': 3.0
  }
  })
}

export function createContentScoreData(){
  return {
    'meanScore': faker.number.float({ min: 1, max: 5, precision: 0.01 }),
    'totalScoreNum': faker.number.int({min:10, max:10000}),
    'scoreNum': 
      {
        '1': faker.number.int({min:0, max:1000}), 
        '2': faker.number.int({min:0, max:1000}), 
        '3': faker.number.int({min:0, max:1000}), 
        '4': faker.number.int({min:0, max:1000}), 
        '5': faker.number.int({min:0, max:1000}), 
      }
  }
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
  return reviews.map(({user_id, id, detail, rating, updated_at})=>{
    return {'userImg': 'https://avatars.githubusercontent.com/u/58373314','userName': user_id,
            'reviewId': id,
            'text': detail,
            'date': (new Date(updated_at)).toLocaleDateString("ko-KR"),
            'score': rating 
    }
  })

}

export function reformatVideos(videos){
  for (let video of videos){
    if (video.type === 'Trailer' && video.site === 'YouTube'){
      return video.key
    }
  }
  return null;
}