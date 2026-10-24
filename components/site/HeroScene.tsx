"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from "three";

const INDIGO = new Color("#0b5faa");
const VIOLET = new Color("#178bd2");
const X_BLUE = new Color("#43b4ff");

// Soft round sprite so points don't render as hard squares.
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Desktop-only: the hero visual column is hidden below lg.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    // Far enough back that the orbit ring (r ~3.5) stays fully inside the frame.
    camera.position.set(0, 0, 12.5);

    const root = new Group();
    scene.add(root);

    // Core lattice
    const ico = new IcosahedronGeometry(2.4, 1);
    const edges = new EdgesGeometry(ico);
    const lattice = new LineSegments(
      edges,
      new LineBasicMaterial({ color: INDIGO, transparent: true, opacity: 0.38 }),
    );
    root.add(lattice);

    // Inner counter-rotating shell
    const innerGeo = new EdgesGeometry(new IcosahedronGeometry(1.3, 0));
    const inner = new LineSegments(
      innerGeo,
      new LineBasicMaterial({ color: X_BLUE, transparent: true, opacity: 0.55 }),
    );
    root.add(inner);

    const map = new CanvasTexture(makeDotTexture());

    // Vertex nodes on the lattice
    const nodes = new Points(
      ico,
      new PointsMaterial({
        color: VIOLET,
        size: 0.16,
        map,
        transparent: true,
        depthWrite: false,
        opacity: 0.95,
        sizeAttenuation: true,
      }),
    );
    root.add(nodes);

    // Orbit ring of particles
    const ringCount = 140;
    const ringPositions = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const a = (i / ringCount) * Math.PI * 2;
      const r = 3.25 + (Math.sin(i * 12.9898) * 0.5 + 0.5) * 0.25;
      ringPositions[i * 3] = Math.cos(a) * r;
      ringPositions[i * 3 + 1] = (Math.sin(i * 78.233) * 0.5) * 0.12;
      ringPositions[i * 3 + 2] = Math.sin(a) * r;
    }
    const ringGeo = new BufferGeometry();
    ringGeo.setAttribute("position", new BufferAttribute(ringPositions, 3));
    const ring = new Points(
      ringGeo,
      new PointsMaterial({
        color: X_BLUE,
        size: 0.07,
        map,
        transparent: true,
        depthWrite: false,
        opacity: 0.8,
        blending: AdditiveBlending,
      }),
    );
    const orbit = new Group();
    orbit.rotation.set(1.18, 0.2, -0.32);
    orbit.add(ring);

    const torusGeo = new TorusGeometry(3.3, 0.004, 4, 160);
    const torus = new LineSegments(
      new EdgesGeometry(torusGeo),
      new LineBasicMaterial({ color: INDIGO, transparent: true, opacity: 0.16 }),
    );
    torus.rotation.x = Math.PI / 2;
    orbit.add(torus);
    root.add(orbit);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer parallax (eased)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    if (!reduceMotion) window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let visible = true;
    let last = performance.now();
    let t = 0;

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;

      lattice.rotation.y += dt * 0.12;
      lattice.rotation.x = Math.sin(t * 0.25) * 0.18;
      nodes.rotation.copy(lattice.rotation);
      inner.rotation.y -= dt * 0.22;
      inner.rotation.z += dt * 0.08;
      orbit.rotation.z += dt * 0.05;

      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      root.rotation.y = current.x;
      root.rotation.x = current.y;
      root.position.y = Math.sin(t * 0.6) * 0.08;

      renderer.render(scene, camera);
      if (visible) raf = requestAnimationFrame(render);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      lattice.rotation.set(0.2, 0.5, 0);
      nodes.rotation.copy(lattice.rotation);
      renderer.render(scene, camera);
    } else {
      start();
    }

    const io = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting && !document.hidden;
      if (next === visible) return;
      visible = next;
      if (visible && !reduceMotion) start();
    });
    io.observe(mount);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reduceMotion) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      [ico, edges, innerGeo, ringGeo, torusGeo].forEach((g) => g.dispose());
      scene.traverse((obj) => {
        const material = (obj as LineSegments).material;
        if (material && !Array.isArray(material)) material.dispose();
      });
      map.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="hero-canvas absolute inset-0 pointer-events-none" />;
}
