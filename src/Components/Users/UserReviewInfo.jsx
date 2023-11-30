import React, { useState, useEffect } from "react";
import UsersReview from "./UsersReview";
import { FaPlus } from "react-icons/fa6";

const UsersReviewInfo = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [reviewSort, setReviewSort] = useState("createdAt"); // 정렬 상태
  const [selectedSort, setSelectedSort] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOldestFirst, setIsOldestFirst] = useState(false);
  const [sortButtonText, setSortButtonText] = useState("최신 순");
  const [isRatingDesc, setIsRatingDesc] = useState(true);
  const [ratingSortButtonText, setRatingSortButtonText] =
    useState("별점 높은 순");

  const handleSortClick = (sortType) => {
    if (selectedSort === sortType) {
      setSelectedSort(null);
      setIsOldestFirst(false);
      setSortButtonText("최신 순");
    } else {
      setSelectedSort(sortType);
      setSortButtonText(sortType === "createdAt" ? "오래된 순" : "최신 순");
      setIsOldestFirst(sortType === "createdAt");
      setReviewSort(sortType);
    }
  };

  const handleRatingSortClick = () => {
    const newIsRatingDesc = !isRatingDesc;
    setIsRatingDesc(newIsRatingDesc);
    setReviewSort(newIsRatingDesc ? "ratingDesc" : "ratingAsc");
    setRatingSortButtonText(newIsRatingDesc ? "별점 높은 순" : "별점 낮은 순");
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
    setLoading(true);
    fetch(
      "https://kdt-sw-6-team05.elicecoding.com/api/v1/reviews/my-reviews?page=0&size=10",
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then(({ content }) => {
        let sortedReviews = content;

        if (isOldestFirst) {
          sortedReviews = sortedReviews.reverse();
        }

        sortedReviews = sortReviews(sortedReviews, reviewSort);
        setUserReviews(sortedReviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user reviews", error);
        setLoading(false);
      });
  }, [reviewSort, isOldestFirst]);

  // 리뷰를 정렬하는 함수
  const sortReviews = (reviews, sortType) => {
    switch (sortType) {
      case "createdAt":
        return [...reviews].reverse();
      case "ratingDesc":
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case "ratingAsc":
        return [...reviews].sort((a, b) => a.rating - b.rating);
      default:
        return reviews;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" border-solid border-2 border-custom-light-gray rounded-sm  p-4 mb-8 bg-custom-middle-gray w-[60%] h-[350px] overflow-hidden ">
        <section className="sticky top-0 flex items-center  text-white mb-5 bg-custom-middle-gray ">
          <div className="flex  text-xl mr-2">
            작성한 마이리뷰 <FaPlus className="ml-1 text-[#40AD80] text-sm" />
          </div>

          <div className="text-sm bg-new-color p-1 rounded-xl">
            <button
              onClick={() => {
                setIsOldestFirst(!isOldestFirst);
                handleSortClick("createdAt");
              }}
              className={`mr-2 rounded-lg p-1 ${
                selectedSort === "createdAt"
                  ? "your-selected-style"
                  : "hover:bg-[#40AD80]"
              }`}
            >
              {sortButtonText}
            </button>
            <button
              onClick={handleRatingSortClick}
              className="mr-2 hover:bg-[#40AD80] rounded-lg p-1"
            >
              {ratingSortButtonText}
            </button>
          </div>
        </section>

        {loading ? (
          <div>Loading...</div>
        ) : userReviews.length === 0 ? (
          <div className="font-xl font-bold">
            작성하신 리뷰가 없어요🧐 <br />
          </div>
        ) : (
          <div className="overflow-y-auto  h-[250px] ">
            {userReviews.map((review, idx) => (
              <UsersReview key={idx} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersReviewInfo;
