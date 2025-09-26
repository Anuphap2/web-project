import { CardProps } from "@/types/components";

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-6 space-y-2 bg-white shadow-lg transition-shadow hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
