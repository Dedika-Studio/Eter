interface LegalFooterProps {
  title: string;
  description: string;
  year?: number;
  storeName?: string;
}

export function LegalFooter({
  title,
  description,
  year = new Date().getFullYear(),
  storeName = "ETER KPOP",
}: LegalFooterProps) {
  return (
    <section className="py-8 md:py-10 bg-slate-100/50 border-t border-slate-200">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">
            © {year} {storeName}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
