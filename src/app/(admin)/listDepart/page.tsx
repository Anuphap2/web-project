import DepartmentUserList from "@/components/UI/users/fetchUser";
export default function ListDepart() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Users in Your Department
        </h2>
        <DepartmentUserList />
      </section>
    </div>
  );
}
