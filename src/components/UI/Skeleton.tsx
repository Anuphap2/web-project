import { SkeletonProps } from "@/types/components";

// ทำ Skeleton component โดยรับ props ที่มีชนิดข้อมูลเป็น SkeletonProps

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
    />
  );
}
