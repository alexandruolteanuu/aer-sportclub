import AbonamenteEffects from "./AbonamenteEffects";

export default function Abonamente() {
  return (
    <>

<section className="page-head">
  <div className="wrap">
    <span className="eyebrow">Aer SportClub</span>
    <h1 className="reveal" style={{opacity: '1', transform: 'none'}}>Abonamente</h1>
    <p className="ph-sub reveal" style={{opacity: '1', transform: 'none'}}>Alege planul care ți se potrivește. Plătești cu cardul și intri pe loc, sau rezervi acum și achiți la recepție. Acces non-stop, 24/7.</p>
    <div className="howpay">
      <span className="chip"><span className="d"></span><b>Card online</b> — acces instant</span>
      <span className="chip"><span className="d"></span><b>Plată la recepție</b> — achiți la sală</span>
      <span className="chip"><span className="d"></span><b>Non-stop</b> — 24/7</span>
    </div>
  </div>
</section>


<section className="section" style={{padding: '8px 0 110px'}}>
  <div className="wrap">
  <div className="grp">
    <div className="grp-head reveal"><h2>Abonamente lunare</h2><span>Plătești lunar, te antrenezi non-stop.</span></div>
    <div className="plans">
<div className="plan-badge-wrap reveal">
  <span className="badge-pop">Popular</span>
  <div className="plan glass sweep feat">
    <span className="tag">LUNAR</span>
    <div className="pn">Full</div>
    <div className="pp">250 <small>lei / lună</small></div>
    <div className="pd">Acces complet, non-stop, la toată sala.</div>
    <ul className="pfeat"><li><i>✓</i> Fitness + cardio</li><li><i>✓</i> Saună, dușuri, vestiare</li><li><i>✓</i> Acces 24/7 cu cod QR</li></ul>
    <button className="btn btn-primary magnetic" data-plan="Full" data-price="250 lei / lună">Alege Full</button>
  </div>
</div>
<div className="plan glass sweep reveal">
  <span className="tag">LUNAR</span>
  <div className="pn">Fitness</div>
  <div className="pp">170 <small>lei / lună</small></div>
  <div className="pd">Acces la zona de fitness și cardio.</div>
  <ul className="pfeat"><li><i>✓</i> Fitness + cardio</li><li><i>✓</i> Vestiare & dușuri</li><li><i>✓</i> Acces 24/7</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="Fitness" data-price="170 lei / lună">Alege</button>
</div>
<div className="plan glass sweep reveal">
  <span className="tag">LUNAR</span>
  <div className="pn">Elevi</div>
  <div className="pp">160 <small>lei / lună</small></div><div className="pnote">Necesită legitimație</div>
  <div className="pd">Pentru elevi și studenți, cu legitimație.</div>
  <ul className="pfeat"><li><i>✓</i> Acces fitness + cardio</li><li><i>✓</i> Tarif redus</li><li><i>✓</i> Acces 24/7</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="Elevi" data-price="160 lei / lună">Alege</button>
</div>
<div className="plan glass sweep reveal">
  <span className="tag">LUNAR</span>
  <div className="pn">M.A.I.</div>
  <div className="pp">160 <small>lei / lună</small></div><div className="pnote">Necesită legitimație</div>
  <div className="pd">Tarif special pentru angajații M.A.I.</div>
  <ul className="pfeat"><li><i>✓</i> Acces complet</li><li><i>✓</i> Tarif special</li><li><i>✓</i> Acces 24/7</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="M.A.I." data-price="160 lei / lună">Alege</button>
</div>
<div className="plan glass sweep reveal">
  <span className="tag">LUNAR</span>
  <div className="pn">Family</div>
  <div className="pp">320 <small>lei / lună</small></div><div className="pnote">Pentru 2 persoane</div>
  <div className="pd">Un abonament pentru 2 persoane din aceeași familie.</div>
  <ul className="pfeat"><li><i>✓</i> 2 persoane</li><li><i>✓</i> Acces complet fiecare</li><li><i>✓</i> Acces 24/7</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="Family" data-price="320 lei / lună">Alege</button>
</div>
    </div>
  </div>
  <div className="grp">
    <div className="grp-head reveal"><h2>Pe perioadă</h2><span>Plătești o dată, mai avantajos.</span></div>
    <div className="plans">
<div className="plan glass sweep reveal">
  <span className="tag">PACHET</span>
  <div className="pn">3 luni</div>
  <div className="pp">420 <small>lei</small></div><div className="pnote">≈ 140 lei / lună</div>
  <div className="pd">Plătești o dată, te antrenezi 3 luni.</div>
  <ul className="pfeat"><li><i>✓</i> Acces complet</li><li><i>✓</i> Non-stop 24/7</li><li><i>✓</i> Economisești față de lunar</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="3 luni" data-price="420 lei · 3 luni">Alege</button>
</div>
<div className="plan glass sweep reveal">
  <span className="tag">PACHET</span>
  <div className="pn">6 luni</div>
  <div className="pp">720 <small>lei</small></div><div className="pnote">≈ 120 lei / lună</div>
  <div className="pd">Șase luni de acces complet.</div>
  <ul className="pfeat"><li><i>✓</i> Acces complet</li><li><i>✓</i> Non-stop 24/7</li><li><i>✓</i> Preț mai bun pe lună</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="6 luni" data-price="720 lei · 6 luni">Alege</button>
</div>
<div className="plan-badge-wrap reveal">
  <span className="badge-pop">Cel mai bun preț</span>
  <div className="plan glass sweep feat">
    <span className="tag">PACHET</span>
    <div className="pn">12 luni</div>
    <div className="pp">1200 <small>lei</small></div><div className="pnote">≈ 100 lei / lună</div>
    <div className="pd">Un an întreg — cel mai mic cost pe lună.</div>
    <ul className="pfeat"><li><i>✓</i> Acces complet</li><li><i>✓</i> Non-stop 24/7</li><li><i>✓</i> Cel mai mic cost lunar</li></ul>
    <button className="btn btn-primary magnetic" data-plan="12 luni" data-price="1200 lei · 12 luni">Alege</button>
  </div>
</div>
    </div>
  </div>
  <div className="grp">
    <div className="grp-head reveal"><h2>Acces ocazional</h2><span>Pentru intrări scurte sau de probă.</span></div>
    <div className="plans">
<div className="plan glass sweep reveal">
  <span className="tag">ACCES</span>
  <div className="pn">O ședință</div>
  <div className="pp">35 <small>lei</small></div>
  <div className="pd">O singură intrare, fără abonament.</div>
  <ul className="pfeat"><li><i>✓</i> 1 intrare</li><li><i>✓</i> Acces la toată sala</li><li><i>✓</i> Valabil o zi</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="O ședință" data-price="35 lei · o ședință">Alege</button>
</div>
<div className="plan glass sweep reveal">
  <span className="tag">ACCES</span>
  <div className="pn">2 Săptămâni</div>
  <div className="pp">100 <small>lei</small></div>
  <div className="pd">Acces 14 zile — perfect pentru test sau perioade scurte.</div>
  <ul className="pfeat"><li><i>✓</i> 14 zile acces</li><li><i>✓</i> Acces complet</li><li><i>✓</i> Non-stop 24/7</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="2 Săptămâni" data-price="100 lei · 2 săptămâni">Alege</button>
</div>
<div className="plan glass sweep reveal">
  <span className="tag">ACCES</span>
  <div className="pn">Card acces</div>
  <div className="pp">10 <small>lei</small></div>
  <div className="pd">Taxă unică la prima înscriere, pentru cardul de acces.</div>
  <ul className="pfeat"><li><i>✓</i> Plată unică, o singură dată</li><li><i>✓</i> Card fizic de rezervă</li><li><i>✓</i> Pe lângă codul din aplicație</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="Card acces" data-price="10 lei · card acces">Adaugă</button>
</div>
    </div>
  </div>
  <div className="grp">
    <div className="grp-head reveal"><h2>Antrenor personal</h2><span>Ședințe 1-la-1 cu un antrenor dedicat.</span></div>
    <div className="plans">
<div className="plan glass sweep reveal">
  <span className="tag">PERSONAL</span>
  <div className="pn">Antrenor 8 ședințe</div>
  <div className="pp">500 <small>lei</small></div>
  <div className="pd">8 ședințe 1-la-1 cu antrenor personal.</div>
  <ul className="pfeat"><li><i>✓</i> 8 ședințe</li><li><i>✓</i> Program personalizat</li><li><i>✓</i> Antrenor dedicat</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="Antrenor 8 ședințe" data-price="500 lei · 8 ședințe">Alege</button>
</div>
<div className="plan glass sweep reveal">
  <span className="tag">PERSONAL</span>
  <div className="pn">Antrenor 12 ședințe</div>
  <div className="pp">700 <small>lei</small></div>
  <div className="pd">12 ședințe 1-la-1, cel mai bun raport.</div>
  <ul className="pfeat"><li><i>✓</i> 12 ședințe</li><li><i>✓</i> Plan complet</li><li><i>✓</i> Preț mai bun per ședință</li></ul>
  <button className="btn btn-ghost magnetic" data-plan="Antrenor 12 ședințe" data-price="700 lei · 12 ședințe">Alege</button>
</div>
    </div>
  </div>
    <p className="muted" style={{fontSize: '13px', marginTop: '40px'}}>Prețurile sunt în lei (RON). Abonamentele lunare se reînnoiesc lună de lună; le poți schimba sau anula oricând din contul tău.</p>
  </div>
</section>


<div className="modal" id="checkout">
  <div className="modal-bg"></div>
  <div className="modal-card glass">
    <button className="mclose" aria-label="Închide">×</button>
    <span className="eyebrow">Finalizare</span>
    <h3>Alege cum plătești</h3>
    <div className="co-sum">
      <div><div className="cn" id="coName">Full</div><div className="muted" style={{fontSize: '13px'}}>Abonamentul ales</div></div>
      <div className="cp" id="coPrice">250 lei / lună</div>
    </div>
    <div className="pay-opt">
      <div className="pay sel" data-method="card">
        <div className="radio"></div>
        <div><div className="pt">Card online</div><div className="ps">Plătești acum, în siguranță. Accesul se activează instant.</div></div>
      </div>
      <div className="pay" data-method="receptie">
        <div className="radio"></div>
        <div><div className="pt">Plată la recepție</div><div className="ps">Rezervi acum, achiți cash sau card la sală. Accesul se activează după confirmare.</div></div>
      </div>
    </div>
    <div className="co-note">Pentru a finaliza ai nevoie de un cont — îl creezi în pasul următor dacă nu ai deja.</div>
    <button className="btn btn-primary magnetic" id="coContinue" style={{width: '100%', marginTop: '8px', padding: '14px'}}>Continuă</button>
    <div className="co-result" id="coResult"></div>
  </div>
</div>

      <AbonamenteEffects />
    </>
  );
}