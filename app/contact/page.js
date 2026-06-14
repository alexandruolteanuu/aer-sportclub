import ContactEffects from "./ContactEffects";

export default function Contact() {
  return (
    <>
<section className="page-head">
  <div className="wrap">
    <span className="eyebrow">Aer SportClub</span>
    <h1 className="reveal" style={{opacity: '1', transform: 'none'}}>Contact</h1>
    <p className="ph-sub reveal" style={{opacity: '1', transform: 'none'}}>Ai o întrebare despre abonamente, acces sau sală? Scrie-ne — îți răspundem cât putem de repede.</p>
    <div className="howpay">
      <span className="chip"><span className="d"></span><b>Non-stop</b> — 24/7</span>
      <span className="chip"><span className="d"></span><b>Târgu Neamț</b></span>
    </div>
  </div>
</section>

<section className="section" id="contact-main" style={{paddingTop: '40px'}}>
  <div className="wrap feature">
    <div className="reveal">
      <span className="eyebrow">Trimite-ne un mesaj</span>
      <h2>Hai să vorbim.</h2>
      <p>Completează formularul și revenim cu un răspuns pe email. Pentru lucruri rapide, ne găsești și direct la datele din dreapta.</p>

      <div className="cform">
        <div className="field">
          <label htmlFor="cf-nume">Nume</label>
          <input id="cf-nume" type="text" placeholder="Numele tău" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" type="email" placeholder="adresa@email.ro" />
        </div>
        <div className="field">
          <label htmlFor="cf-mesaj">Mesaj</label>
          <textarea id="cf-mesaj" rows="5" placeholder="Cu ce te putem ajuta?"></textarea>
        </div>
        <button className="btn btn-primary magnetic" id="cf-send" style={{width: '100%', padding: '14px'}}>Trimite mesajul</button>
        <div className="cform-result" id="cf-result"></div>
      </div>
    </div>

    <div className="reveal">
      <div className="contact-card glass sweep">
        <span className="eyebrow">Date de contact</span>
        <div className="ci"><span className="ci-k">Email</span><span className="ci-v">contact@aersportclub.ro</span></div>
        <div className="ci"><span className="ci-k">Telefon</span><span className="ci-v">07xx xxx xxx · în curând</span></div>
        <div className="ci"><span className="ci-k">Locație</span><span className="ci-v">Târgu Neamț · adresa în curând</span></div>
        <div className="ci"><span className="ci-k">Program</span><span className="ci-v">Deschis non-stop, 24/7</span></div>
      </div>
    </div>
  </div>
</section>

<section className="section" id="faq" style={{paddingTop: '0'}}>
  <div className="wrap">
    <div className="sec-head reveal">
      <span className="eyebrow">Întrebări frecvente</span>
      <h2>Răspunsuri rapide.</h2>
    </div>
    <div className="faq">
      <div className="faq-item glass reveal"><h3>Cum intru în sală?</h3><p>Îți faci cont, alegi un abonament și primești în aplicație un cod QR. Îl scanezi la ușă și intri — oricând, non-stop.</p></div>
      <div className="faq-item glass reveal"><h3>Pot plăti la sală?</h3><p>Da. Poți plăti online cu cardul (acces instant) sau alegi „plată la recepție" și achiți cash ori card la sală.</p></div>
      <div className="faq-item glass reveal"><h3>Pot anula sau schimba abonamentul?</h3><p>Da, din contul tău — îl poți prelungi, schimba sau anula oricând, fără contracte capcană.</p></div>
      <div className="faq-item glass reveal"><h3>Sala chiar e deschisă non-stop?</h3><p>Da, 24 de ore din 24, în fiecare zi. Te antrenezi la ora care ți se potrivește ție.</p></div>
    </div>
  </div>
</section>

<section className="final">
  <div className="reveal">
    <span className="eyebrow">Te așteptăm</span>
    <h2>Gata să începi?</h2>
    <p>Alege un abonament și intră. Te așteptăm la Aer.</p>
    <a className="btn btn-primary magnetic" style={{marginTop: '32px', padding: '15px 32px'}} href="/abonamente">Alege abonament</a>
  </div>
</section>

      <ContactEffects />
    </>
  );
}