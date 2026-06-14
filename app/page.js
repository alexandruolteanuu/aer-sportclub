import HomeEffects from "./HomeEffects";
import Hero3D from "./Hero3D";
export default function Home() {
  return (
    <>

<section className="hero">
  <div className="hero-media"><img src="/images/fatada.jpg" alt="Aer SportClub — fațada clubului" /></div>
  <div className="hero-grade"></div>
  <svg className="sun-arc" id="sunArc" viewBox="0 0 1000 360" preserveAspectRatio="xMidYMid slice"></svg>
  <canvas id="hero3d"></canvas>
  <div className="hero-inner">
    <div className="wrap">
      <span className="hero-badge"><span className="dot-live"></span> Târgu Neamț · Deschis acum, ca întotdeauna</span>
      <h1>
        <span className="ln"><span>O altfel</span></span>
        <span className="ln"><span>de sală.</span></span>
        <span className="ln"><span className="dim">Non-stop.</span></span>
      </h1>
      <p className="sub">Deschisă 24/7. Intri cu telefonul, te antrenezi la ora ta — fără program, fără recepție, fără scuze.</p>
      <div className="cta">
        <a className="btn btn-primary magnetic" href="/inregistrare">Începe acum</a>
        <a className="btn btn-ghost magnetic" href="#abonamente">Vezi abonamentele</a>
      </div>
    </div>
  </div>
  <div className="scrollcue"><span>Derulează</span><span className="bar"></span></div>
</section>


<div className="marquee">
  <div className="track" id="mq"></div>
</div>


<section className="section" id="oferta">
  <div className="wrap">
    <div className="sec-head reveal">
      <span className="eyebrow">Ce găsești la Aer</span>
      <h2>Tot ce-ți trebuie ca să te antrenezi serios. Atât.</h2>
    </div>
    <div className="grid-cards">
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><path d="M2 9v6M5 7.5v9M19 7.5v9M22 9v6M5 12h14"/></svg></div><h3>Zonă de forță</h3><p>Greutăți libere și aparate, cu spațiu cât să lucrezi serios. Fără cozi, fără compromis.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><path d="M2 12h4l2.5-6 4 12 2.5-6H22"/></svg></div><h3>Zonă cardio</h3><p>Benzi, biciclete, eliptice. Pentru încălzire, condiție sau ziua de cardio.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><path d="M7 3.5c.9 1 0 2 0 3M12 3.5c.9 1 0 2 0 3M17 3.5c.9 1 0 2 0 3"/><path d="M4 11h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"/></svg></div><h3>Saună & recuperare</h3><p>Saună, dușuri și vestiare. Te refaci ca lumea după ce ai dat tot.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><path d="M5 8h12v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/><path d="M17 9h2.4a2 2 0 0 1 0 4H17"/><path d="M8.5 3c.6.8 0 1.5 0 2.3M12 3c.6.8 0 1.5 0 2.3"/></svg></div><h3>Bar & cafea de specialitate</h3><p>La intrare, în stânga: cafea bună și un loc în care rămâi după antrenament.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3.2"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg></div><h3>Antrenor personal</h3><p>Un plan pe corpul și obiectivul tău, cu cineva lângă tine la fiecare ședință.</p></div></div>
      <div className="card glass sweep reveal"><div><div className="ico"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7h-7"/></svg></div><h3>Acces 24/7 cu cod QR</h3><p>Codul tău în aplicație. Intri singur, oricând — zi sau noapte.</p></div></div>
    </div>
  </div>
</section>


<section className="section" id="acces">
  <div className="wrap feature">
    <div className="reveal">
      <span className="eyebrow">Acces non-stop</span>
      <h2>Sala ta nu se închide niciodată.</h2>
      <p>Te antrenezi când ai timp tu, nu când e deschisă recepția. Deschizi aplicația, scanezi codul la ușă și intri. Codul se schimbă singur la fiecare câteva secunde — al tău, doar al tău.</p>
      <div className="feature-list">
        <div className="fl"><span className="ck">✓</span><span>Intri 24 de ore din 24, în fiecare zi.</span></div>
        <div className="fl"><span className="ck">✓</span><span>Cod QR dinamic — un screenshot vechi nu funcționează.</span></div>
        <div className="fl"><span className="ck">✓</span><span>Fără card de plastic, fără cheie, fără așteptat la rând.</span></div>
      </div>
    </div>
    <div className="qr-card glass sweep reveal">
      <div className="qr" id="qr"></div>
      <div className="qr-meta"><span className="ring"></span> Se reîmprospătează în <b id="qrSec" style={{color: 'var(--ink)'}}>20</b>s</div>
    </div>
  </div>
</section>


<section className="steps-wrap" id="steps">
  <div className="steps-sticky">
    <div className="wrap steps-inner">
      <div className="step-num" id="stepNum">01</div>
      <div>
        <span className="eyebrow">Cum începi</span>
        <div style={{marginTop: '24px'}}>
          <div className="step-item active" data-i="0"><h3>Îți faci cont</h3><p>Online, în câteva secunde. Alegi abonamentul și ești înăuntru.</p></div>
          <div className="step-item" data-i="1"><h3>Primești codul în aplicație</h3><p>Un cod QR care e doar al tău și se schimbă singur, pentru siguranță.</p></div>
          <div className="step-item" data-i="2"><h3>Intri când vrei tu</h3><p>Scanezi la ușă. Non-stop, fără program, fără recepție.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="band">
  <img src="/images/brand.jpg" alt="Atlet Aer" />
  <div className="vile"></div>
  <div className="wrap"><div className="bc reveal">
    <span className="eyebrow">Despre Aer</span>
    <h2>O sală în care contează antrenamentul, nu decorul.</h2>
    <p>Echipament bun, spațiu curat și oameni care îți vor binele — fără atmosfera rece din alte locuri. Vii, te antrenezi, pleci mai bine.</p>
    <a className="btn btn-ghost magnetic" style={{marginTop: '26px'}} href="/sala">Vino să te convingi</a>
  </div></div>
</section>


<section className="section">
  <div className="wrap">
    <div className="sec-head reveal">
      <span className="eyebrow">Cum arată Aer</span>
      <h2>Două niveluri, totul gândit pentru tine.</h2>
      <p>La parter, în dreapta, zona de fitness; în stânga, barul și cafeaua. La etaj, încă o zonă de forță, saună, dușuri și vestiare.</p>
    </div>
    <div className="sala">
      <div className="tile tall reveal"><img src="/images/sala.jpg" alt="Zonă Aer" /><div className="ov"></div><div className="tc"><h3>Parter — zona de fitness</h3><p>Forță și cardio, cu spațiu să lucrezi în voie.</p></div></div>
      <div className="tile glass reveal" style={{background: 'linear-gradient(150deg,var(--navy),#06121a)'}}><div className="ov" style={{background: 'none'}}></div><div className="tc"><h3>Bar & cafea</h3><p>În stânga, la intrare. Pentru înainte și după.</p></div></div>
      <div className="tile glass reveal" style={{background: 'linear-gradient(150deg,#0c2230,#000)'}}><div className="ov" style={{background: 'none'}}></div><div className="tc"><h3>Etaj — saună & vestiare</h3><p>Saună, dușuri și vestiare curate. Recuperare ca la carte.</p></div></div>
    </div>
  </div>
</section>


<section className="section" id="aparate">
  <div className="wrap feature">
    <div className="qr-card glass sweep reveal" style={{alignItems: 'flex-start', textAlign: 'left'}}>
      <div style={{width: '54px', height: '54px', display: 'grid', placeItems: 'center', borderRadius: '14px', background: 'rgba(255,255,255,.04)', border: '1px solid var(--line)'}}><svg viewBox="0 0 24 24" style={{width: '28px', height: '28px', stroke: '#fff', fill: 'none', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round'}}><rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M10 9l5 3-5 3z" fill="#fff" stroke="none"/></svg></div>
      <h3 style={{fontFamily: 'var(--fd)', fontSize: '26px'}}>Scanezi → vezi cum se folosește</h3>
      <p className="muted" style={{fontSize: '15px'}}>Fiecare aparat are propriul cod QR. Îl scanezi cu telefonul și ți se deschide pe loc un scurt video care îți arată exact cum se folosește, corect și în siguranță.</p>
    </div>
    <div className="reveal">
      <span className="eyebrow">Ghid aparate</span>
      <h2>Nu e niciun instructor lângă tine? Nicio problemă.</h2>
      <p>Niciodată nu rămâi blocat în fața unui aparat. Scanezi codul, te uiți 30 de secunde, și știi exact ce ai de făcut. Ca și cum ai avea un antrenor în buzunar, pentru fiecare aparat din sală.</p>
    </div>
  </div>
</section>


<section className="section" style={{paddingTop: '0'}}>
  <div className="wrap">
    <div className="stats">
      <div className="stat glass sweep reveal"><div className="v"><span className="count" data-to="24">0</span>/<span className="count" data-to="7">0</span></div><div className="k">Acces non-stop, în fiecare zi</div></div>
      <div className="stat glass sweep reveal"><div className="v"><span className="count" data-to="100">0</span>%</div><div className="k">Acces din aplicație, cu cod QR</div></div>
      <div className="stat glass sweep reveal"><div className="v"><span className="count" data-to="1">0</span></div><div className="k">Sală în Târgu Neamț (deocamdată)</div></div>
    </div>
  </div>
</section>


<section className="section" id="app">
  <div className="wrap appsec">
    <div className="reveal">
      <span className="eyebrow">Aplicația Aer SportClub</span>
      <h2>Tot clubul, în telefonul tău.</h2>
      <p className="lead">Codul de acces, abonamentul, plățile și ghidul aparatelor — toate într-un singur loc. Intri cu un tap, plătești din aplicație și te antrenezi fără să stai la coadă.</p>
      <div className="store-badges">
        <a className="store glass sweep">
          <svg className="glyph" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 12.5c-.03-2.6 2.13-3.85 2.22-3.9-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.82 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.47 7.84 1.3 10.41.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.79-.84 3.36-.84 1.56 0 2 .84 3.37.81 1.39-.02 2.27-1.28 3.12-2.55.98-1.46 1.39-2.88 1.41-2.95-.03-.01-2.71-1.04-2.74-4.13M14.6 4.6c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.08 3.18 1.15.09 2.32-.59 3.03-1.46"/></svg>
          <span className="st"><small>Descarcă din</small><b>App Store</b></span>
        </a>
        <a className="store glass sweep">
          <svg className="glyph" viewBox="0 0 24 24"><path d="M3.8 2.1c-.3.2-.5.5-.5 1v17.8c0 .5.2.8.5 1L13 12 3.8 2.1z" fill="#4ec0e3"/><path d="M16.6 8.9 13 12l3.7 3.1 3.8-2.2c.8-.5.8-1.3 0-1.8l-3.8-2.2z" fill="#ffd24c"/><path d="M3.8 2.1 13 12l3.6-3.1L6.4 2.9c-1-.6-1.9-.6-2.6-.8z" fill="#5fd66e"/><path d="M3.8 21.9 13 12l3.6 3.1L6.4 21.1c-1 .6-1.9.6-2.6.8z" fill="#f06a5a"/></svg>
          <span className="st"><small>Disponibil pe</small><b>Google Play</b></span>
        </a>
      </div>
      <p className="muted small" style={{marginTop: '14px'}}>Disponibilă pe iOS și Android.</p>
    </div>

    <div className="phone-stage">
      <div className="phone-glow"></div>
      <div className="phone-float">
        <div className="app-phone" id="appPhone">
          <div className="island"></div>
          <div className="app-screen">
            <div className="ap-top">
              <div><span className="muted" style={{fontSize: '11px'}}>Bună dimineața,</span><div className="fd">Alex</div></div>
              <div className="ap-av">AP</div>
            </div>
            <div className="ap-access">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span className="eyebrow" style={{fontSize: '9px', color: '#bcd9e8'}}>Acces sală</span>
                <span className="ap-live">● Deschis · 24/7</span>
              </div>
              <div className="ap-qr" id="appqr"></div>
              <div className="muted" style={{fontSize: '10px', textAlign: 'center', marginTop: '7px'}}>Scanează la intrare</div>
            </div>
            <div className="ap-row">
              <div className="ap-mini"><span className="muted" style={{fontSize: '10px'}}>Abonament</span><div className="fd">Full · activ</div></div>
              <div className="ap-mini"><span className="muted" style={{fontSize: '10px'}}>Intrări luna asta</span><div className="fd">14</div></div>
            </div>
            <div className="ap-tabs">
              <div className="ap-tab on"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg></div>
              <div className="ap-tab"><svg viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.3"/></svg></div>
              <div className="ap-tab big"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7h-7"/></svg></div>
              <div className="ap-tab"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/></svg></div>
              <div className="ap-tab"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.3"/><path d="M5.5 20a6.5 6.5 0 0113 0"/></svg></div>
            </div>
          </div>
          <div className="screen-sweep"></div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="section" id="abonamente">
  <div className="wrap">
    <div className="sec-head reveal">
      <span className="eyebrow">Abonamente</span>
      <h2>Prețuri clare, fără surprize.</h2>
      <p>Alege ce ți se potrivește și începe. Fără costuri ascunse, fără contracte capcană.</p>
    </div>
    <div className="plans">
      <div className="plan glass sweep reveal"><span className="tag">Lunar</span><div className="pn">Fitness</div><div className="pd">Acces complet la forță și cardio, oricând, zi sau noapte. Pentru cine se antrenează pe cont propriu.</div><div className="pp">170 <small>RON / lună</small></div><a className="btn btn-ghost magnetic" href="/abonamente">Alege abonament</a></div>
      <div className="plan feat glass sweep reveal"><span className="tag">Cel mai ales</span><div className="pn">Full</div><div className="pd">Acces nelimitat la tot ce e Aer: forță, cardio, saună, vestiare. 24/24, fără restricții de oră.</div><div className="pp">250 <small>RON / lună</small></div><a className="btn btn-primary magnetic" href="/abonamente">Alege abonament</a></div>
      <div className="plan glass sweep reveal"><span className="tag">De probă</span><div className="pn">2 Săptămâni</div><div className="pd">Două săptămâni de acces complet. Ideal ca să încerci sala înainte să te hotărăști.</div><div className="pp">100 <small>RON</small></div><a className="btn btn-ghost magnetic" href="/abonamente">Alege abonament</a></div>
    </div>
    <div style={{textAlign: 'center', marginTop: '34px'}} className="reveal"><a className="btn btn-ghost magnetic" href="/abonamente">Vezi toate abonamentele →</a></div>
  </div>
</section>


<section className="final">
  <div className="reveal">
    <span className="eyebrow">Te așteptăm</span>
    <h2>Treci pragul o dată.</h2>
    <p>Dacă nu te convinge, n-ai pierdut nimic. Dacă te convinge, ai găsit sala în care rămâi.</p>
    <a className="btn btn-primary magnetic" style={{marginTop: '32px', padding: '15px 32px'}} href="/inregistrare">Creează cont</a>
  </div>
</section>

      <HomeEffects />
      <Hero3D />
    </>
  );
}