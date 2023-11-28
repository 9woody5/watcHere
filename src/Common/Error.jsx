import { useNavigate } from "react-router-dom";
import errorImg from "../assets/img/404.png";

export default function Example() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <main className="flex w-full h-screen justify-center items-center px-6 py-20 sm:pb-32 lg:px-8 font-pretendard">
        <div className="text-center">
          {/* <p className="text-[50px] font-semibold text-emerald-500">404</p> */}
          <div className="img_box w-[400px] h-[280px]">
            <img src={errorImg} alt="errorImg" className="w-full h-full object-cover" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">페이지를 찾을 수 없어요 😭</h1>
          <p className="mt-2 text-base leading-7 text-emerald-200">요청하신 페이지를 다시 한 번 확인해 주세요.</p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <button
              onClick={goBack}
              className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              뒤로가기
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
