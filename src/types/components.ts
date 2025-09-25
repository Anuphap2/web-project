export type CardProps = { // ประกาศชนิดข้อมูลสำหรับ Card component
    title: string;
    content: string;
};

export type ModalProps = { // ประกาศชนิดข้อมูลสำหรับ Modal component
    title: string;
    content: string;
    onClose: () => void;
};

export type ButtonProps = { // ประกาศชนิดข้อมูลสำหรับ Button component
    label: string;
    onClick: () => void;
};

