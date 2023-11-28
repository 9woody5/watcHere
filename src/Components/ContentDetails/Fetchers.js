import axios from 'axios';

const hostUrl = 'https://kdt-sw-6-team05.elicecoding.com'; 

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
      Authorization: `Bearer ${token}`}
    }
  );
}

// 리뷰 신고
export const callReviewReportAPI = (reviewId, token) => {
  return axios.put(`${hostUrl}/api/v1/reviews/${reviewId}/report`,
    {headers: {
      Authorization: `Bearer ${token}`}}
  );
}


// 별점 정보 조회
export const callGetReviewsRatingsAPI = (contentId) => {
  return axios.get(`${hostUrl}/api/v1/reviews/ratings/${contentId}`);
}

// 컨텐츠별 마이 리뷰 조회
export const callGetMyReviewAPI = (contentId, token) => {
  return axios.get(`${hostUrl}/api/v1/reviews/my-review/${contentId}?`,
  {headers: {
    Authorization: `Bearer ${token}`}
  });
}

// 리뷰 수정
export const callPutReviewsAPI = (detail, rating, content_id, reviewId, token) => {
  return axios.put(`${hostUrl}/api/v1/reviews/${reviewId}`,
    {content_id:parseInt(content_id), detail, rating:parseInt(rating)},
    {headers: {
      Authorization: `Bearer ${token}`}}
  );
}

// 리뷰 삭제
export const callDeleteReviewsAPI = (reviewId, token) => {
  return axios.delete(`${hostUrl}/api/v1/reviews/${reviewId}`,
    {headers: {
      Authorization: `Bearer ${token}`}}
  );
}