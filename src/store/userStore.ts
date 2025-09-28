import { create } from "zustand";

type UserLevel = "manager" | "employee";

type UserStore = {
  username: string | null;
  password: string | null;
  level: UserLevel | null;
  department: string | null;
  login: (username: string, password: string, level: UserLevel, department: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  username: null,
  password: null,
  level: null,
  department: null,

  login: (username, password, level, department) => {
    set({ username, password, level, department });
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("level", level);
    localStorage.setItem("department", department);
  },

  logout: () => {
    set({ username: null, password: null, level: null, department: null });
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("level");
    localStorage.removeItem("department");
  },
}));
