import { type LucideIcon } from "lucide-react";

export interface Permission {
  id: number;
  name: string;
  description: string | null;
}

export interface Role {
  id: number;
  name: string;
  description: string | null;
  permissions?: Permission[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

export interface DashboardStatistics {
  users: number | null;
  roles: number | null;
  permissions: number | null;
}

export interface DashboardResponse {
  statistics: DashboardStatistics;
}

export interface StatisticCard {
  title: string;
  value: number | null;
  description: string;
  path: string;
  permission: string;
  icon: LucideIcon;
}