import { useNavigate } from "react-router-dom";

export default function Example() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-20 sm:pb-32 lg:px-8 font-pretendard">
        <div className="text-center">
          <p className="text-base font-semibold text-emerald-500">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">페이지를 찾을 수 없어요 😭</h1>
          <p className="mt-6 text-base leading-7 text-emerald-200">요청하신 페이지를 다시 한 번 확인해 주세요.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
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
