"use client"; // grafică 3D, rulează în browser

import { useEffect } from "react";
import * as THREE from "three";

export default function Hero3D() {
  useEffect(() => {
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches || window.innerWidth < 760;
    const canvas = document.getElementById("hero3d");
    if (!canvas || RM || isTouch) return; // pe mobil / reduced-motion sărim 3D-ul

    let raf = null;
    try {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
      cam.position.set(0, 0, 9);

      // forma literei "A" din coordonatele logo-ului
      const pts = [[102, 0], [200, 0], [302, 310], [220, 310], [151, 96], [82, 310], [0, 310]];
      const shape = new THREE.Shape();
      pts.forEach((p, i) => { const x = (p[0] - 151) / 120, y = -(p[1] - 155) / 120; i ? shape.lineTo(x, y) : shape.moveTo(x, y); });
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.42, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 3 });
      geo.center();

      // mediu de reflexie (ca sticla să reflecte lumina în mișcare)
      const ec = document.createElement("canvas"); ec.width = 512; ec.height = 256;
      const ex = ec.getContext("2d");
      ex.fillStyle = "#0a1822"; ex.fillRect(0, 0, 512, 256);
      let g1 = ex.createRadialGradient(150, 80, 4, 150, 80, 170); g1.addColorStop(0, "rgba(255,244,220,.95)"); g1.addColorStop(1, "rgba(255,244,220,0)"); ex.fillStyle = g1; ex.fillRect(0, 0, 512, 256);
      let g2 = ex.createRadialGradient(380, 175, 4, 380, 175, 185); g2.addColorStop(0, "rgba(120,200,240,.8)"); g2.addColorStop(1, "rgba(120,200,240,0)"); ex.fillStyle = g2; ex.fillRect(0, 0, 512, 256);
      const envTex = new THREE.CanvasTexture(ec); envTex.mapping = THREE.EquirectangularReflectionMapping;

      const mat = new THREE.MeshPhysicalMaterial({ color: 0x234a66, metalness: 0.15, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.05, envMap: envTex, envMapIntensity: 1.25, reflectivity: 0.7 });
      const A = new THREE.Mesh(geo, mat);
      A.scale.set(1.25, 1.25, 1.25);
      A.position.set(3.0, 0.2, 0);
      scene.add(A);

      // lumini (cheia se mută după soare)
      const amb = new THREE.AmbientLight(0xffffff, 0.5); scene.add(amb);
      const key = new THREE.PointLight(0xffd9a8, 90, 60); key.position.set(4, 5, 5); scene.add(key);
      const rim = new THREE.DirectionalLight(0x5fb3d6, 0.8); rim.position.set(-5, -2, 3); scene.add(rim);
      const glint = new THREE.PointLight(0xffffff, 26, 40); glint.position.set(-2.5, 3.5, 6); scene.add(glint);

      // praf de lumină
      const N = 420, pg = new THREE.BufferGeometry(), pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 16; pos[i * 3 + 1] = (Math.random() - 0.5) * 10; pos[i * 3 + 2] = (Math.random() - 0.5) * 8; }
      pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pm = new THREE.PointsMaterial({ color: 0xbfe0f0, size: 0.03, transparent: true, opacity: 0.5 });
      const dust = new THREE.Points(pg, pm); scene.add(dust);

      // lumina cheie urmează ora reală (ca restul paginii)
      function applySunLight() {
        const now = new Date(); const t = now.getHours() + now.getMinutes() / 60;
        const RISE = 6, SET = 20; let elev = 0, x = 0.5;
        if (t >= RISE && t <= SET) { const p = (t - RISE) / (SET - RISE); x = p; elev = Math.sin(p * Math.PI); }
        else { elev = 0; x = t < RISE ? 0.08 : 0.92; }
        let color = elev < 0.06 ? "#5e7fa8" : elev < 0.35 ? "#ff9d5c" : elev < 0.7 ? "#ffcf8f" : "#fff4dc";
        const ang = x * Math.PI;
        key.position.set(Math.cos(Math.PI - ang) * 6, 1 + elev * 6, 4);
        key.color.set(color);
        amb.intensity = 0.55 + elev * 0.35;
      }
      applySunLight();
      const sunTimer = setInterval(applySunLight, 60000);

      let mx = 0, my = 0, scrollY = 0;
      const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
      const onScroll = () => { scrollY = window.scrollY; };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("scroll", onScroll);

      function resize() { renderer.setSize(window.innerWidth, window.innerHeight); cam.aspect = window.innerWidth / window.innerHeight; cam.updateProjectionMatrix(); }
      resize();
      window.addEventListener("resize", resize);

      function loop() {
        raf = requestAnimationFrame(loop);
        A.rotation.y += 0.004;
        A.rotation.x = my * 0.4 + scrollY * 0.0004;
        A.rotation.z = mx * 0.15;
        A.position.y = 0.2 - scrollY * 0.002;
        dust.rotation.y += 0.0006;
        cam.position.x += (mx * 0.8 - cam.position.x) * 0.04;
        cam.lookAt(2.4, 0, 0);
        renderer.render(scene, cam);
      }
      loop();

      // oprește randarea când hero-ul nu e vizibil (performanță)
      const heroEl = document.querySelector(".hero");
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) { if (!raf) loop(); } else { cancelAnimationFrame(raf); raf = null; } });
      });
      if (heroEl) io.observe(heroEl);

      // curățenie
      return () => {
        clearInterval(sunTimer);
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", resize);
        io.disconnect();
        renderer.dispose();
        geo.dispose();
      };
    } catch (e) {
      if (raf) cancelAnimationFrame(raf); // dacă WebGL nu merge, hero-ul rămâne perfect fără 3D
    }
  }, []);

  return null;
}