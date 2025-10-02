import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserStore, UserListStore } from "@/types/users";

// store สำหรับ user list
const useUserListStore = create<UserListStore>()(
  persist(
    (set) => ({
      users: [],
      isLoaded: false,
      loadUser: () => set({ isLoaded: true }),
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
      isLoaded: false,  // ✅ เพิ่ม isLoaded

      login: (username, password, level, department) => {
        useUserListStore
          .getState()
          .addUser({ username, password, level, department });

        set({ username, password, level, department, isLoaded: true });
      },

      logout: () => {
        set({
          username: null,
          password: null,
          level: null,
          department: null,
          isLoaded: true,
        });
      },

      loadUser: () => { // ✅ เพิ่มฟังก์ชัน loadUser
        const saved = localStorage.getItem("user-storage");
        if (saved) {
          const { state } = JSON.parse(saved); // persist ของ Zustand จะอยู่ใน state
          set({
            username: state.username,
            password: state.password,
            level: state.level,
            department: state.department,
            isLoaded: true,
          });
        } else {
          set({ username: null, password: null, level: null, department: null, isLoaded: true });
        }
      },
    }),
    { name: "user-storage" }
  )
);


export { useUserListStore, useUserStore };