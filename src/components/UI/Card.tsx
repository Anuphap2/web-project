import { CardProps } from "@/types/components";

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded border p-4 shadow-sm hover:shadow-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="text-gray-600">{children}</div> {/* ✅ ใช้ div แทน p */}
    </div>
  );
}
