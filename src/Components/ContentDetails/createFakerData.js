// import { faker } from '@faker-js/faker';

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



export function createContentActors(){
  return [
    {'name': '정배우', 'img':'https://avatars.githubusercontent.com/u/58373314'},
    {'name': '도배우', 'img':'https://avatars.githubusercontent.com/u/58373314'},
    {'name': '남배우', 'img':'https://avatars.githubusercontent.com/u/58373314'},
  ]
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
    'score': 3.0,
    'isMine': false
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
