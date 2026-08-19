interface RoleEmptyStateProps {
  canCreate: boolean;
  onAdd: () => void;
}

function RoleEmptyState({ canCreate, onAdd }: RoleEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <span className="text-lg font-semibold text-gray-500">R</span>
      </div>

      <h2 className="text-sm font-semibold text-black">Belum ada role</h2>

      <p className="mt-1 max-w-sm text-sm text-gray-500">
        Belum ada role yang tersedia di sistem.
        {canCreate &&
          " Tambahkan role pertama untuk mulai mengatur akses pengguna."}
      </p>

      {canCreate && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Add Role
        </button>
      )}
    </div>
  );
}

export default RoleEmptyState;
