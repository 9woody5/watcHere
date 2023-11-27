import axios from 'axios';

const hostUrl = 'https://kdt-sw-6-team05.elicecoding.com'; 

const tempToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTc0NTA5OTg5MDYyMzM4NTQyMzIiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzAxMDc1OTU2fQ.7jlRmYgkn0M5N82QtwPzbtsJUlVGMHTZbiegcbkmLA4'


/* moview-details-controller & tv-details-controller */
//영화 상세조회 & tv 상세조회
export const callGetContentAPI = (contentType, id) => {
  return axios.get(`${hostUrl}/api/v1/${contentType}/${id}`);
}


/* review-controller */

// 컨텐츠 리뷰목록 조회
export const callGetReviewsContentAPI = (reviewId, page, sortBy, size=10) => {
  return axios.get(`${hostUrl}/api/v1/reviews/content/${reviewId}?page=${page}&size=${size}&sortBy=${sortBy}`);
}

// 리뷰 작성 : jwt 필요
export const callPostReviewsAPI = (content_id, detail, rating, token) => {
  return axios.post(`${hostUrl}/api/v1/reviews`, 
    {content_id:parseInt(content_id), detail, rating:parseInt(rating)},
    {headers: {
      Authorization: `Bearer ${token?? tempToken}`}
    }
  );
}

// 리뷰 신고



// 별점 정보 조회
export const callGetReviewsRatingsAPI = (contentId) => {
  return axios.get(`${hostUrl}/api/v1/reviews/ratings/${contentId}`);
}
