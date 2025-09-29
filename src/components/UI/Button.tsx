import { ButtonProps } from "@/types/components";
// ไม่ใช้ twMerge แล้ว แต่ใช้การต่อ string ธรรมดาแทน
import React from "react";

export default function Button({
  label,
  onClick,
  className,
  children,
}: ButtonProps) {
  // กำหนด class พื้นฐาน (Default Classes)
  const baseClasses = "btn rounded-2xl";

  // รวม class พื้นฐานเข้ากับ class ที่ส่งมา (className)
  // ใช้วิธีต่อ String ธรรมดา (Classnames Library หรือ twMerge ไม่จำเป็นแล้ว)
  const mergedClasses = baseClasses + (className ? ` ${className}` : "");

  return (
    <button onClick={onClick} className={mergedClasses}>
      {/* ถ้ามี children ให้แสดง Icon/Element ก่อน label */}
      {children}
      {label}
    </button>
  );
}
