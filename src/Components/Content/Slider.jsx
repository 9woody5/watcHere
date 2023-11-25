import { useEffect, useState } from "react";

const Slider = ({ content }) => {
  const [isHovered, setIsHoverd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, setContentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          setContentList(content);
          setIsLoading(false);
        }, 1000);
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
        <img src={content.poster_path} alt={content.title} />
      )}

      {isHovered && (
        <div
          className={`additional_info w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-zinc-800 text-white flex flex-col items-center justify-center pt-8 bg-opacity-60 px-6 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 rounded-lg border-solid`}
        >
          <h3>{content.title}</h3>
          <p>{content.name}</p>
          {/* <p>평점: {content.imdbRating}</p> */}
          {/* <span>개봉일: {content.Released}</span> */}
          {/* <span>{content.Runtime}</span> */}
        </div>
      )}
    </div>
  );
};

export default Slider;
