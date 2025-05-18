
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const particlesRef = useRef<THREE.Points>();
  const cometsRef = useRef<THREE.Group>();
  const satelliteRef = useRef<THREE.Group>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const starsPositions = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
      starsPositions[i] = (Math.random() - 0.5) * 100;
      starsPositions[i + 1] = (Math.random() - 0.5) * 100;
      starsPositions[i + 2] = (Math.random() - 0.5) * 100;
      
      starsSizes[i / 3] = Math.random() * 2;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1));
    
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Create comets
    const cometsGroup = new THREE.Group();
    cometsRef.current = cometsGroup;
    scene.add(cometsGroup);

    for (let i = 0; i < 10; i++) {
      createComet(cometsGroup);
    }

    // Create satellite
    const satelliteGroup = createSatellite();
    satelliteRef.current = satelliteGroup;
    satelliteGroup.position.set(15, 10, -10);
    satelliteGroup.rotation.set(Math.random(), Math.random(), Math.random());
    scene.add(satelliteGroup);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      // Rotate stars slightly
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.0001;

      // Animate comets
      if (cometsRef.current) {
        cometsRef.current.children.forEach((comet: THREE.Object3D) => {
          comet.position.x -= comet.userData.speed;
          comet.position.y -= comet.userData.speed * 0.5;
          
          // Reset comet when it moves out of view
          if (comet.position.x < -50) {
            comet.position.set(
              50 + Math.random() * 10,
              30 + Math.random() * 20,
              -30 - Math.random() * 20
            );
          }
        });
      }

      // Animate satellite
      if (satelliteRef.current) {
        satelliteRef.current.rotation.y += 0.01;
        satelliteRef.current.position.x = 15 * Math.cos(Date.now() * 0.0002);
        satelliteRef.current.position.y = 10 + 5 * Math.sin(Date.now() * 0.0003);
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestRef.current = requestAnimationFrame(animate);
    };

    // Function to create a comet
    function createComet(group: THREE.Group) {
      const cometGeometry = new THREE.ConeGeometry(0.2, 4, 8);
      const cometMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f9ff,
        transparent: true,
        opacity: 0.7,
      });
      
      const comet = new THREE.Mesh(cometGeometry, cometMaterial);
      
      // Create comet tail
      const tailGeometry = new THREE.CylinderGeometry(0.2, 0, 8, 8);
      const tailMaterial = new THREE.MeshBasicMaterial({
        color: 0xd946ef,
        transparent: true,
        opacity: 0.5,
      });
      
      const tail = new THREE.Mesh(tailGeometry, tailMaterial);
      tail.position.y = -6;
      comet.add(tail);
      
      // Position randomly
      comet.position.set(
        50 + Math.random() * 10,
        30 + Math.random() * 20,
        -30 - Math.random() * 20
      );
      
      // Rotate to point in the direction of movement
      comet.rotation.z = Math.PI;
      comet.rotation.x = Math.PI / 4;
      
      // Add random speed as user data
      comet.userData = { speed: 0.05 + Math.random() * 0.15 };
      
      group.add(comet);
    }

    // Function to create a satellite
    function createSatellite(): THREE.Group {
      const group = new THREE.Group();
      
      // Satellite body
      const bodyGeometry = new THREE.BoxGeometry(2, 1, 1);
      const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      group.add(body);
      
      // Solar panels
      const panelGeometry = new THREE.BoxGeometry(4, 0.1, 1);
      const panelMaterial = new THREE.MeshBasicMaterial({ color: 0x00f9ff });
      
      const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
      leftPanel.position.x = -3;
      group.add(leftPanel);
      
      const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
      rightPanel.position.x = 3;
      group.add(rightPanel);
      
      // Antenna
      const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
      const antennaMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.y = 1;
      group.add(antenna);
      
      // Dish
      const dishGeometry = new THREE.CircleGeometry(0.5, 16);
      const dishMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xd946ef,
        side: THREE.DoubleSide
      });
      const dish = new THREE.Mesh(dishGeometry, dishMaterial);
      dish.position.y = 2;
      dish.rotation.x = Math.PI / 2;
      group.add(dish);
      
      return group;
    }

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default SpaceBackground;
