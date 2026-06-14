import Reveals from "../Reveals";

export default function Termeni() {
  return (
    <>
<section className="page-head">
  <div className="wrap">
    <span className="eyebrow">Aer SportClub</span>
    <h1 className="reveal" style={{opacity: '1', transform: 'none'}}>Termeni și condiții</h1>
    <p className="ph-sub reveal" style={{opacity: '1', transform: 'none'}}>Regulile de folosire a site-ului, a aplicației și a serviciilor Aer SportClub.</p>
  </div>
</section>

<section className="section" style={{paddingTop: '30px'}}>
  <div className="wrap legal">
    <p className="legal-upd reveal">Ultima actualizare: [completează data] · Document-model, needefinitivat juridic.</p>
    <div className="legal-block reveal">
      <h2>1. Cine suntem</h2>
      <p>Acest site și aplicația sunt operate de [denumirea firmei], cu sediul în [adresă], CUI [cod], denumită în continuare „Aer SportClub”. Date de contact: contact@aersportclub.ro.</p>
    </div>
    <div className="legal-block reveal">
      <h2>2. Acceptarea termenilor</h2>
      <p>Prin crearea unui cont, achiziționarea unui abonament sau folosirea serviciilor, ești de acord cu acești termeni. Dacă nu ești de acord, te rugăm să nu folosești serviciile.</p>
    </div>
    <div className="legal-block reveal">
      <h2>3. Contul tău</h2>
      <p>Ești responsabil pentru păstrarea în siguranță a datelor de autentificare. Codul de acces din aplicație este personal și nu trebuie împărtășit altor persoane. Folosirea abuzivă poate duce la suspendarea accesului.</p>
    </div>
    <div className="legal-block reveal">
      <h2>4. Abonamente și acces</h2>
      <p>Accesul în sală se face pe baza unui abonament activ și a codului QR generat în aplicație. Abonamentele și prețurile sunt cele afișate pe pagina Abonamente. Aer SportClub își rezervă dreptul de a modifica prețurile, cu informarea prealabilă a membrilor.</p>
    </div>
    <div className="legal-block reveal">
      <h2>5. Plăți</h2>
      <p>Plata se poate face online cu cardul, prin procesatorul de plăți [Stripe], sau la recepția sălii. La plata cu cardul, accesul se activează după confirmarea plății. La plata la recepție, accesul se activează după confirmarea plății de către personal.</p>
    </div>
    <div className="legal-block reveal">
      <h2>6. Anulare și rambursare</h2>
      <p>Politica de anulare, prelungire și rambursare este descrisă în cont și/sau la recepție. [Completează aici politica exactă de retur conform legislației în vigoare.]</p>
    </div>
    <div className="legal-block reveal">
      <h2>7. Reguli de comportament în sală</h2>
      <p>Membrii sunt obligați să respecte regulamentul intern al sălii, să folosească echipamentele corect și în siguranță, și să aibă un comportament civilizat față de ceilalți. Nerespectarea poate duce la suspendarea accesului.</p>
    </div>
    <div className="legal-block reveal">
      <h2>8. Limitarea răspunderii</h2>
      <p>Antrenamentul se desfășoară pe propria răspundere. Recomandăm consultarea unui medic înainte de a începe un program de antrenament. [Completează clauzele de răspundere verificate juridic.]</p>
    </div>
    <div className="legal-block reveal">
      <h2>9. Modificări</h2>
      <p>Acești termeni pot fi actualizați. Versiunea curentă este cea publicată pe această pagină, cu data ultimei actualizări de mai sus.</p>
    </div>
    <div className="legal-block reveal">
      <h2>10. Contact</h2>
      <p>Pentru orice întrebare legată de acești termeni, scrie-ne la contact@aersportclub.ro.</p>
    </div>
  </div>
</section>

      <Reveals />
    </>
  );
}