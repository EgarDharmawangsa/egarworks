import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand />
        <p>
          © {new Date().getFullYear()} {siteConfig.owner}. Built with care.
        </p>
        <Link className="footer-top" href="/#hero">
          Back to top <ArrowUpRight size={15} />
        </Link>
      </div>
    </footer>
  );
}
