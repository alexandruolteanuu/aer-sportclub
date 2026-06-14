import Reveals from "../Reveals";

export default function Cookies() {
  return (
    <>
<section className="page-head">
  <div className="wrap">
    <span className="eyebrow">Aer SportClub</span>
    <h1 className="reveal" style={{opacity: '1', transform: 'none'}}>Politica de cookies</h1>
    <p className="ph-sub reveal" style={{opacity: '1', transform: 'none'}}>Ce sunt cookie-urile și cum le folosim pe site-ul Aer SportClub.</p>
  </div>
</section>

<section className="section" style={{paddingTop: '30px'}}>
  <div className="wrap legal">
    <p className="legal-upd reveal">Ultima actualizare: [completează data] · Document-model, needefinitivat juridic.</p>
    <div className="legal-block reveal">
      <h2>1. Ce sunt cookie-urile</h2>
      <p>Cookie-urile sunt fișiere mici salvate în browserul tău care ajută site-ul să funcționeze și să-și amintească anumite informații (ex. că ești autentificat).</p>
    </div>
    <div className="legal-block reveal">
      <h2>2. Ce tipuri folosim</h2>
      <p>Cookie-uri strict necesare: pentru autentificare și funcționarea de bază a contului (acestea nu pot fi dezactivate, fiind esențiale). [Dacă vei adăuga analytics sau marketing, descrie-le aici și cere consimțământ.]</p>
    </div>
    <div className="legal-block reveal">
      <h2>3. Gestionarea cookie-urilor</h2>
      <p>Poți controla și șterge cookie-urile din setările browserului tău. Dezactivarea cookie-urilor strict necesare poate face ca anumite funcții (ex. autentificarea) să nu mai funcționeze.</p>
    </div>
    <div className="legal-block reveal">
      <h2>4. Modificări</h2>
      <p>Putem actualiza această politică pe măsură ce adăugăm funcții noi. Data ultimei actualizări apare mai sus.</p>
    </div>
    <div className="legal-block reveal">
      <h2>5. Contact</h2>
      <p>Întrebări despre cookie-uri? Scrie-ne la contact@aersportclub.ro.</p>
    </div>
  </div>
</section>

      <Reveals />
    </>
  );
}