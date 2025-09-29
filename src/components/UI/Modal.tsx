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
      onClick={onClose} // คลิก backdrop จะปิด
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-transform duration-300 ease-in-out transform scale-95"
        onClick={(e) => e.stopPropagation()} // ป้องกันคลิกใน modal ปิด
      >
        {/* ปุ่มปิด Modal */}
        <button onClick={onClose} className="absolute top-4 right-4 ...">
          X
        </button>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="text-gray-700 mb-6">{children}</div>
      </div>
    </div>
  );
}
