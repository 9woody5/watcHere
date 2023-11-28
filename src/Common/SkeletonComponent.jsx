/**
 * 썸네일용 스켈레톤 컴포넌트
 *
 * 최소 / 최대 고정작업 진행 필요
 *
 * @returns
 */
export function SkeletionComponent() {
  return (
    <div className="rounded-md p-4 w-64 h-80 ">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-2 py-1">
          <div className="h-72 bg-slate-700 rounded"></div>
          <div className="h-8 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-10 bg-slate-700 rounded col-span-2"></div>
              <div className="h-10 bg-slate-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
