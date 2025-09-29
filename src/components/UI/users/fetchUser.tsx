"use client";
import { useUserStore, useUserListStore } from "@/store/userStore";

// Component แสดง users ใน department
export default function DepartmentUserList() {
  const department = useUserStore((state) => state.department);
  const users = useUserListStore((state) => state.users);
  const departmentUsers = users.filter((u) => u.department === department);

  // filter users ตาม department

  if (departmentUsers.length === 0) {
    return <p>No users in your department yet.</p>;
  }

  return (
    <ul className="list-disc pl-5 space-y-1">
      {departmentUsers.map((user) => (
        <li key={user.username}>
          {user.username} ({user.level}) {user.department}
        </li>
      ))}
    </ul>
  );
}
