function RoleLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-4 animate-pulse rounded bg-gray-200"
              />
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="grid grid-cols-4 gap-6 px-6 py-5">
              {[1, 2, 3, 4].map((column) => (
                <div
                  key={column}
                  className="h-4 animate-pulse rounded bg-gray-100"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoleLoadingSkeleton;
