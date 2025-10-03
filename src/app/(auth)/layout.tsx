// app/(auth)/layout.tsx
import "@/styles/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      {children}
    </main>
  );
}
