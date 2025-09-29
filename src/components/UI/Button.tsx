import { ButtonProps } from "@/types/components";
// ไม่ใช้ twMerge แล้ว แต่ใช้การต่อ string ธรรมดาแทน
import React from "react";

export default function Button({ label, onClick, className, children }: ButtonProps) {
  
  // กำหนด class พื้นฐาน (Default Classes)
  const baseClasses = "cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2";

  // รวม class พื้นฐานเข้ากับ class ที่ส่งมา (className)
  // ใช้วิธีต่อ String ธรรมดา (Classnames Library หรือ twMerge ไม่จำเป็นแล้ว)
  const mergedClasses = baseClasses + (className ? ` ${className}` : '');

  return (
    <button
      onClick={onClick}
      className={mergedClasses}
    >
      {/* ถ้ามี children ให้แสดง Icon/Element ก่อน label */}
      {children}
      {label}
    </button>
  );
}
