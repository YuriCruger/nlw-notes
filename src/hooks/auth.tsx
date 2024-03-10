import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosError, api } from "../services/api";
import { toast } from "sonner";

interface AuthContextProps {
  signIn: (data: signInProps) => Promise<void>;
  signOut: () => void;
  user: User | undefined;
  token: string | undefined;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface signInProps {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  password: string;
  created_at: string;
}

interface SignInResponse {
  token: string;
  user: User;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<SignInResponse | null>(null);

  async function signIn({ email, password }: signInProps) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@notes:user", JSON.stringify(user));
      localStorage.setItem("@notes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ user, token });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast.error(axiosError.response.data.message);
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@notes:token");
    localStorage.removeItem("@notes:user");

    setData(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("@notes:token");
    const user = localStorage.getItem("@notes:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data?.user,
        token: data?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
