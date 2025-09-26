import { ExampleBlockProps } from "@/types/components";
export default function ExampleBlock({
  title,
  description,
  code,
  children,
}: ExampleBlockProps & { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-xl p-8 space-y-6 bg-white shadow-lg transition-shadow hover:shadow-xl">
      <header className="space-y-1 border-b border-gray-200 pb-4">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        {description && <p className="text-gray-600">{description}</p>}
      </header>

      {/* ส่วนแสดงตัวอย่าง */}
      <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-100">
        {children}
      </div>

      {/* ส่วนแสดงโค้ด */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Code</p>
        <pre className="bg-gray-800 text-green-300 text-sm rounded-lg p-5 overflow-x-auto font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
