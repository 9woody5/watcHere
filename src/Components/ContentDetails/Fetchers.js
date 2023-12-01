import axios from 'axios';

const hostUrl = 'https://kdt-sw-6-team05.elicecoding.com'; 

/* moview-details-controller & tv-details-controller */
//영화 상세조회 & tv 상세조회
export const callGetContentAPI = (contentType, id) => {
  return axios.get(`${hostUrl}/api/v1/${contentType}/${id}`);
}

/* like-controller */
// 좋아요 조회
export const callGetLikesAPI = (contentType, id, token) => {
  contentType = contentType? contentType.toUpperCase(): contentType;
  return axios.get(`${hostUrl}/api/v1/likes/my-content?content_type=${contentType}&content_id=${id}`,
    {headers: {
      Authorization: `Bearer ${token}`}
    }
  )
}

// 좋아요 기능
export const callPostLikesAPI = (contentType, id, token) => {
  contentType = contentType? contentType.toUpperCase(): contentType;
  id = parseInt(id);
  return axios.post(`${hostUrl}/api/v1/likes?content_type=${contentType}&content_id=${id}`,
    {content_type:contentType, content_id:id},
    {headers: {
      Authorization: `Bearer ${token}`}
    }
  );
}

// 좋아요 취소 기능
export const callDeleteLikesAPI = (contentType, id, token) => {
  contentType = contentType? contentType.toUpperCase(): contentType;
  return axios.delete(`${hostUrl}/api/v1/likes?content_type=${contentType}&content_id=${id}`,
    {headers: {
      Authorization: `Bearer ${token}`}
    }
  )
}


/* review-controller */

// 컨텐츠 리뷰목록 조회
export const callGetReviewsContentAPI = (contentType, id, page, sortBy, size=10) => {
  contentType = contentType? contentType.toUpperCase(): contentType;
  return axios.get(`${hostUrl}/api/v1/reviews/content/${id}?contentType=${contentType}&page=${page}&size=${size}&sortBy=${sortBy}`);
}

// 리뷰 작성 : jwt 필요
export const callPostReviewsAPI = (contentType, contentId, detail, rating, token) => {
  contentType = contentType? contentType.toUpperCase(): contentType;
  return axios.post(`${hostUrl}/api/v1/reviews`, 
    {content_id:parseInt(contentId), detail, rating:parseInt(rating), content_type:contentType},
    {headers: {
      Authorization: `Bearer ${token}`}
    }
  );
}

// 리뷰 신고
export const callReviewReportAPI = (reviewId, token) => {
  return axios.put(`${hostUrl}/api/v1/reviews/${reviewId}/report`,
    {id:reviewId},
    {headers: {
      Authorization: `Bearer ${token}`}}
  );
}


// 별점 정보 조회
export const callGetReviewsRatingsAPI = (contentId) => {
  return axios.get(`${hostUrl}/api/v1/reviews/ratings/${contentId}`);
}

// 컨텐츠별 마이 리뷰 조회
export const callGetMyReviewAPI = (contentType, contentId, token) => {
  contentType = contentType? contentType.toUpperCase(): contentType;
  return axios.get(`${hostUrl}/api/v1/reviews/my-review/${contentId}?contentType=${contentType}`,
  {headers: {
    Authorization: `Bearer ${token}`}
  });
}

// 리뷰 수정
export const callPutReviewsAPI = (contentType, detail, rating, contentId, reviewId, token) => {
  contentType = contentType? contentType.toUpperCase(): contentType;
  return axios.put(`${hostUrl}/api/v1/reviews/${reviewId}`,
    {content_id:parseInt(contentId), detail, rating:parseInt(rating), content_type:contentType},
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