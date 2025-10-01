type CardProps = { // ประกาศชนิดข้อมูลสำหรับ Card component
    title?: string;
    className?: string;
    children?: React.ReactNode;
};

type ModalProps = { // ประกาศชนิดข้อมูลสำหรับ Modal component
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

type ButtonProps = { // ประกาศชนิดข้อมูลสำหรับ Button component
    label: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
};

type ImageProps = { // ประกาศชนิดข้อมูลสำหรับ Image component
    src: string;
    alt: string;
};

type SkeletonProps = { // ประกาศชนิดข้อมูลสำหรับ Skeleton component
    className?: string;
};

type ToastProps = {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    onClose: () => void;
};

export type { CardProps, ModalProps, ButtonProps, ImageProps, SkeletonProps, ToastProps };