type UserLevel = "manager" | "employee";

type User = {
  username: string;
  password: string;
  level: UserLevel;
  department: string;
};

type UserDataTable = {
  username: string;
  level: string;
  department: string;
}

type UserStore = {
  username: string | null;
  password: string | null;
  level: UserLevel | null;
  department: string | null;
  login: (username: string, password: string, level: UserLevel, department: string) => void;
  logout: () => void;
};

type UserListStore = {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void
  deleteUser: (username: string) => void;
};


export type { User, UserLevel, UserStore, UserListStore, UserDataTable };



