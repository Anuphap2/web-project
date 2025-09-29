import { CardProps } from "@/types/components";

export default function Card({ title, className, children }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 p-5 bg-base-100 shadow-md hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
        {title}
      </h3>
      <div className="text-gray-900 text-2xl sm:text-3xl font-bold text-center">
        {children}
      </div>
    </div>
  );
}
