import type { PortfolioContent } from "@/data/content";

export default function Footer({ copy }: { copy: PortfolioContent }) {
  return (
    <footer className="site-footer">
      <div className="section-container footer-inner">
        <div>
          <strong>PORTFOLIO</strong>
          <p>{copy.footer.builtWith} / 2026</p>
        </div>
        <a href="#home">{copy.footer.backToTop}</a>
        <small>{copy.footer.rights}</small>
      </div>
    </footer>
  );
}
