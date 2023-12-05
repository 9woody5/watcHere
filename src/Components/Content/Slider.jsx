import { useEffect, useState } from "react";

const Slider = ({ content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, setContentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setContentList(content);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("에러 발생", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [content]);

  return (
    <div
      className="slider w-full h-full object-cover relative font-pretendard"
      onMouseOver={() => !isLoading && setIsHovered(true)}
      onMouseLeave={() => !isLoading && setIsHovered(false)}
    >
      <img src={content.poster_path} alt={content.title} loading="lazy" />

      {isHovered && (
        <div
          className={`additional_info w-full h-full absolute text-sm top-0 left-0 right-0 bottom-0 bg-zinc-800 text-white flex flex-col items-start justify-start pt-8 bg-opacity-80 px-6 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 rounded-lg border-solid border-emerald-500 border-2`}
        >
          <h3 className=" text-emerald-500 text-[18px] font-pretendardBold text-left mb-2">{content.title}</h3>
          {content.genreNames && <span className="text-left">{content.genreNames.join(", ")}</span>}
          {content.director_name && <span>감독: {content.director_name}</span>}
          {content.runtime && <span>{content.runtime}분</span>}
          {content.first_air_date && <span>방영일: {content.first_air_date}</span>}
          {content.release_date && <span>개봉일: {content.release_date}</span>}
        </div>
      )}
    </div>
  );
};

export default Slider;
