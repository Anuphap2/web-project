"use client";
import { useState } from "react";
import Card from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Skeleton from "@/components/UI/Skeleton";
import Image from "next/image";
import ExampleBlock from "@/components/UI/ExampleCode";
import Hero from "@/components/Layout/Herosection";

export default function UIDocs() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  return (
    <main className="container mx-auto px-4 space-y-12 py-8">
      <div>
        <ExampleBlock
          title="Hero Section"
          description="ใช้สําหรับแสดงหัวข้อหลักในหน้าเว็บไซต์"
          code={`<Hero title="หัวข้อหลัก" subtitle="หัวข้อย่อย" label="ชื่อปุ่ม" link="ลิงค์" />`}
        >
          <Hero
            title="UI Components Gallery"
            subtitle="รวมตัวอย่างและเอกสารประกอบการใช้งานคอมโพเนนต์หลักที่ใช้ในโปรเจกต์"
            label="ดูเพิ่มเติม"
            link="#features"
          />
        </ExampleBlock>
      </div>

      {/* Card Example */}
      <ExampleBlock
        title="Card"
        description="ใช้สำหรับแสดงข้อมูลในกล่องที่มี title และ content"
        code={`<Card title="Example Card">
  <p>This is an example of a card component.</p>
</Card>`}
      >
        <Card title="Example Card">
          <p>This is an example of a card component.</p>
        </Card>
      </ExampleBlock>

      {/* Button Example */}
      <ExampleBlock
        title="Button"
        description="ปุ่มกดที่รองรับ action ต่าง ๆ เช่น เปิด modal หรือเพิ่ม counter"
        code={`<Button label="Click Me" onClick={handleClick} />`}
      >
        <div className="flex gap-2">
          <Button
            label="Open Modal 1"
            onClick={() => setActiveModal("modal1")}
          />
          <Button
            label="Open Modal 2"
            onClick={() => setActiveModal("modal2")}
          />
          <Button
            label={`Count: ${count}`}
            onClick={() => setCount((c) => c + 1)}
          />
        </div>
      </ExampleBlock>

      {/* Skeleton Example */}
      <ExampleBlock
        title="Skeleton"
        description="ใช้สำหรับแสดง placeholder ระหว่างโหลดข้อมูล"
        code={`<Skeleton className="w-32 h-6" />`}
      >
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-full h-48" />
          <Skeleton className="w-[180px] h-[37px]" />
        </div>
      </ExampleBlock>

      {/* Image Example */}
      <ExampleBlock
        title="Image"
        description="รูปภาพที่ optimized โดย Next.js Image component"
        code={`<Image src="/next.svg" alt="Next.js Logo" width={180} height={37} />`}
      >
        <Image src="/next.svg" alt="Next.js Logo" width={180} height={37} />
      </ExampleBlock>

      {/* Modal Example */}
      <ExampleBlock
        title="Modal"
        description="กล่อง popup ที่โผล่มาด้านบนของหน้า ใช้สำหรับแจ้งเตือนหรือรับข้อมูล"
        code={`<Modal isOpen={isOpen} title="Modal Title" onClose={closeFn}>
  <p>Modal Content</p>
</Modal>`}
      >
        <div className="flex gap-2">
          <Button
            label="Open Modal 1"
            onClick={() => setActiveModal("modal1")}
          />
          <Button
            label="Open Modal 2"
            onClick={() => setActiveModal("modal2")}
          />
        </div>

        <Modal
          isOpen={activeModal === "modal1"}
          title="Modal 1"
          onClose={() => setActiveModal(null)}
        >
          <p>This is content for Modal 1.</p>
        </Modal>

        <Modal
          isOpen={activeModal === "modal2"}
          title="Modal 2"
          onClose={() => setActiveModal(null)}
        >
          <p>This is content for Modal 2.</p>
        </Modal>
      </ExampleBlock>
    </main>
  );
}
