"use client"; // rulează în browser (animație 3D)

/*
  Logo-ul „Aer” în 3D pentru hero.
  Tehnica: extrudare în CSS — punem mai multe copii ale siluetei „A” (navy)
  una în spatele alteia (translateZ), formând grosimea 3D, iar pe față punem
  logo-ul complet (A navy + „Aer” alb). Totul se roti(ește) ușor stânga-dreapta.
  Folosește EXACT geometria logo-ului din site (același „A” și „Aer”).
*/

const NUM_LAYERS = 15; // câte „felii” are grosimea 3D

// silueta literei A (doar conturul, navy mai închis — formează corpul 3D)
function Silueta() {
  return (
    <svg viewBox="0 0 320 311" xmlns="http://www.w3.org/2000/svg">
      <path d="M 102 0 L 200 0 L 302 310 L 220 310 L 151 96 L 82 310 L 0 310 Z" fill="#1b3a52" />
    </svg>
  );
}

// fața logo-ului: A navy + chevronul alb + „er” alb (exact ca logo-ul real)
function Fata() {
  return (
    <svg viewBox="0 0 320 311" xmlns="http://www.w3.org/2000/svg">
      <path d="M 102 0 L 200 0 L 302 310 L 220 310 L 151 96 L 82 310 L 0 310 Z" fill="#234a66" />
      <path d="M 128 149 L 154 149 L 178 221 L 157 221 L 141 174 L 125 221 L 104 221 Z" fill="#fff" />
      <text x="184" y="221" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="700" fontSize="86" letterSpacing="-3" fill="#fff">er</text>
    </svg>
  );
}

export default function HeroLogo3D() {
  // construim feliile de adâncime (de la cea mai din spate la cea mai din față)
  const layers = [];
  for (let k = NUM_LAYERS - 1; k >= 0; k--) {
    layers.push(
      <div
        key={k}
        className="logo3d-body"
        style={{
          transform: `translateZ(${-(k + 1) * 1.5}px)`,
          filter: `brightness(${(0.82 - k * 0.022).toFixed(3)})`,
        }}
      >
        <Silueta />
      </div>
    );
  }

  return (
    <div className="logo3d" aria-hidden="true">
      <div className="logo3d-glow"></div>
      <div className="logo3d-rot">
        {layers}
        <div className="logo3d-face">
          <Fata />
        </div>
      </div>
    </div>
  );
}