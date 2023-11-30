import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const UsersReview = ({ review }) => {
  const [posterPath, setPosterPath] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!review || !token) return;

    const baseUrl = "https://kdt-sw-6-team05.elicecoding.com/api/v1";
    const url = `${baseUrl}/${review.content_type.toLocaleLowerCase()}/${
      review.content_id
    }`;
    const headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    };

    fetch(url, { method: "GET", headers: headers })
      .then((response) => response.json())
      .then((data) => {
        setPosterPath(data.full_poster_path);
      })
      .catch((error) => console.error("Error fetching content data:", error));
  }, [review, token]);

  // 포스터 클릭 시 이동할 경로 설정
  const handlePosterClick = () => {
    const path = `/${review.content_type.toLocaleLowerCase()}/${
      review.content_id
    }`;
    navigate(path);
  };

  const convertString2Number = (scoreString) => {
    try {
      return parseInt(scoreString);
    } catch {
      return 0;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR");
  };

  return (
    <section>
      <div className=" flex text-white mb-3 ">
        <div className=" mr-4">
          {posterPath && (
            <img
              src={posterPath}
              alt="Content Poster"
              className="w-[120px] h-[150px] mr-4 object-contain cursor-pointer"
              onClick={handlePosterClick}
            />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center ">
            <img
              className="w-8 mx-2 rounded-full"
              src={review.author.profile_image}
              alt=""
            />
            <div className="text-lg">{review.author.nickname}</div>
          </div>
          <div className="my-3 text-base overflow-hidden truncate w-[250px]">
            {review.detail}
          </div>
          <div className="text-xs">{formatDate(review.author.created_at)}</div>
        </div>
        <div className="flex flex-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <AiFillStar
              key={`user-review-score-star-${index}`}
              className={`inline-block text-lg ${
                convertString2Number(review.rating) >= index
                  ? "text-yellow-200"
                  : "text-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsersReview;
