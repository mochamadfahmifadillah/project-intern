import type { FormEvent } from "react";

import type { Permission, Role, RoleForm } from "../../types/role";

import PermissionSelector from "./PermissionSelector";

interface RoleModalProps {
  open: boolean;
  editingRole: Role | null;

  form: RoleForm;

  permissions: Permission[];
  permissionsLoading: boolean;

  submitting: boolean;
  error: string;

  canCreate: boolean;
  canEdit: boolean;
  canManagePermissions: boolean;

  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;

  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;

  onPermissionChange: (permissionId: number) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

function RoleModal({
  open,
  editingRole,
  form,
  permissions,
  permissionsLoading,
  submitting,
  error,
  canCreate,
  canEdit,
  canManagePermissions,
  onClose,
  onSubmit,
  onNameChange,
  onDescriptionChange,
  onPermissionChange,
  onSelectAll,
  onClearAll,
}: RoleModalProps) {
  if (!open) {
    return null;
  }

  const canSubmit = editingRole ? canEdit : canCreate;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-modal-title"
      >
        {/* Header */}

        <div className="sticky top-0 border-b border-gray-200 bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="role-modal-title"
                className="text-lg font-semibold text-black"
              >
                {editingRole ? "Edit Role" : "Add Role"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingRole
                  ? "Perbarui informasi dan akses role."
                  : "Buat role baru beserta aksesnya."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              aria-label="Tutup modal"
              className="rounded-lg p-1 text-xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-black disabled:opacity-40"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}

        <form onSubmit={onSubmit} className="space-y-6 px-6 py-6">
          {/* Name */}

          <div>
            <label
              htmlFor="role-name"
              className="mb-1.5 block text-sm font-medium text-black"
            >
              Role name
            </label>

            <input
              id="role-name"
              type="text"
              value={form.name}
              onChange={(event) => onNameChange(event.target.value)}
              required
              autoFocus
              disabled={submitting}
              placeholder="Contoh: manager"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-50"
            />
          </div>

          {/* Description */}

          <div>
            <label
              htmlFor="role-description"
              className="mb-1.5 block text-sm font-medium text-black"
            >
              Description
              <span className="ml-1 font-normal text-gray-400">(opsional)</span>
            </label>

            <textarea
              id="role-description"
              value={form.description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              rows={3}
              disabled={submitting}
              placeholder="Jelaskan fungsi role ini..."
              className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-50"
            />
          </div>

          {/* Permissions */}

          {canManagePermissions && (
            <PermissionSelector
              permissions={permissions}
              selectedIds={form.permission_ids}
              loading={permissionsLoading}
              disabled={submitting}
              onChange={onPermissionChange}
              onSelectAll={onSelectAll}
              onClearAll={onClearAll}
            />
          )}

          {/* Error */}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Footer */}

          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting || !form.name.trim() || !canSubmit}
              className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : editingRole
                  ? "Save Changes"
                  : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleModal;
