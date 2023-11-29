const SkeletonLoader = () => (
  <div role="status" className="animate-pulse flex justify-between mt-5 py-20 w-full">
    <div className="flex gap-5">
      <div className="flex w-24 h-36 bg-zinc-500 rounded-lg dark:bg-gray-700"></div>
      <div className="w-1/3">
        <div className="h-2.5 bg-zinc-500 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-24 mb-2.5"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-28 mb-2.5"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-32"></div>
      </div>
    </div>
    <div className="flex gap-5 sm:hidden">
      <div className="flex w-24 h-36 bg-zinc-500 rounded-lg dark:bg-gray-700"></div>
      <div className="w-1/3">
        <div className="h-2.5 bg-zinc-500 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-24 mb-2.5"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-28 mb-2.5"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-30"></div>
      </div>
    </div>
    <div className="flex gap-5 sm:hidden md:hidden">
      <div className="flex w-24 h-36 bg-zinc-500 rounded-lg dark:bg-gray-700"></div>
      <div className="w-1/3">
        <div className="h-2.5 bg-zinc-500 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-24 mb-2.5"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-28 mb-2.5"></div>
        <div className="h-2 bg-zinc-500 rounded-full dark:bg-gray-700 w-30"></div>
      </div>
    </div>

    <span className="sr-only">로딩 중입니다.</span>
  </div>
);

export default SkeletonLoader;
