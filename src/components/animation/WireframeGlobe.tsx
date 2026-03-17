// ---------------------------------------------------------------------------
// WireframeGlobe - Three.js Interactive 3D Globe
// ---------------------------------------------------------------------------
// A wireframe sphere built from line segments using Three.js. The globe
// auto-rotates slowly and accelerates + tilts toward the cursor on hover.
// Lines are rendered in the brand primary blue with depth-based opacity.
// ---------------------------------------------------------------------------

import { useRef, useEffect } from "react";
import * as THREE from "three";

interface WireframeGlobeProps {
  color?: string;
  className?: string;
}

export default function WireframeGlobe({
  color = "#03A9F4",
  className = "",
}: WireframeGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const globeRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current as HTMLDivElement;

    // Respect reduced motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe group for rotation
    const globe = new THREE.Group();
    globeRef.current = globe;
    scene.add(globe);

    const primaryColor = new THREE.Color(color);
    const radius = 1.5;

    // Create latitude lines
    const latCount = 14;
    const segmentsPerLine = 80;
    for (let i = 0; i <= latCount; i++) {
      const phi = (i / latCount) * Math.PI;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= segmentsPerLine; j++) {
        const theta = (j / segmentsPerLine) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: primaryColor,
        transparent: true,
        opacity: i === 0 || i === latCount ? 0.15 : 0.4,
        depthWrite: false,
      });
      globe.add(new THREE.Line(geometry, material));
    }

    // Create longitude lines
    const lonCount = 24;
    for (let i = 0; i < lonCount; i++) {
      const theta = (i / lonCount) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= segmentsPerLine; j++) {
        const phi = (j / segmentsPerLine) * Math.PI;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: primaryColor,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
      });
      globe.add(new THREE.Line(geometry, material));
    }

    // Add scatter dots on the surface for visual interest
    const dotCount = 400;
    const dotGeometry = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = radius * 1.002;
      dotPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dotPositions[i * 3 + 1] = r * Math.cos(phi);
      dotPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    dotGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dotPositions, 3)
    );
    const dotMaterial = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.025,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    globe.add(new THREE.Points(dotGeometry, dotMaterial));

    // Add a subtle inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(radius * 0.98, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(glowGeometry, glowMaterial));

    // Initial tilt
    globe.rotation.x = 0.3;
    globe.rotation.z = 0.1;

    // Rotation velocities
    const velocity = { x: 0, y: 0.003 };
    const targetVelocity = { x: 0, y: 0.003 };

    // Animation loop
    let frameId: number;
    function animate() {
      frameId = requestAnimationFrame(animate);

      if (reducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const mouse = mouseRef.current;

      if (mouse.active) {
        // Accelerate rotation toward cursor
        const normalizedX = (mouse.x / width - 0.5) * 2;
        const normalizedY = (mouse.y / height - 0.5) * 2;
        targetVelocity.y = 0.003 + normalizedX * 0.008;
        targetVelocity.x = normalizedY * 0.004;
      } else {
        targetVelocity.y = 0.003;
        targetVelocity.x = 0;
      }

      // Ease toward target velocity
      velocity.x += (targetVelocity.x - velocity.x) * 0.05;
      velocity.y += (targetVelocity.y - velocity.y) * 0.05;

      globe.rotation.y += velocity.y;
      globe.rotation.x += velocity.x;

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", handleResize);

    // Mouse tracking on the container
    function handleMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    }
    function handleMouseLeave() {
      mouseRef.current.active = false;
    }
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
