import Reveals from "../Reveals";

export default function Sala() {
  return (
    <>
<section className="page-head">
  <div className="wrap">
    <span className="eyebrow">Aer SportClub</span>
    <h1 className="reveal" style={{opacity: '1', transform: 'none'}}>Sala</h1>
    <p className="ph-sub reveal" style={{opacity: '1', transform: 'none'}}>Tot ce-ți trebuie ca să te antrenezi serios — forță, cardio, recuperare și un loc bun de stat după. Deschis non-stop, intri cu telefonul.</p>
    <div className="howpay">
      <span className="chip"><span className="d"></span><b>Non-stop</b> — 24/7</span>
      <span className="chip"><span className="d"></span><b>Acces cu cod QR</b> din aplicație</span>
      <span className="chip"><span className="d"></span><b>Târgu Neamț</b></span>
    </div>
  </div>
</section>

<section className="section" id="zone" style={{paddingTop: '40px'}}>
  <div className="wrap">
    <div className="sec-head reveal">
      <span className="eyebrow">Ce găsești la Aer</span>
      <h2>Zonele sălii.</h2>
      <p>Echipament bun, spațiu curat și tot ce-ți trebuie ca să te antrenezi cum vrei.</p>
    </div>
    <div className="grid-cards">
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><path d="M2 9v6M5 7.5v9M19 7.5v9M22 9v6M5 12h14"/></svg></div><h3>Zonă de forță</h3><p>Greutăți libere și aparate, cu spațiu cât să lucrezi serios. Fără cozi, fără compromis.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><path d="M2 12h4l2.5-6 4 12 2.5-6H22"/></svg></div><h3>Zonă cardio</h3><p>Benzi, biciclete, eliptice. Pentru încălzire, condiție sau ziua de cardio.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><path d="M7 3.5c.9 1 0 2 0 3M12 3.5c.9 1 0 2 0 3M17 3.5c.9 1 0 2 0 3"/><path d="M4 11h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"/></svg></div><h3>Saună & recuperare</h3><p>Saună, dușuri și vestiare. Te refaci ca lumea după ce ai dat tot.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><path d="M5 8h12v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/><path d="M17 9h2.4a2 2 0 0 1 0 4H17"/><path d="M8.5 3c.6.8 0 1.5 0 2.3M12 3c.6.8 0 1.5 0 2.3"/></svg></div><h3>Bar & cafea de specialitate</h3><p>Cafea bună și un loc în care rămâi după antrenament.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3.2"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg></div><h3>Antrenor personal</h3><p>Un plan pe corpul și obiectivul tău, cu cineva lângă tine la fiecare ședință.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7h-7"/></svg></div><h3>Acces 24/7 cu cod QR</h3><p>Codul tău în aplicație. Intri singur, oricând — zi sau noapte.</p></div></div>
    </div>
  </div>
</section>

<section className="band">
  <img src="/images/brand.jpg" alt="Atmosfera Aer SportClub" />
  <div className="vile"></div>
  <div className="wrap"><div className="bc reveal">
    <span className="eyebrow">Atmosfera</span>
    <h2>O sală în care contează antrenamentul, nu decorul.</h2>
    <p>Echipament bun, spațiu curat și oameni care îți vor binele — fără atmosfera rece din alte locuri. Vii, te antrenezi, pleci mai bine.</p>
    <a className="btn btn-ghost magnetic" style={{marginTop: '26px'}} href="/abonamente">Vezi abonamentele</a>
  </div></div>
</section>

<section className="section" id="acces">
  <div className="wrap feature">
    <div className="reveal">
      <span className="eyebrow">Acces non-stop</span>
      <h2>Te antrenezi la ora ta.</h2>
      <p>Deschizi aplicația, scanezi codul la ușă și intri. Fără program, fără recepție, fără așteptat la rând. Codul se schimbă singur, pentru siguranță.</p>
      <div className="feature-list">
        <div className="fl"><span className="ck">✓</span><span>Intri 24 de ore din 24, în fiecare zi.</span></div>
        <div className="fl"><span className="ck">✓</span><span>Cod QR dinamic — doar al tău.</span></div>
        <div className="fl"><span className="ck">✓</span><span>Ghid video la fiecare aparat, prin scanare.</span></div>
      </div>
    </div>
    <div className="qr-card glass sweep reveal" style={{alignItems: 'flex-start', textAlign: 'left'}}>
      <span className="eyebrow">Program</span>
      <h3 style={{fontFamily: 'var(--fd)', fontSize: '30px'}}>Deschis non-stop</h3>
      <p className="muted" style={{fontSize: '15px'}}>Luni–Duminică, 24 din 24. Nu există „închis" — sala te așteaptă oricând ai chef de antrenament.</p>
      <div style={{marginTop: '6px'}}><span className="muted" style={{fontSize: '14px'}}>Locație</span><div className="fd" style={{fontSize: '18px'}}>Târgu Neamț · adresa în curând</div></div>
    </div>
  </div>
</section>

<section className="final">
  <div className="reveal">
    <span className="eyebrow">Te așteptăm</span>
    <h2>Vino să te convingi.</h2>
    <p>Alege un abonament și intră. Dacă nu te convinge, n-ai pierdut nimic.</p>
    <a className="btn btn-primary magnetic" style={{marginTop: '32px', padding: '15px 32px'}} href="/abonamente">Alege abonament</a>
  </div>
</section>

      <Reveals />
    </>
  );
}