"use client";
import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useUserStore, useUserListStore } from "@/store/userStore";
import { UserDataTable } from "@/types/users";

export default function DepartmentUserTable() {
  const department = useUserStore((state) => state.department);
  const users = useUserListStore((state) => state.users);
  const departmentUsers = users.filter((u) => u.department === department);

  const [filterText, setFilterText] = useState("");

  const filteredUsers = departmentUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(filterText.toLowerCase()) ||
      user.level.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns: TableColumn<UserDataTable>[] = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
  ];

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f3f4f6", // สีหัวตารางแบบ Tailwind gray-100
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        fontSize: "14px",
        borderBottom: "1px solid #e5e7eb", // Tailwind gray-200
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Users in Department: {department}
      </h2>

      {/* Search Input */}
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
    </div>
  );
}
