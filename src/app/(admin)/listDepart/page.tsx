"use client";
import DepartmentUserList from "@/components/UI/users/fetchUser";
import useCheckUser from "@/hooks/checkLogin";

export default function ListDepart() {
  const { isAuthorized, isLoaded } = useCheckUser({ requiredRole: "manager" });
  if (!isLoaded) return <p>กำลังโหลด...</p>;
  if (!isAuthorized) return null;

  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">รายชื่อผู้ใช้งานในแผนก</h2>
        <DepartmentUserList />
      </section>
    </div>
  );
}
