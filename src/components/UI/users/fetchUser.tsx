"use client";
import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useUserStore, useUserListStore } from "@/store/userStore";
import { UserDataTable } from "@/types/users";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";

export default function DepartmentUserTable() {
  const department = useUserStore((state) => state.department);
  const { users, deleteUser } = useUserListStore();
  const departmentUsers = users.filter((u) => u.department === department);

  const [filterText, setFilterText] = useState("");
  const [userToDelete, setUserToDelete] = useState<UserDataTable | null>(null);

  // กรอง user จากช่องค้นหา
  const filteredUsers = departmentUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(filterText.toLowerCase()) ||
      user.level.toLowerCase().includes(filterText.toLowerCase())
  );

  // เตรียมลบ user
  const confirmDelete = (user: UserDataTable) => {
    setUserToDelete(user);
  };

  const handleDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.username);
      setUserToDelete(null);
    }
  };

  const currentUsername = useUserStore((state) => state.username);

  const columns: TableColumn<UserDataTable>[] = [
    { name: "ชื่อผู้ใช้", selector: (row) => row.username, sortable: true },
    { name: "ระดับ", selector: (row) => row.level, sortable: true },
    { name: "แผนก", selector: (row) => row.department, sortable: true },
    {
      name: "การกระทำ",
      cell: (row) => {
        // ถ้า current user เป็น manager หรือ row เป็น manager/ตัวเอง → ซ่อนปุ่ม
        if (
          row.username === currentUsername || // ห้ามลบตัวเอง
          row.level === "manager" // ห้ามลบ manager
        ) {
          return null;
        }
        return (
          <Button
            className="btn-error text-white"
            label="ลบ"
            onClick={() => confirmDelete(row)}
          />
        );
      },
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f3f4f6",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        fontSize: "14px",
        borderBottom: "1px solid #e5e7eb",
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search username or level..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        striped
        noHeader
        customStyles={customStyles}
      />

      {/* Modal ลบผู้ใช้ */}
      <Modal
        isOpen={!!userToDelete}
        title="Confirm Delete"
        onClose={() => setUserToDelete(null)}
      >
        <p>
          คุณแน่ใจหรือไม่ที่จะลบผู้ใช้{" "}
          <span className="font-bold">{userToDelete?.username}</span>?
        </p>
        <div className="modal-action justify-end gap-2 mt-4">
          <Button
            className="secondary"
            label="ยกเลิก"
            onClick={() => setUserToDelete(null)}
          />
          <Button
            className="btn-error text-white"
            label="ลบผู้ใช้งาน"
            onClick={handleDelete}
          />
        </div>
      </Modal>
    </div>
  );
}
