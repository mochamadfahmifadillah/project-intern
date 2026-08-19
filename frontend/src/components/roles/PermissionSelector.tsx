import type { Permission } from "../../types/role";

interface PermissionSelectorProps {
  permissions: Permission[];
  selectedIds: number[];
  loading: boolean;
  disabled: boolean;
  onChange: (permissionId: number) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

function PermissionSelector({
  permissions,
  selectedIds,
  loading,
  disabled,
  onChange,
  onSelectAll,
  onClearAll,
}: PermissionSelectorProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <label className="block text-sm font-medium text-black">
            Permissions
          </label>

          <p className="mt-0.5 text-xs text-gray-500">
            Pilih akses yang dimiliki role ini.
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {selectedIds.length} dipilih
        </span>
      </div>

      {loading ? (
        <div className="space-y-2 rounded-lg border border-gray-200 p-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg p-2">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />

              <div className="h-4 flex-1 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      ) : permissions.length > 0 ? (
        <>
          <div className="mb-2 flex justify-end gap-3 text-xs">
            <button
              type="button"
              onClick={onSelectAll}
              disabled={disabled}
              className="font-medium text-black hover:underline disabled:opacity-40"
            >
              Pilih semua
            </button>

            <button
              type="button"
              onClick={onClearAll}
              disabled={disabled}
              className="font-medium text-gray-500 hover:text-black hover:underline disabled:opacity-40"
            >
              Hapus pilihan
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
            {permissions.map((permission) => {
              const checked = selectedIds.includes(permission.id);

              return (
                <label
                  key={permission.id}
                  className={`flex cursor-pointer items-start gap-3 border-b border-gray-100 px-4 py-3 transition last:border-0 ${
                    checked ? "bg-gray-50" : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange(permission.id)}
                    disabled={disabled}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-black"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black">
                      {permission.name}
                    </p>

                    {permission.description && (
                      <p className="mt-0.5 text-xs leading-5 text-gray-500">
                        {permission.description}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 px-4 py-8 text-center">
          <p className="text-sm font-medium text-gray-600">
            Belum ada permission
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Buat permission terlebih dahulu sebelum mengaturnya ke role.
          </p>
        </div>
      )}
    </div>
  );
}

export default PermissionSelector;
