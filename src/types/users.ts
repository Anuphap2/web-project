export type UserLevel = "manager" | "employee";

export type User = {
  username: string;
  password: string;
  level: UserLevel;
  department: string;
};

export type UserDataTable = {
  username: string;
  level: string;
  department: string;
}

export type UserStore = {
  username: string | null;
  password: string | null;
  level: UserLevel | null;
  department: string | null;
  login: (username: string, password: string, level: UserLevel, department: string) => void;
  logout: () => void;
};

export type UserListStore = {
  users: User[];
  addUser: (user: User) => void;
};


