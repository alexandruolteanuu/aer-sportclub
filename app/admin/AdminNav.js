"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Ic = {
  grid: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  users: <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6a3 3 0 0 1 0 6M19.5 20a5 5 0 0 0-3-4.6" /></svg>,
  card: <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>,
  receipt: <svg viewBox="0 0 24 24"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6" /></svg>,
  scan: <svg viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M3 12h18" /></svg>,
  dumbbell: <svg viewBox="0 0 24 24"><path d="M2 9v6M5 7.5v9M19 7.5v9M22 9v6M5 12h14" /></svg>,
  staff: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.3" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>,
  cog: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>,
  back: <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>,
};

export default function AdminNav() {
  const path = usePathname();

  function Item({ href, icon, children }) {
    const on = path === href;
    return (
      <Link href={href} className={on ? "on" : ""}>
        {icon}<span>{children}</span>
      </Link>
    );
  }
  function Soon({ icon, children }) {
    return (
      <span className="soon">
        {icon}<span>{children}</span><span className="tag">în curând</span>
      </span>
    );
  }

  return (
    <nav className="dash-nav">
      <Item href="/admin" icon={Ic.grid}>Privire de ansamblu</Item>
      <Item href="/admin/membri" icon={Ic.users}>Membri</Item>
      <Soon icon={Ic.card}>Abonamente</Soon>
      <Soon icon={Ic.receipt}>Plăți & facturi</Soon>
      <Soon icon={Ic.scan}>Acces & intrări</Soon>
      <Item href="/admin/exercitii" icon={Ic.dumbbell}>Ghid exerciții</Item>
      <Soon icon={Ic.staff}>Personal</Soon>
      <Soon icon={Ic.cog}>Setări sală</Soon>
      <Item href="/cont" icon={Ic.back}>Zona mea</Item>
    </nav>
  );
}