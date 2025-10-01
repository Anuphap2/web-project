import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserStore, UserListStore } from "@/types/users";

// store สำหรับ user list
const useUserListStore = create<UserListStore>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user: User) =>
        set((state: UserListStore) => {
          const checkUser = state.users.find((u) => u.username === user.username);
          if (checkUser) return state; // ถ้ามีอยู่แล้ว ไม่เพิ่มซ้ำ
          return { users: [...state.users, user] };
        }),

      updateUser: (updatedUser: User) =>
        set((state) => ({
          users: state.users.map(u =>
            u.username === updatedUser.username ? { ...updatedUser } : u
          ),
        })),


      deleteUser: (username: string) =>
        set((state: UserListStore) => ({
          users: state.users.filter((u) => u.username !== username),
        })),
    }),
    { name: "user-list-storage" } // key ใน localStorage
  )
);

// store สำหรับ user ปัจจุบัน
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: null,
      password: null,
      level: null,
      department: null,

      login: (username, password, level, department) => {
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

export { useUserListStore, useUserStore };