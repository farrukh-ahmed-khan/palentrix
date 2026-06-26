import { Hero } from "@/components/site/Hero";
import { DeferredHomeSections } from "./DeferredHomeSections";

export function HomePage() {
  return (
    <main>
      <Hero />
      <DeferredHomeSections />
    </main>
  );
}
