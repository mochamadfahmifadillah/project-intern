export interface Permission {
  id: number;
  name: string;
  description: string | null;
}

export interface Role {
  id: number;
  name: string;
  description: string | null;
  permissions: Permission[];
}

export interface RoleForm {
  name: string;
  description: string;
  permission_ids: number[];
}