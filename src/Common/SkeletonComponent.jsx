export function MovieThumbnailSkeletionComponent() {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 w-64 h-96 ">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-2 py-1">
          <div className="h-72 bg-slate-700 rounded"></div>
          <div className="h-8 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-slate-700 rounded col-span-2"></div>
              <div className="h-4 bg-slate-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
