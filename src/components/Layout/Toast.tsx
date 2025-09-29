"use client";
import { ToastProps } from "@/types/components";

export default function Toast({ message, type = "info", onClose }: ToastProps) {
  const typeClass = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  }[type];

  return (
    <div className="toast toast-end">
      <div className={`alert ${typeClass}`}>
        <span>{message}</span>
        <button className="ml-2 btn btn-sm btn-ghost" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
