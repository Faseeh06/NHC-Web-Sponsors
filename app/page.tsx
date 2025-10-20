import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <main className="p-inset h-[100dvh] w-full">
      <div className="relative h-full w-full">
        <Background src="/landscape.png" />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
