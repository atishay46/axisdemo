
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SpaceModel3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const starsRef = useRef<THREE.Points>();

  const initThree = () => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f9ff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xd946ef, 1, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Create planet meshes
    const geometries = [
      new THREE.SphereGeometry(3, 32, 32), // Main planet
      new THREE.TorusGeometry(5, 0.2, 16, 100), // Ring
      new THREE.SphereGeometry(0.8, 16, 16), // Small moon
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x333333,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.7,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xd946ef,
        metalness: 0.5,
        roughness: 0.5,
      }),
    ];

    const planet = new THREE.Mesh(geometries[0], materials[0]);
    scene.add(planet);
    meshesRef.current.push(planet);

    const ring = new THREE.Mesh(geometries[1], materials[1]);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
    meshesRef.current.push(ring);

    const moon = new THREE.Mesh(geometries[2], materials[2]);
    moon.position.set(8, 0, 0);
    scene.add(moon);
    meshesRef.current.push(moon);

    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
    });

    const starsVertices = [];
    for (let i = 0; i < 3000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  };

  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    // Animate the planet rotation
    if (meshesRef.current[0]) {
      meshesRef.current[0].rotation.y += 0.005;
    }

    // Animate the ring rotation
    if (meshesRef.current[1]) {
      meshesRef.current[1].rotation.z += 0.002;
    }

    // Animate the moon orbit
    if (meshesRef.current[2]) {
      const time = Date.now() * 0.001;
      meshesRef.current[2].position.x = Math.cos(time) * 8;
      meshesRef.current[2].position.z = Math.sin(time) * 8;
      meshesRef.current[2].rotation.y += 0.01;
    }

    // Animate stars subtle twinkling
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const cleanup = initThree();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      cleanup && cleanup();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default SpaceModel3D;
