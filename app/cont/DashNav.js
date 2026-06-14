"use client"; // are nevoie de adresa paginii curente, ca să evidențieze meniul activ

import Link from "next/link";
import { usePathname } from "next/navigation";

// iconițe mici
const Ic = {
  home: <svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 10v10h14V10" /></svg>,
  qr: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v7h-7" /></svg>,
  card: <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>,
  receipt: <svg viewBox="0 0 24 24"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6" /></svg>,
  list: <svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>,
  user: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.3" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>,
  cog: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>,
  dumbbell: <svg viewBox="0 0 24 24"><path d="M2 9v6M5 7.5v9M19 7.5v9M22 9v6M5 12h14" /></svg>,
  shield: <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" /></svg>,
};

export default function DashNav({ rol }) {
  const path = usePathname();
  const esteAdmin = rol === "admin" || rol === "staff";

  // link activ
  function Item({ href, icon, children }) {
    const on = path === href;
    return (
      <Link href={href} className={on ? "on" : ""}>
        {icon}<span>{children}</span>
      </Link>
    );
  }
  // secțiune care vine mai târziu
  function Soon({ icon, children }) {
    return (
      <span className="soon">
        {icon}<span>{children}</span><span className="tag">în curând</span>
      </span>
    );
  }

  return (
    <nav className="dash-nav">
      <Item href="/cont" icon={Ic.home}>Acasă</Item>
      <Item href="/cont/acces" icon={Ic.qr}>Cod de acces</Item>
      <Item href="/cont/abonament" icon={Ic.card}>Abonamentul meu</Item>
      <Item href="/cont/exercitii" icon={Ic.dumbbell}>Ghid exerciții</Item>
      <Soon icon={Ic.receipt}>Plăți & facturi</Soon>
      <Item href="/cont/intrari" icon={Ic.list}>Istoric intrări</Item>
      <Item href="/cont/profil" icon={Ic.user}>Profil</Item>
      <Item href="/cont/setari" icon={Ic.cog}>Setări</Item>
      {esteAdmin && <Item href="/admin" icon={Ic.shield}>Administrare</Item>}
    </nav>
  );
}