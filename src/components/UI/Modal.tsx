import { ModalProps } from "@/types/components";

// ทำ Modal component โดยรับ props ที่มีชนิดข้อมูลเป็น ModalProps
export default function Modal({ title, content, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <button
          onClick={onClose}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
