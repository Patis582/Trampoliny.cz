import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-border-dark text-white">
      <div className="max-w-container-max mx-auto px-gutter pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <Link href="/" className="font-headline-sm text-headline-sm font-bold text-white tracking-tight">
              Trampolíny <span className="text-brand-orange">Liberec</span>
              <br />
              <span className="text-brand-green">& Patrman</span>
            </Link>
            <p className="mt-6 font-body-md text-white/60 font-light max-w-xs leading-relaxed">
              Závodní oddíl i veřejné skákání v Liberci. Dvě haly — Orionka v Harcově a Nádraží v centru města.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-label-bold text-[11px] text-white/40 uppercase tracking-widest mb-6">Sekce</h4>
            <div className="flex flex-col gap-4">
              {([
                ["Trampolíny Liberec", "/trampoliny-liberec"],
                ["Trampolíny Patrman", "/trampoliny-patrman"],
                ["Trenéři", "/treneri"],
              ] as [string, string][]).map(([label, href]) => (
                <Link key={label} href={href} className="text-white/70 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-label-bold text-[11px] text-white/40 uppercase tracking-widest mb-6">Stránky</h4>
            <div className="flex flex-col gap-4">
              {([
                ["Ceník", "/cenik"],
                ["Galerie", "/galerie"],
                ["Akce & závody", "/akce"],
                ["Jak na EOS", "/jak-na-to"],
                ["Dokumenty", "/dokumenty"],
              ] as [string, string][]).map(([label, href]) => (
                <Link key={label} href={href} className="text-white/70 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-label-bold text-[11px] text-white/40 uppercase tracking-widest mb-6">Kontakt</h4>
            <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">Telefon</p>
            <p className="text-white font-medium mb-6">+420 604 245 971</p>
            <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">Email</p>
            <p className="text-white font-medium">mirapatrman@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-xs font-light gap-4">
          <div>© {new Date().getFullYear()} Trampolíny Liberec & Patrman. Všechna práva vyhrazena.</div>
          <div className="flex flex-wrap gap-8 md:gap-10">
            <div className="flex flex-col gap-2">
              <span className="font-label-bold uppercase tracking-widest text-white/30">Trampolíny Liberec</span>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/trampoliny_liberec/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Instagram</a>
                <a href="https://www.facebook.com/people/Trampolíny-Liberec/100064273773002/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Facebook</a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-bold uppercase tracking-widest text-white/30">Trampolíny Patrman</span>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/trampolinypatrman/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">Instagram</a>
                <a href="https://www.facebook.com/trampolinypatrman/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">Facebook</a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-bold uppercase tracking-widest text-white/30">Sportovní areál Harcov</span>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/sportovni_areal_harcov/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
