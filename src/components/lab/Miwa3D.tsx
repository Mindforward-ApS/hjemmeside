"use client";

// Marco 2026-11-21: Miwa as a real-time 3D figure in the hero. The model is the Meshy build of her (A-pose, 311k faces
// reduced for the web copy), rigged with a 24-bone skeleton, with twelve full-body clips assembled in Blender
// (idle, look around, sway, two waves, shrug, two talking gestures, three walks, run). Here she lives on her own:
// she idles, and every few seconds does a gesture. Drag to turn her, click her and she waves.
// three.js is loaded only in the browser and only when this component mounts, so the rest of the page does not pay for it.
// The skeleton has no fingers and no face bones: hands and face stay as modelled.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MODEL = "/model/miwa.glb";
const BASE = /^(idle|happy sway|short breathe)/i; // calm clips she rests in
const TRAVEL = /walk|run/i; // played on the spot; not used in the hero loop
const ONCE = /wave|shrug|hello/i;

export function Miwa3D() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const poke = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let stop = false;
    let cleanup = () => {};
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
      if (stop) return;

      const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.8;
      const key = new THREE.DirectionalLight(0xfff1e6, 2.2);
      key.position.set(1.6, 3.2, 2.6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xe8664a, 1.4); // the hero's coral, from behind
      rim.position.set(-2.2, 1.8, -2.4);
      scene.add(rim);

      const camera = new THREE.PerspectiveCamera(26, 1, 0.05, 50);
      const pivot = new THREE.Group(); // turned by dragging
      scene.add(pivot);

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);
      let gltf;
      try {
        gltf = await loader.loadAsync(MODEL);
      } catch {
        if (!stop) setFailed(true);
        ro.disconnect(); renderer.dispose(); pmrem.dispose();
        return;
      }
      if (stop) { ro.disconnect(); renderer.dispose(); pmrem.dispose(); return; }

      const root = gltf.scene;
      pivot.add(root);
      let hips: import("three").Object3D | null = null;
      root.traverse((o) => {
        const m = o as import("three").SkinnedMesh;
        if (m.isSkinnedMesh) m.frustumCulled = false;
        if ((o as import("three").Bone).isBone && /^hips$/i.test(o.name)) hips = o;
      });
      root.updateMatrixWorld(true);
      const box = new THREE.Box3(), p = new THREE.Vector3();
      root.traverse((o) => { if ((o as import("three").Bone).isBone) { o.getWorldPosition(p); box.expandByPoint(p); } });
      const floor = box.min.y - (box.max.y - box.min.y) * 0.035; // soles sit a little under the toe bones
      const height = (box.max.y - floor) * 1.1; // bones stop at the crown; hair bun and pencil sit above
      // Frame her whole body with a little air above the pencil; feet on the bottom edge of the canvas.
      const dist = (height * 1.06) / (2 * Math.tan((camera.fov * Math.PI) / 360));
      camera.position.set(0, floor + height * 0.5, dist);
      camera.lookAt(0, floor + height * 0.5, 0);

      const rest = hips ? (hips as import("three").Object3D).position.clone() : new THREE.Vector3();
      const mixer = new THREE.AnimationMixer(root);
      const actions: Record<string, import("three").AnimationAction> = {};
      for (const clip of gltf.animations) {
        // Keep her on her spot: walks are flattened, other clips only lose their starting offset.
        const travel = TRAVEL.test(clip.name);
        for (const t of clip.tracks) {
          if (!/hips\.position$/i.test(t.name)) continue;
          const v = t.values, x0 = v[0], z0 = v[2];
          for (let i = 0; i < v.length; i += 3) {
            v[i] = travel ? rest.x : v[i] - x0 + rest.x;
            v[i + 2] = travel ? rest.z : v[i + 2] - z0 + rest.z;
          }
        }
        actions[clip.name] = mixer.clipAction(clip);
      }
      const names = Object.keys(actions);
      const bases = names.filter((n) => BASE.test(n));
      const gestures = names.filter((n) => !BASE.test(n) && !TRAVEL.test(n));
      let current: import("three").AnimationAction | null = null;
      let timer = 0;

      const play = (name: string, fade = 0.5) => {
        const next = actions[name];
        if (!next || next === current) return;
        next.reset();
        next.setLoop(ONCE.test(name) ? THREE.LoopOnce : THREE.LoopRepeat, ONCE.test(name) ? 1 : Infinity);
        next.clampWhenFinished = true;
        next.play();
        if (current) current.crossFadeTo(next, fade, true); else next.fadeIn(0);
        current = next;
        const d = next.getClip().duration;
        timer = BASE.test(name) ? Math.min(Math.max(d, 4), 7) : d;
      };
      const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)];
      const next = () => {
        const wasBase = current ? BASE.test(current.getClip().name) : false;
        play(pick(wasBase && gestures.length ? gestures : bases.length ? bases : names));
      };
      poke.current = () => play(pick(names.filter((n) => /wave/i.test(n))) ?? pick(gestures), 0.3);

      // Drag to turn her; she eases back to face the reader when let go.
      let dragging = false, lastX = 0, target = 0;
      const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; el.setPointerCapture(e.pointerId); };
      const move = (e: PointerEvent) => { if (!dragging) return; target += (e.clientX - lastX) * 0.01; lastX = e.clientX; };
      const up = () => { dragging = false; };
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);

      // Only render while she is on screen and the tab is visible.
      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(el);

      const clock = new THREE.Clock();
      play(bases.find((n) => /^idle$/i.test(n)) ?? bases[0] ?? names[0], 0);
      if (reduce) { mixer.update(0.5); } // one calm pose, no motion
      resize();
      renderer.setAnimationLoop(() => {
        const dt = Math.min(clock.getDelta(), 0.1);
        if (!visible || document.hidden) return;
        if (!reduce) {
          mixer.update(dt);
          timer -= dt;
          if (timer <= 0) next();
        }
        if (!dragging) target *= 1 - Math.min(dt * 1.5, 1);
        pivot.rotation.y += (target - pivot.rotation.y) * Math.min(dt * 8, 1);
        renderer.render(scene, camera);
      });
      setReady(true);

      cleanup = () => {
        renderer.setAnimationLoop(null);
        ro.disconnect(); io.disconnect();
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        mixer.stopAllAction();
        root.traverse((o) => {
          const m = o as import("three").Mesh;
          if (!m.isMesh) return;
          m.geometry.dispose();
          const mat = m.material as import("three").MeshStandardMaterial;
          mat.map?.dispose(); mat.normalMap?.dispose(); mat.roughnessMap?.dispose(); mat.metalnessMap?.dispose(); mat.dispose();
        });
        scene.environment?.dispose(); pmrem.dispose(); renderer.dispose();
      };
    })();

    return () => { stop = true; poke.current = null; cleanup(); };
  }, []);

  return (
    <div className="relative mx-auto flex h-[min(78svh,46rem)] w-full max-w-[34rem] items-end justify-center lg:mr-0 lg:h-[calc(100svh-13rem)] lg:max-w-none">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] aspect-square w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(232,102,74,0.42), rgba(232,102,74,0.16) 45%, transparent 72%)" }} />
      <div aria-hidden className="pointer-events-none absolute bottom-[-1.5%] left-1/2 h-[6%] w-[60%] -translate-x-1/2 rounded-[50%] blur-md" style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.7), transparent)" }} />
      <div data-hero-person className="relative h-full" style={{ aspectRatio: "3 / 5", maxWidth: "100%" }}>
        {/* The still shows until the model is in (and stays if WebGL or the download fails). */}
        {!ready && (
          <Image src="/img/miwa/miwa-velkommen.webp" alt="Miwa, Mindforwards AI-tutor" width={876} height={1466} priority sizes="(min-width:1024px) 40vw, 90vw" className="absolute inset-0 size-full object-contain object-bottom" />
        )}
        {!failed && (
          <canvas
            ref={canvas}
            role="img"
            aria-label="Miwa, Mindforwards AI-tutor, i 3D. Træk for at dreje hende, klik for at få et vink."
            onClick={() => poke.current?.()}
            className="absolute inset-0 size-full cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 400ms ease" }}
          />
        )}
      </div>
    </div>
  );
}
