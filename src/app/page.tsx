"use client";
import { useState } from "react";
import Card from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Skeleton from "@/components/UI/Skeleton";
import Image from "next/image";

export default function UIDocs() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  return (
    <main className="container mx-auto p-6 space-y-12">
      {/* =======================
          Header
      ======================== */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">UI Components Gallery</h1>
        <p className="text-gray-600">
          ตัวอย่างการใช้งาน Card, Button, Modal, Skeleton และ Image
        </p>
      </header>

      {/* =======================
          Card Section
      ======================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>

        <Card title="Example Card">
          <p>This is an example of a card component.</p>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} title={`Card ${i + 1}`}>
              <p>This is card content for card {i + 1}.</p>
            </Card>
          ))}
        </div>
      </section>

      {/* =======================
          Button Section
      ======================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-2 items-center">
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
            onClick={() => setCount((prev) => prev + 1)}
          />
        </div>
      </section>

      {/* =======================
          Skeleton Section
      ======================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Skeletons</h2>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-full h-48" />
          <Skeleton className="w-[180px] h-[37px]" />
        </div>
      </section>

      {/* =======================
          Image Section
      ======================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Images</h2>
        <div className="w-48">
          <Image src="/next.svg" alt="Next.js Logo" width={180} height={37} />
        </div>
      </section>

      {/* =======================
          Modals Section
      ======================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Modals</h2>
        <p>คลิกปุ่มเพื่อเปิด modal ตัวอย่าง</p>
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
      </section>
    </main>
  );
}
