import { faker } from '@faker-js/faker';


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
    'img': faker.image.avatar(),

  }
}

export function createContentActors(){
  return [
    {'name': '정배우', 'img':faker.image.avatar()},
    {'name': '도배우', 'img':faker.image.avatar()},
    {'name': '남배우', 'img':faker.image.avatar()},
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
    return {'userImg': faker.image.avatar(), 'userName': faker.person.fullName(), 
    'text': faker.lorem.text({ length: { min: 20, max: 60 }, strategy: 'fail' }),
    'date': faker.date.anytime(),
    'score': 3.0
  }
  })
}