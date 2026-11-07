import { ArrowUpRight, Code2 } from "lucide-react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <a href="#hero" className="brand">
          <Code2 size={19} />
          egar<span className="text-muted-foreground">works</span>
          <span className="brand-dot">.</span>
        </a>
        <p>© {new Date().getFullYear()} Egar Dharmawangsa. Built with care.</p>
        <a className="footer-top" href="#hero">
          Back to top <ArrowUpRight size={15} />
        </a>
      </div>
    </footer>
  );
}
