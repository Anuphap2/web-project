"use client";
import { Task } from "@/types/task";
import Button from "@/components/UI/Button";

interface DeleteConfirmModalProps {
  task: Task;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteConfirmModal({
  task,
  onClose,
  onDelete,
}: DeleteConfirmModalProps) {
  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Confirm Delete</h3>
        <p>คุณแน่ใจว่าจะลบงาน {task.title} หรือไม่?</p>
        <div className="modal-action">
          <Button className="btn secondary" label="Cancel" onClick={onClose} />
          <Button className="btn btn-error" label="Delete" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
