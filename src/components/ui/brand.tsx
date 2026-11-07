import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  href = "/#hero",
  ...props
}: ComponentProps<"a">) {
  return (
    <Link
      href={href}
      aria-label="Egarworks home"
      className={cn("brand", className)}
      {...props}
    >
      egar<span className="text-muted-foreground">works</span>
      <span className="brand-dot" aria-hidden="true">
        .
      </span>
    </Link>
  );
}
