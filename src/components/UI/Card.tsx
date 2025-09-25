import { CardProps } from "@/types/components";


// ทำ Card component โดยรับ props ที่มีชนิดข้อมูลเป็น CardProps
export default function Card({ title, content }: CardProps) {
  return (
    <div className="rounded border p-4 shadow-sm hover:shadow-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}
