import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserStore, UserListStore } from "@/types/users";

// store สำหรับ user list
export const useUserListStore = create<UserListStore>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user: User) =>
        set((state: UserListStore) => {
          const checkUser = state.users.find((u) => u.username === user.username);
          if (checkUser) return state; // ถ้า user มีอยู่แล้ว ไม่เพิ่มซ้ำ
          return { users: [...state.users, user] };
        }),
    }),
    { name: "user-list-storage" } // key ใน localStorage

  )
);

// store สำหรับ user ปัจจุบัน
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: null,
      password: null,
      level: null,
      department: null,

      login: (username, password, level, department) => {
        // เก็บ user ปัจจุบันลง list ก่อน
        useUserListStore.getState().addUser({ username, password, level, department });
        // set user ปัจจุบัน
        set({ username, password, level, department });
      },

      logout: () => {
        // เคลียร์ user ปัจจุบัน แต่ user list ยังคงอยู่
        set({ username: null, password: null, level: null, department: null });
      },
    }),
    { name: "user-storage" }
  )
);
