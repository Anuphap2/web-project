import { ButtonProps } from "@/types/components";


// ทำ Button component โดยรับ props ที่มีชนิดข้อมูลเป็น ButtonProps
export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
    >
      {label}
    </button>
  );
}
