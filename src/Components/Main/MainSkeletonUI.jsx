const MainSkeletonUI = () => {
  return (
    <div className="flex justify-center gap-8 px-18 w-full mt-24">
      <div role="status" className="animate-pulse ">
        <div
          className="w-[18vw] bg-zinc-500 rounded-lg sm:w-96 dark:bg-gray-700"
          style={{ height: "calc(100vh - 50vh)" }}
        ></div>
      </div>
      <div role="status" className="animate-pulse">
        <div
          className="w-[18vw] bg-zinc-500 rounded-lg sm:w-96 dark:bg-gray-700"
          style={{ height: "calc(100vh - 50vh)" }}
        ></div>
      </div>
      <div role="status" className="animate-pulse">
        <div
          className="w-[18vw] bg-zinc-500 rounded-lg sm:w-96 dark:bg-gray-700"
          style={{ height: "calc(100vh - 50vh)" }}
        ></div>
      </div>
      <div role="status" className="animate-pulse">
        <div
          className="w-[18vw] bg-zinc-500 rounded-lg sm:w-96 dark:bg-gray-700"
          style={{ height: "calc(100vh - 50vh)" }}
        ></div>
      </div>
    </div>
  );
};

export default MainSkeletonUI;
