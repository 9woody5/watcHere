import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import mockData from "../../resources/mockData.json";

const BookmarkList = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="p-4">
      <div className="fixed top-20 left-0 z-50 bg-custom-middle-gray  w-full">
        <header className="relative z-50  box-border text-left text-lg font-bold leading-6 w-full p-0 px-4 h-auto border-0 top-0 ">
          <div className="flex items-center">
            <button
              onClick={goBack}
              className="text-[#40AD80] btn btn-ghost btn-circle avatar hover:bg-zinc-700 p-2"
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="flex justify-start items-center m-5 h-7 mx-1 my-2.5 opacity-100 transition-all duration-150 ease-in-out">
            <h1 className="text-xl font-bold text-white">북마크 작품들</h1>
          </div>
        </header>
        <ul className="list-none m-0 flex items-end  box-border w-full h-12 px-4 ">
          <li className="inline-flex justify-center items-center text-[#40AD80] text-sm font-medium leading-5 min-w-12 h-11 border-solid border-b-2 border-[#40AD80] cursor-pointer box-border w-[20%]">
            전체
          </li>
        </ul>
      </div>

      <section className="pt-40">
        <div className="block">
          <div className="mx-5">
            <ul className="flex flex-wrap justify-center list-none p-0 mt-3.5 mx-[-0.25rem] overflow-hidden">
              {mockData.map((movie, index) => (
                <li
                  className="inline-block leading-normal mb-6 px-3 w-[13%] align-top"
                  key={index}
                >
                  <div
                    className="relative w-full h-0"
                    style={{ paddingBottom: "145.37%" }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-full border-solid border border-[#40AD80] overflow-hidden rounded transition-all duration-300 ease-in-out"
                      style={{
                        backgroundColor: "rgb(248, 248, 248)",
                      }}
                    >
                      <img
                        src={movie.Images[0]}
                        alt={movie.Title}
                        className="w-full h-full opacity-1 transition-opacity duration-400 ease-in-out"
                      />
                    </div>
                  </div>
                  <div
                    className="mt-1.25 mr-2.5 mb-0 ml-0"
                    style={{ width: "calc(100% - 10px)" }}
                  >
                    <div className="text-base text-white font-medium leading-6 whitespace-nowrap overflow-hidden truncate mt-1.25 mr-2.5 mb-0 ml-0">
                      {movie.Title}
                    </div>
                    <div
                      className="text-xs font-normal leading-4.5 whitespace-nowrap overflow-hidden truncate"
                      style={{
                        color: "rgb(255, 161, 54)",
                        height: "18px",
                      }}
                    >
                      평가함
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};

export default BookmarkList;
