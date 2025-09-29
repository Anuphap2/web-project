import { ModalProps } from "@/types/components";

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-transform duration-300 ease-in-out transform scale-95">
        {/* ปุ่มปิด Modal ที่มุมขวาบน */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-900">
          {title}
        </h2>
        <div className="text-gray-700 mb-6">{children}</div>

        {/* ปุ่มปิดด้านล่าง (ตามโครงสร้างเดิมของคุณ) */}
        <button
          onClick={onClose}
          className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
