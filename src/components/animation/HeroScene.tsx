// ---------------------------------------------------------------------------
// HeroScene - Immersive Three.js Hero Background
// ---------------------------------------------------------------------------
// Full-viewport animated scene: dark-to-light gradient sky, wireframe globe,
// animated route lines curving across the viewport, drifting star particles,
// and subtle truck silhouettes moving along paths.
// ---------------------------------------------------------------------------

import { useRef, useEffect } from "react";
import * as THREE from "three";

interface HeroSceneProps {
  color?: string;
}

export default function HeroScene({ color = "#03A9F4" }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current as HTMLDivElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    let width = container.clientWidth;
    let height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const primaryColor = new THREE.Color(color);
    const dimColor = new THREE.Color(color).multiplyScalar(0.4);

    // -----------------------------------------------------------------------
    // 1. GLOBE - wireframe sphere, positioned upper-right
    // -----------------------------------------------------------------------
    const globe = new THREE.Group();
    globe.position.set(2.2, 0.6, -1);
    scene.add(globe);

    const globeRadius = 2.0;
    const latCount = 16;
    const lonCount = 28;
    const segs = 80;

    for (let i = 0; i <= latCount; i++) {
      const phi = (i / latCount) * Math.PI;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= segs; j++) {
        const theta = (j / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(
          globeRadius * Math.sin(phi) * Math.cos(theta),
          globeRadius * Math.cos(phi),
          globeRadius * Math.sin(phi) * Math.sin(theta)
        ));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: primaryColor, transparent: true,
        opacity: i === 0 || i === latCount ? 0.1 : 0.3, depthWrite: false,
      });
      globe.add(new THREE.Line(geo, mat));
    }

    for (let i = 0; i < lonCount; i++) {
      const theta = (i / lonCount) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= segs; j++) {
        const phi = (j / segs) * Math.PI;
        pts.push(new THREE.Vector3(
          globeRadius * Math.sin(phi) * Math.cos(theta),
          globeRadius * Math.cos(phi),
          globeRadius * Math.sin(phi) * Math.sin(theta)
        ));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: primaryColor, transparent: true, opacity: 0.2, depthWrite: false,
      });
      globe.add(new THREE.Line(geo, mat));
    }

    // Globe surface dots
    const dotCount = 500;
    const dotGeo = new THREE.BufferGeometry();
    const dotPos = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = globeRadius * 1.003;
      dotPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dotPos[i * 3 + 1] = r * Math.cos(phi);
      dotPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
    globe.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({
      color: primaryColor, size: 0.02, transparent: true, opacity: 0.6, sizeAttenuation: true,
    })));

    // Inner glow
    const glowGeo = new THREE.SphereGeometry(globeRadius * 0.97, 32, 32);
    globe.add(new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({
      color: primaryColor, transparent: true, opacity: 0.04, side: THREE.BackSide,
    })));

    globe.rotation.x = 0.3;
    globe.rotation.z = 0.1;

    // -----------------------------------------------------------------------
    // 2. STAR FIELD - scattered particles across viewport
    // -----------------------------------------------------------------------
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      starSizes[i] = Math.random() * 0.03 + 0.01;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: primaryColor, size: 0.03, transparent: true, opacity: 0.4,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
    }));
    scene.add(stars);

    // -----------------------------------------------------------------------
    // 3. ROUTE LINES - curved paths across the scene
    // -----------------------------------------------------------------------
    const routeGroup = new THREE.Group();
    scene.add(routeGroup);

    interface RouteData {
      line: THREE.Line;
      totalLength: number;
      speed: number;
      material: THREE.LineDashedMaterial;
    }

    const routes: RouteData[] = [];
    const routePaths = [
      { start: [-8, -2, -1], mid: [-1, 1.5, 0], end: [8, 0.5, -1] },
      { start: [-7, 2, -2], mid: [0, -1, 0.5], end: [9, 1, -1.5] },
      { start: [-9, -1, -0.5], mid: [2, 2, 0], end: [7, -2, -1] },
      { start: [-6, 3, -1.5], mid: [-2, 0, 0], end: [10, -1, -2] },
      { start: [-8, -3, -1], mid: [1, 0, 0.5], end: [9, 2.5, -0.5] },
    ];

    routePaths.forEach((rp) => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...(rp.start as [number, number, number])),
        new THREE.Vector3(...(rp.mid as [number, number, number])),
        new THREE.Vector3(...(rp.end as [number, number, number]))
      );
      const pts = curve.getPoints(120);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineDashedMaterial({
        color: dimColor,
        transparent: true,
        opacity: 0.15,
        dashSize: 0.15,
        gapSize: 0.1,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      routeGroup.add(line);

      routes.push({
        line,
        totalLength: curve.getLength(),
        speed: 0.3 + Math.random() * 0.4,
        material: mat,
      });
    });

    // Animated dots traveling along routes
    const travelDots: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; t: number; speed: number }[] = [];
    routePaths.forEach((rp) => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...(rp.start as [number, number, number])),
        new THREE.Vector3(...(rp.mid as [number, number, number])),
        new THREE.Vector3(...(rp.end as [number, number, number]))
      );
      const dotMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({
          color: primaryColor, transparent: true, opacity: 0.8,
        })
      );
      scene.add(dotMesh);
      travelDots.push({
        mesh: dotMesh,
        curve,
        t: Math.random(),
        speed: 0.08 + Math.random() * 0.06,
      });
    });

    // -----------------------------------------------------------------------
    // 4. TRUCK SILHOUETTES - small shapes drifting along the bottom
    // -----------------------------------------------------------------------
    interface TruckData {
      group: THREE.Group;
      speed: number;
      y: number;
      startX: number;
    }

    const trucks: TruckData[] = [];

    function createTruckShape(): THREE.Group {
      const g = new THREE.Group();
      // Trailer body
      const trailer = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.18, 0.01),
        new THREE.MeshBasicMaterial({ color: dimColor, transparent: true, opacity: 0.12 })
      );
      trailer.position.set(-0.1, 0, 0);
      g.add(trailer);
      // Cab
      const cab = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.15, 0.01),
        new THREE.MeshBasicMaterial({ color: dimColor, transparent: true, opacity: 0.15 })
      );
      cab.position.set(0.25, -0.015, 0);
      g.add(cab);
      // Wheels
      [-0.25, -0.05, 0.2].forEach((wx) => {
        const wheel = new THREE.Mesh(
          new THREE.CircleGeometry(0.03, 8),
          new THREE.MeshBasicMaterial({ color: dimColor, transparent: true, opacity: 0.18 })
        );
        wheel.position.set(wx, -0.11, 0.001);
        g.add(wheel);
      });
      return g;
    }

    for (let i = 0; i < 4; i++) {
      const truck = createTruckShape();
      const y = -2.5 - Math.random() * 1.5;
      const startX = -10 + Math.random() * 5;
      const scale = 0.8 + Math.random() * 0.6;
      truck.position.set(startX, y, -1 - Math.random());
      truck.scale.setScalar(scale);
      scene.add(truck);
      trucks.push({ group: truck, speed: 0.004 + Math.random() * 0.006, y, startX });
    }

    // -----------------------------------------------------------------------
    // 5. ANIMATION LOOP
    // -----------------------------------------------------------------------
    const globeVel = { x: 0, y: 0.002 };
    const globeTarget = { x: 0, y: 0.002 };
    let frameId: number;
    let time = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);
      if (reducedMotion) { renderer.render(scene, camera); return; }

      time += 0.016;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Globe rotation - responds to mouse
      globeTarget.y = 0.002 + (mx - 0.5) * 0.006;
      globeTarget.x = (my - 0.5) * 0.003;
      globeVel.x += (globeTarget.x - globeVel.x) * 0.04;
      globeVel.y += (globeTarget.y - globeVel.y) * 0.04;
      globe.rotation.y += globeVel.y;
      globe.rotation.x += globeVel.x;

      // Stars gentle drift
      const starPos = stars.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < starCount; i++) {
        let x = starPos.getX(i);
        x += 0.001;
        if (x > 10) x = -10;
        starPos.setX(i, x);
      }
      starPos.needsUpdate = true;

      // Pulsing star opacity
      (stars.material as THREE.PointsMaterial).opacity = 0.3 + Math.sin(time * 0.8) * 0.1;

      // Travel dots along routes
      travelDots.forEach((td) => {
        td.t += td.speed * 0.016;
        if (td.t > 1) td.t = 0;
        const pos = td.curve.getPoint(td.t);
        td.mesh.position.copy(pos);
        // Pulse size
        const scale = 0.8 + Math.sin(td.t * Math.PI) * 0.5;
        td.mesh.scale.setScalar(scale);
      });

      // Trucks drift right
      trucks.forEach((t) => {
        t.group.position.x += t.speed;
        if (t.group.position.x > 10) {
          t.group.position.x = -10;
        }
      });

      // Subtle camera sway from mouse
      camera.position.x += ((mx - 0.5) * 0.3 - camera.position.x) * 0.02;
      camera.position.y += ((0.5 - my) * 0.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    // -----------------------------------------------------------------------
    // EVENT HANDLERS
    // -----------------------------------------------------------------------
    function handleResize() {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
