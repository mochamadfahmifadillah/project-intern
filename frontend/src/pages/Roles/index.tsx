import { useState, type FormEvent } from "react";

import { useAuth } from "../../context/AuthContext";
import { useRoles } from "../../hooks/roles/useRoles";

import type { Role, RoleForm } from "../../types/role";

import RoleTable from "../../components/roles/RoleTable";
import RoleModal from "../../components/roles/RoleModal";
import RoleLoadingSkeleton from "../../components/roles/RoleLoadingSkeleton";
import RoleEmptyState from "../../components/roles/RoleEmptyState";

function Roles() {
  const { hasPermission } = useAuth();

  /*
  |--------------------------------------------------------------------------
  | Permissions
  |--------------------------------------------------------------------------
  */

  const canCreate = hasPermission("roles.create");
  const canEdit = hasPermission("roles.edit");
  const canDelete = hasPermission("roles.delete");

  const canManagePermissions = canCreate || canEdit;

  /*
  |--------------------------------------------------------------------------
  | Roles Hook
  |--------------------------------------------------------------------------
  */

  const {
    roles,
    permissions,

    loading,
    permissionsLoading,

    submitting,
    deleting,

    error,

    handleCreate,
    handleUpdate,

    // Alias agar tidak bentrok dengan handler handleDelete di component.
    handleDelete: deleteRole,

    clearError,
  } = useRoles({
    canManagePermissions,
  });

  /*
  |--------------------------------------------------------------------------
  | Modal
  |--------------------------------------------------------------------------
  */

  const [showModal, setShowModal] = useState(false);

  const [editingRole, setEditingRole] = useState<Role | null>(null);

  /*
  |--------------------------------------------------------------------------
  | Form
  |--------------------------------------------------------------------------
  */

  const [form, setForm] = useState<RoleForm>({
    name: "",
    description: "",
    permission_ids: [],
  });

  /*
  |--------------------------------------------------------------------------
  | Reset Form
  |--------------------------------------------------------------------------
  */

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      permission_ids: [],
    });

    setEditingRole(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Add Role
  |--------------------------------------------------------------------------
  */

  const handleAdd = () => {
    if (!canCreate) {
      return;
    }

    clearError();
    resetForm();

    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Edit Role
  |--------------------------------------------------------------------------
  */

  const handleEdit = (role: Role) => {
    if (!canEdit) {
      return;
    }

    clearError();

    setEditingRole(role);

    setForm({
      name: role.name,
      description: role.description ?? "",
      permission_ids: Array.isArray(role.permissions)
        ? role.permissions.map((permission) => permission.id)
        : [],
    });

    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Permission Change
  |--------------------------------------------------------------------------
  */

  const handlePermissionChange = (permissionId: number) => {
    setForm((current) => {
      const exists = current.permission_ids.includes(permissionId);

      return {
        ...current,

        permission_ids: exists
          ? current.permission_ids.filter((id) => id !== permissionId)
          : [...current.permission_ids, permissionId],
      };
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Select All Permissions
  |--------------------------------------------------------------------------
  */

  const handleSelectAll = () => {
    setForm((current) => ({
      ...current,

      permission_ids: permissions.map((permission) => permission.id),
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Clear All Permissions
  |--------------------------------------------------------------------------
  */

  const handleClearAll = () => {
    setForm((current) => ({
      ...current,

      permission_ids: [],
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      permission_ids: form.permission_ids,
    };

    try {
      /*
      |--------------------------------------------------------------------------
      | Update
      |--------------------------------------------------------------------------
      */

      if (editingRole) {
        if (!canEdit) {
          return;
        }

        await handleUpdate(editingRole.id, payload);
      } else {
        /*
        |--------------------------------------------------------------------------
        | Create
        |--------------------------------------------------------------------------
        */

        if (!canCreate) {
          return;
        }

        await handleCreate(payload);
      }

      closeModal();
    } catch {
      /*
       * Error sudah ditangani oleh useRoles.
       */
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (role: Role) => {
    if (!canDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Yakin ingin menghapus role "${role.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    await deleteRole(role.id);
  };

  /*
  |--------------------------------------------------------------------------
  | Close Modal
  |--------------------------------------------------------------------------
  */

  const closeModal = () => {
    if (submitting) {
      return;
    }

    setShowModal(false);
    resetForm();
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return <RoleLoadingSkeleton />;
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Roles
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola role dan akses permission pengguna.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={handleAdd}
            className="
              inline-flex
              items-center
              justify-center
              rounded-lg
              bg-black
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-gray-800
              focus:outline-none
              focus:ring-2
              focus:ring-black
              focus:ring-offset-2
            "
          >
            + Add Role
          </button>
        )}
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
          role="alert"
          className="
            flex
            items-start
            gap-3
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
          "
        >
          <span className="font-medium">Error:</span>

          <span>{error}</span>
        </div>
      )}

      {/* =====================================================
          TABLE
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {roles.length > 0 ? (
          <RoleTable
            roles={roles}
            canEdit={canEdit}
            canDelete={canDelete}
            deleting={deleting}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <RoleEmptyState canCreate={canCreate} onAdd={handleAdd} />
        )}
      </div>

      {/* =====================================================
          MODAL
      ====================================================== */}

      <RoleModal
        open={showModal}
        editingRole={editingRole}
        form={form}
        permissions={permissions}
        permissionsLoading={permissionsLoading}
        submitting={submitting}
        error={error}
        canCreate={canCreate}
        canEdit={canEdit}
        canManagePermissions={canManagePermissions}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onNameChange={(value) =>
          setForm((current) => ({
            ...current,
            name: value,
          }))
        }
        onDescriptionChange={(value) =>
          setForm((current) => ({
            ...current,
            description: value,
          }))
        }
        onPermissionChange={handlePermissionChange}
        onSelectAll={handleSelectAll}
        onClearAll={handleClearAll}
      />
    </div>
  );
}

export default Roles;
