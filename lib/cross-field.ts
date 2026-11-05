/**
 * Cross field — a cluster of hollow 3-axis crosses that gather at the centre,
 * collide with each other and get pushed around by the pointer.
 *
 * Framework-free on purpose: the hero banner drives it in real time and the
 * reel renderer drives it frame-by-frame with a fixed timestep + seed.
 */
import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  InstancedMesh,
  LatheGeometry,
  Matrix4,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  type BufferGeometry,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export type CrossFieldOptions = {
  count?: number;
  seed?: number;
  pixelRatio?: number;
  preserveDrawingBuffer?: boolean;
  /** Initial spread; larger = pieces fly in from further away. */
  spread?: number;
};

export type CrossField = {
  renderer: WebGLRenderer;
  resize: (width: number, height: number) => void;
  /** Pointer in normalised device coords (-1..1). */
  setPointer: (ndcX: number, ndcY: number, active: boolean) => void;
  /** Move the point the cluster gathers around (world units). */
  setAttractor: (x: number, y: number, z?: number) => void;
  /** Scale the gathering force — 0 lets the pieces drift apart. */
  setGather: (strength: number) => void;
  /** Push every piece outward from the centre. `depth` scales the push toward/away from the camera. */
  burst: (power: number, depth?: number) => void;
  setCamera: (x: number, y: number, z: number) => void;
  step: (dt: number) => void;
  render: () => void;
  dispose: () => void;
};

const PALETTE = [
  { color: "#2f6bff", share: 0.46, roughness: 0.32, metalness: 0.05 }, // brand blue
  { color: "#eef2fb", share: 0.3, roughness: 0.38, metalness: 0.0 }, // white
  { color: "#0b1024", share: 0.24, roughness: 0.26, metalness: 0.25 }, // ink
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One hollow tube with rounded lips, lathed around Y. */
function tubeGeometry(outer: number, inner: number, halfLength: number) {
  const pts: Vector2[] = [];
  const lip = (outer - inner) / 2;
  const mid = (outer + inner) / 2;
  const steps = 8;
  // inner wall, bottom → top
  pts.push(new Vector2(inner, -halfLength + lip));
  pts.push(new Vector2(inner, halfLength - lip));
  // top lip arc (inner → outer)
  for (let i = 0; i <= steps; i++) {
    const a = Math.PI - (i / steps) * Math.PI;
    pts.push(new Vector2(mid + Math.cos(a) * lip, halfLength - lip + Math.sin(a) * lip));
  }
  // outer wall, top → bottom
  pts.push(new Vector2(outer, -halfLength + lip));
  // bottom lip arc (outer → inner)
  for (let i = 0; i <= steps; i++) {
    const a = -(i / steps) * Math.PI;
    pts.push(new Vector2(mid + Math.cos(a) * lip, -halfLength + lip + Math.sin(a) * lip));
  }
  // Lathe faces point outward when the profile climbs on the outside, so flip it.
  return new LatheGeometry(pts.reverse(), 40);
}

function crossGeometry(): BufferGeometry {
  const y = tubeGeometry(0.36, 0.2, 1.05);
  const x = y.clone().rotateZ(Math.PI / 2);
  const z = y.clone().rotateX(Math.PI / 2);
  const merged = mergeGeometries([y, x, z], false)!;
  y.dispose();
  x.dispose();
  z.dispose();
  return merged;
}

type Body = {
  p: Vector3;
  v: Vector3;
  q: Quaternion;
  w: Vector3; // angular velocity
  mesh: number;
  slot: number;
};

export function createCrossField(canvas: HTMLCanvasElement, options: CrossFieldOptions = {}): CrossField {
  const count = options.count ?? 34;
  const rand = mulberry32(options.seed ?? 7);
  const spread = options.spread ?? 7;

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: options.preserveDrawingBuffer ?? false,
  });
  renderer.setPixelRatio(options.pixelRatio ?? 1);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;

  const camera = new PerspectiveCamera(32, 16 / 9, 0.1, 100);
  camera.position.set(0, 0, 24);
  camera.lookAt(0, 0, 0);

  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(6, 10, 12);
  scene.add(key);
  const rim = new DirectionalLight(new Color("#43b4ff"), 2.2);
  rim.position.set(-10, -4, -6);
  scene.add(rim);

  const geometry = crossGeometry();

  // Split the pieces across the palette.
  const counts = PALETTE.map((entry) => Math.round(entry.share * count));
  counts[0] += count - counts.reduce((a, b) => a + b, 0);

  const materials = PALETTE.map(
    (entry) =>
      new MeshPhysicalMaterial({
        color: new Color(entry.color),
        roughness: entry.roughness,
        metalness: entry.metalness,
        clearcoat: 0.6,
        clearcoatRoughness: 0.25,
        envMapIntensity: 0.9,
      }),
  );
  const meshes = materials.map((material, i) => {
    const mesh = new InstancedMesh(geometry, material, Math.max(1, counts[i]));
    mesh.count = counts[i];
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    mesh.frustumCulled = false;
    scene.add(mesh);
    return mesh;
  });

  const bodies: Body[] = [];
  counts.forEach((n, meshIndex) => {
    for (let slot = 0; slot < n; slot++) {
      const dir = new Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize();
      bodies.push({
        p: dir.multiplyScalar(spread * (0.5 + rand() * 0.8)),
        v: new Vector3(),
        q: new Quaternion().setFromAxisAngle(
          new Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(),
          rand() * Math.PI * 2,
        ),
        w: new Vector3((rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6),
        mesh: meshIndex,
        slot,
      });
    }
  });

  const RADIUS = 1.22;
  const attractor = new Vector3();
  let gather = 1;
  const pointerNdc = new Vector2();
  const pointerWorld = new Vector3();
  const pointerPrev = new Vector3();
  let pointerActive = false;
  let pointerVelocity = new Vector3();

  const tmp = new Vector3();
  const tmp2 = new Vector3();
  const dq = new Quaternion();
  const m = new Matrix4();
  const one = new Vector3(1, 1, 1);

  function updatePointerWorld() {
    // project pointer onto the z = 0 plane
    tmp.set(pointerNdc.x, pointerNdc.y, 0.5).unproject(camera).sub(camera.position).normalize();
    const distance = -camera.position.z / tmp.z;
    pointerWorld.copy(camera.position).addScaledVector(tmp, distance);
  }

  function step(dt: number) {
    const h = Math.min(dt, 1 / 30);
    if (pointerActive) {
      pointerPrev.copy(pointerWorld);
      updatePointerWorld();
      pointerVelocity = tmp2.copy(pointerWorld).sub(pointerPrev).divideScalar(Math.max(h, 1e-4)).clone();
    }

    const damping = Math.exp(-h * 2.4);
    const spin = Math.exp(-h * 1.2);

    for (const b of bodies) {
      // gather toward the attractor
      tmp.copy(attractor).sub(b.p);
      b.v.addScaledVector(tmp, h * 2.2 * gather);

      // pointer push
      if (pointerActive) {
        tmp.copy(b.p).sub(pointerWorld);
        tmp.z *= 0.35;
        const d = tmp.length();
        const reach = 3.6;
        if (d < reach && d > 1e-4) {
          const f = (1 - d / reach) * 34;
          b.v.addScaledVector(tmp.normalize(), f * h);
          b.v.addScaledVector(pointerVelocity, h * 0.6 * (1 - d / reach));
          b.w.x += (rand() - 0.5) * f * h * 0.6;
          b.w.y += (rand() - 0.5) * f * h * 0.6;
        }
      }

      b.v.multiplyScalar(damping);
      b.w.multiplyScalar(spin);
    }

    // pairwise collisions (soft)
    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i];
      for (let j = i + 1; j < bodies.length; j++) {
        const b = bodies[j];
        tmp.copy(a.p).sub(b.p);
        const d2 = tmp.lengthSq();
        const min = RADIUS * 2;
        if (d2 < min * min && d2 > 1e-6) {
          const d = Math.sqrt(d2);
          const overlap = (min - d) * 0.5;
          tmp.divideScalar(d);
          a.p.addScaledVector(tmp, overlap);
          b.p.addScaledVector(tmp, -overlap);
          // exchange a little momentum + add spin from the contact
          const rel = tmp2.copy(a.v).sub(b.v).dot(tmp);
          if (rel < 0) {
            a.v.addScaledVector(tmp, -rel * 0.5);
            b.v.addScaledVector(tmp, rel * 0.5);
          }
          a.w.x += tmp.y * overlap * 0.8;
          a.w.y -= tmp.x * overlap * 0.8;
          b.w.x -= tmp.y * overlap * 0.8;
          b.w.y += tmp.x * overlap * 0.8;
        }
      }
    }

    for (const b of bodies) {
      b.p.addScaledVector(b.v, h);
      const angle = b.w.length() * h;
      if (angle > 1e-6) {
        dq.setFromAxisAngle(tmp.copy(b.w).normalize(), angle);
        b.q.premultiply(dq);
      }
      m.compose(b.p, b.q, one);
      meshes[b.mesh].setMatrixAt(b.slot, m);
    }
    for (const mesh of meshes) mesh.instanceMatrix.needsUpdate = true;
  }

  return {
    renderer,
    resize(width, height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(1, height);
      // keep the cluster a similar size on tall/narrow frames
      camera.fov = camera.aspect < 1 ? 50 : 32;
      camera.updateProjectionMatrix();
    },
    setPointer(x, y, active) {
      pointerNdc.set(x, y);
      if (active && !pointerActive) {
        updatePointerWorld();
        pointerPrev.copy(pointerWorld);
      }
      pointerActive = active;
    },
    setAttractor(x, y, z = 0) {
      attractor.set(x, y, z);
    },
    setGather(strength) {
      gather = strength;
    },
    burst(power, depth = 1) {
      for (const b of bodies) {
        tmp.copy(b.p).sub(attractor);
        if (tmp.lengthSq() < 1e-4) tmp.set(rand() - 0.5, rand() - 0.5, rand() - 0.5);
        tmp.normalize();
        tmp.z *= depth;
        b.v.addScaledVector(tmp, power * (0.6 + rand() * 0.8));
        b.w.set((rand() - 0.5) * power, (rand() - 0.5) * power, (rand() - 0.5) * power);
      }
    },
    setCamera(x, y, z) {
      camera.position.set(x, y, z);
      camera.lookAt(0, 0, 0);
    },
    step,
    render() {
      renderer.render(scene, camera);
    },
    dispose() {
      geometry.dispose();
      materials.forEach((material) => material.dispose());
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
