export type CardProps = { // ประกาศชนิดข้อมูลสำหรับ Card component
    title?: string;
    className?: string;
    children?: React.ReactNode;
};

export type ModalProps = { // ประกาศชนิดข้อมูลสำหรับ Modal component
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

export type ButtonProps = { // ประกาศชนิดข้อมูลสำหรับ Button component
    label: string;
    onClick: () => void;
    className?: string;
    children?: React.ReactNode;
};

export type ImageProps = { // ประกาศชนิดข้อมูลสำหรับ Image component
    src: string;
    alt: string;
};

export type SkeletonProps = { // ประกาศชนิดข้อมูลสำหรับ Skeleton component
    className?: string;
};

export type ToastProps = {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    onClose: () => void;
};
