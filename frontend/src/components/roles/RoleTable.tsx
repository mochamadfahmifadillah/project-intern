import type { Role } from "../../types/role";

interface RoleTableProps {
  roles: Role[];
  canEdit: boolean;
  canDelete: boolean;
  deleting: number | null;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

function RoleTable({
  roles,
  canEdit,
  canDelete,
  deleting,
  onEdit,
  onDelete,
}: RoleTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Role
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Description
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Permissions
            </th>

            {(canEdit || canDelete) && (
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            )}
          </tr>
        </thead>

        {/* =====================================================
            BODY
        ====================================================== */}

        <tbody className="divide-y divide-gray-100">
          {roles.map((role) => {
            const rolePermissions = Array.isArray(role.permissions)
              ? role.permissions
              : [];

            const isDeleting = deleting === role.id;

            return (
              <tr key={role.id} className="transition hover:bg-gray-50">
                {/* =================================================
                    ROLE
                ================================================== */}

                <td className="px-6 py-5 align-top">
                  <p className="text-sm font-semibold text-black">
                    {role.name}
                  </p>
                </td>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <td className="px-6 py-5 align-top">
                  <p className="max-w-xs text-sm leading-6 text-gray-600">
                    {role.description || "-"}
                  </p>
                </td>

                {/* =================================================
                    PERMISSIONS
                ================================================== */}

                <td className="px-6 py-5 align-top">
                  {rolePermissions.length > 0 ? (
                    <div className="flex max-w-md flex-wrap gap-1.5">
                      {rolePermissions.map((permission) => (
                        <span
                          key={permission.id}
                          className="
                            rounded-full
                            bg-gray-100
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            text-gray-700
                          "
                        >
                          {permission.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No permission</span>
                  )}
                </td>

                {/* =================================================
                    ACTION
                ================================================== */}

                {(canEdit || canDelete) && (
                  <td className="px-6 py-5 text-right align-top">
                    <div className="inline-flex items-center gap-3">
                      {/* Edit */}

                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(role)}
                          disabled={isDeleting}
                          className="
                            text-sm
                            font-medium
                            text-black
                            transition
                            hover:text-gray-600
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          Edit
                        </button>
                      )}

                      {/* Delete */}

                      {canDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(role)}
                          disabled={isDeleting}
                          className="
                            text-sm
                            font-medium
                            text-red-600
                            transition
                            hover:text-red-700
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RoleTable;
