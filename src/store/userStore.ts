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
        // ถ้าเป็น boss → บังคับค่าให้ตายตัว
        if (username === "boss" && password === "1234") {
          set({
            username: "boss",
            password: "1234",
            level: "manager",
            department: "HR",
          });
          return;
        }

        // เก็บ user ปกติลง list ก่อน
        useUserListStore
          .getState()
          .addUser({ username, password, level, department });

        // set user ปกติ
        set({ username, password, level, department });
      },

      logout: () => {
        set({
          username: null,
          password: null,
          level: null,
          department: null,
        });
      },
    }),
    { name: "user-storage" }
  )
);
