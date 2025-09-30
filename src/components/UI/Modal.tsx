import { ModalProps } from "@/types/components";

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  return (
    <div className={isOpen ? "modal modal-open" : "modal"}>
      <div className="modal-box relative">
        {/* ปุ่มปิด Modal */}
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">{title}</h3>

        <div className="mb-4">{children}</div>

        {/* Footer optional */}
      </div>
    </div>
  );
}
