import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">Button Component Test</h1>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <DynamicIcon name="lucide:code" className="" />
          <DynamicIcon name="lucide:github" className="" />
          <DynamicIcon name="simple-icons:nextdotjs" className="" />
        </div>
        <Link href="/test-integration">
          <Button>Test Integration</Button>
        </Link>
        <Button>Primary</Button>

        <Button variant="secondary">Secondary</Button>

        <Button variant="outline">Outline</Button>

        <Button variant="ghost">Ghost</Button>

        <Button variant="destructive">Destructive</Button>

        <Button variant="link">Link</Button>
      </div>

      <div className="flex items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>

      <Button disabled>Disabled</Button>
    </main>
  );
}
