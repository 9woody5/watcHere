import mockData from "../../resources/mockData.json";
import { Link } from "react-router-dom";
import "./SearchResult.css";

const ResultByCategories = () => {
  const contents = mockData;
  const category = ["영화", "드라마", "예능", "애니메이션"];
  const dataCate = ["movie", "drama", "tvshow", "anime"];

  const categoriesWithcontent = category
    .map((categoryTitle, index) => ({
      title: categoryTitle,
      // 카데고리 별 필터링 된 콘텐츠들
      data: contents.filter((content) => content.category === dataCate[index]),
    }))
    .filter((category) => category.data.length !== 0);

  return (
    <div>
      {categoriesWithcontent.map(({ title, data }, index) => {
        // 마지막 섹션일 땐 hr태그 제거
        const isLastSection = index === categoriesWithcontent.length - 1;

        return (
          <section key={index} className="result_wrap mt-14 font-pretendard">
            <div className="headline flex justify-between">
              <div className="title flex items-center">
                <h3 className="text-xl font-bold text-left text-white ml-6 mr-1">{title}</h3>
                <span className="text-white">({data.length})</span>
              </div>
              <button className="text-white px-3 py-1 bg-zinc-700 rounded-lg hover:bg-zinc-900 transition duration-150 ease-in-out">
                전체 보기
              </button>
            </div>
            <ul className="mt-4 flex flex-wrap">
              {data.map((content, contentIndex) => (
                <li
                  key={contentIndex}
                  className=" flex items-center mb-2 w-1/3 hover:bg-zinc-900 p-3 rounded-xl transition duration-150 ease-in-out"
                >
                  <Link to={`/contentDetail/${content.id}`} className="w-full content_item">
                    <div className="flex items-center h-full w-full">
                      <div className="img_box w-24 h-36 rounded-xl overflow-hidden">
                        <img
                          className="w-full h-full object-cover bg-center flex-1"
                          src={content.Images[1]}
                          alt={content.Title}
                        />
                      </div>
                      <p className="ml-6 flex flex-col gap-1">
                        <span className="text-white block">{content.Title}</span>
                        <span className="text-white block">{content.Released}</span>
                        <span className="text-white block">{content.Runtime}</span>
                        <span className="text-white block">{content.Director}</span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {!isLastSection && <hr className="opacity-30 mt-4" />}
          </section>
        );
      })}
    </div>
  );
};

export default ResultByCategories;
