import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="shell not-found">
      <span className="eyebrow">404 / PAGE NOT FOUND</span>
      <h1>
        This page took a wrong turn<span className="blue-dot">.</span>
      </h1>
      <p>
        The page you’re looking for doesn’t exist. Let’s get you back to the
        portfolio.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <ArrowLeft />
          Back to home
        </Link>
      </Button>
    </section>
  );
}
