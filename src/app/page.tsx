"use client";
import { useState } from "react";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import Modal from "@/components/UI/Modal";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <main className="container mx-auto p-4">
      <h1>Hello World!</h1>

      <Card title="Card Title" content="This is a card component." />
      <Card title="Card Title" content="This is a card component." />
      <Card title="Card Title" content="This is a card component." />

      <div className="my-4 space-x-2">
        

        <Button label="Open Modal" onClick={() => setShowModal(true)} />
        <Button label="Open Modal2" onClick={() => setShowModal2(true)} />
        <Button label={`Count: ${count}`} onClick={() => setCount(count + 1)} />
      </div>

      {/* Render modal เฉพาะเมื่อ showModal เป็น true */}
      {showModal && (
        <Modal
          title="Modal Title"
          content="This is a modal component."
          onClose={() => setShowModal(false)}
        />
      )}
      {showModal2 && (
        <Modal
          title="Modal Title2"
          content="This is a modal component2."
          onClose={() => setShowModal2(false)}
        />
      )}
    </main>
  );
}
