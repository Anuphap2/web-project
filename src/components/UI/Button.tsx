import { ButtonProps } from "@/types/components";

// ทำ Button component โดยรับ props ที่มีชนิดข้อมูลเป็น ButtonProps
export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {label}
    </button>
  );
}
