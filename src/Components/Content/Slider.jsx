import { useEffect, useState } from "react";

const Slider = ({ content, index }) => {
  const [isHovered, setIsHoverd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, setContentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setContentList(content);
        setIsLoading(false);
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
      onMouseOver={() => !isLoading && setIsHoverd(true)}
      onMouseLeave={() => !isLoading && setIsHoverd(false)}
    >
      {isLoading ? (
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div
            className="flex items-center justify-center w-full bg-zinc-500 rounded sm:w-96 dark:bg-gray-700"
            style={{ height: "calc(100vh - 50vh)" }}
          ></div>
        </div>
      ) : (
        <>
          <span className="text-emerald-500 font-pretendardBold italic text-[50px] absolute left-2 top-4 w-12 py-2 border-b-4 border-emerald-500 border-solid">
            {index}
          </span>
          <img src={content.poster_path} alt={content.title} loading="lazy" />
        </>
      )}

      {isHovered && (
        <div
          className={`additional_info w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-zinc-800 text-white flex flex-col items-center justify-center pt-8 bg-opacity-60 px-6 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 rounded-lg border-solid`}
        >
          {content.popularity && <span className="text-white">{content.popularity}</span>}
          <h3>{content.title}</h3>
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
