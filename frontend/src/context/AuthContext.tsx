import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";

interface Role {
  id: number;
  name: string;
  description: string | null;
  permissions?: Permission[];
}

interface Permission {
  id: number;
  name: string;
  description: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;

      try {
        const response = await api.get("/user");

        setUser(response.data.user);
      } catch (error) {
        console.error("Gagal mengambil user:", error);

        localStorage.removeItem("token");
        delete api.defaults.headers.common.Authorization;

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post("/login", {
      email,
      password,
    });

    const newToken = response.data.token;

    localStorage.setItem("token", newToken);

    api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

    setToken(newToken);

    const userResponse = await api.get("/user");

    setUser(userResponse.data.user);
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");

      delete api.defaults.headers.common.Authorization;

      setToken(null);
      setUser(null);
    }
  };

  const hasRole = (role: string) => {
    return user?.roles?.some((item) => item.name === role) ?? false;
  };

  const hasPermission = (permission: string) => {
    return (
      user?.roles?.some((role) =>
        role.permissions?.some((item) => item.name === permission),
      ) ?? false
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider.");
  }

  return context;
}
