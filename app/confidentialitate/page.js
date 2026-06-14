import Reveals from "../Reveals";

export default function Confidentialitate() {
  return (
    <>
<section className="page-head">
  <div className="wrap">
    <span className="eyebrow">Aer SportClub</span>
    <h1 className="reveal" style={{opacity: '1', transform: 'none'}}>Politica de confidențialitate</h1>
    <p className="ph-sub reveal" style={{opacity: '1', transform: 'none'}}>Cum colectăm, folosim și protejăm datele tale personale, conform GDPR.</p>
  </div>
</section>

<section className="section" style={{paddingTop: '30px'}}>
  <div className="wrap legal">
    <p className="legal-upd reveal">Ultima actualizare: [completează data] · Document-model, needefinitivat juridic.</p>
    <div className="legal-block reveal">
      <h2>1. Operatorul de date</h2>
      <p>Operatorul datelor tale personale este [denumirea firmei], cu sediul în [adresă], CUI [cod]. Pentru orice cerere legată de date, ne contactezi la contact@aersportclub.ro.</p>
    </div>
    <div className="legal-block reveal">
      <h2>2. Ce date colectăm</h2>
      <p>Date de cont: nume, prenume, email, telefon, parolă (stocată criptat). Date despre abonament și plăți. Jurnalul intrărilor în sală (scanările codului QR). Date tehnice minime necesare funcționării (ex. sesiune de autentificare).</p>
    </div>
    <div className="legal-block reveal">
      <h2>3. De ce le folosim</h2>
      <p>Pentru a-ți crea și administra contul, a-ți oferi acces în sală, a procesa plățile, a-ți trimite informări legate de abonament și a respecta obligațiile legale (ex. contabile).</p>
    </div>
    <div className="legal-block reveal">
      <h2>4. Temeiul legal</h2>
      <p>Prelucrăm datele în baza executării contractului (abonamentul tău), a obligațiilor legale și, acolo unde e cazul, a consimțământului tău (ex. comunicări de marketing, pe care le poți retrage oricând).</p>
    </div>
    <div className="legal-block reveal">
      <h2>5. Cu cine le partajăm</h2>
      <p>Cu procesatorul de plăți [Stripe], pentru a procesa plățile (nu stocăm noi datele cardului). Cu furnizori tehnici strict necesari (găzduire, email). Nu vindem datele tale nimănui.</p>
    </div>
    <div className="legal-block reveal">
      <h2>6. Cât timp le păstrăm</h2>
      <p>Păstrăm datele atât cât e necesar pentru furnizarea serviciului și pentru respectarea obligațiilor legale (ex. documente financiare). După aceea, le ștergem sau le anonimizăm.</p>
    </div>
    <div className="legal-block reveal">
      <h2>7. Drepturile tale (GDPR)</h2>
      <p>Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție, precum și dreptul de a-ți retrage consimțământul și de a depune plângere la Autoritatea Națională de Supraveghere (ANSPDCP). Ne scrii la contact@aersportclub.ro.</p>
    </div>
    <div className="legal-block reveal">
      <h2>8. Securitate</h2>
      <p>Folosim măsuri tehnice și organizatorice rezonabile pentru a-ți proteja datele (ex. parole criptate, acces restricționat). Niciun sistem nu e 100% sigur, dar tratăm securitatea cu seriozitate.</p>
    </div>
    <div className="legal-block reveal">
      <h2>9. Modificări</h2>
      <p>Putem actualiza această politică. Data ultimei actualizări apare mai sus.</p>
    </div>
  </div>
</section>

      <Reveals />
    </>
  );
}