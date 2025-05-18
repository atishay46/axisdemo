
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Merchandise3DViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const tshirtRef = useRef<THREE.Group>();

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current ? containerRef.current.clientWidth / containerRef.current.clientHeight : 1,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    if (containerRef.current) {
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00f9ff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xd946ef, 1);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Create T-shirt model
    const tshirtGroup = new THREE.Group();
    tshirtRef.current = tshirtGroup;

    // T-shirt body (simple cylinder with flattened top and bottom)
    const bodyGeometry = new THREE.CylinderGeometry(1.5, 1.3, 2.5, 32, 1, true);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.1,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    tshirtGroup.add(body);

    // Sleeves (small cylinders)
    const sleeveGeometry = new THREE.CylinderGeometry(0.4, 0.3, 0.7, 16, 1, true);
    const sleeveLeftMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.1,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });
    
    const sleeveLeft = new THREE.Mesh(sleeveGeometry, sleeveLeftMaterial);
    sleeveLeft.position.set(-1.5, 0.3, 0);
    sleeveLeft.rotation.z = Math.PI / 2;
    tshirtGroup.add(sleeveLeft);

    const sleeveRight = new THREE.Mesh(sleeveGeometry, sleeveLeftMaterial);
    sleeveRight.position.set(1.5, 0.3, 0);
    sleeveRight.rotation.z = -Math.PI / 2;
    tshirtGroup.add(sleeveRight);

    // Collar (small torus)
    const collarGeometry = new THREE.TorusGeometry(0.5, 0.15, 16, 32, Math.PI);
    const collarMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.1,
      roughness: 0.8,
    });
    const collar = new THREE.Mesh(collarGeometry, collarMaterial);
    collar.position.set(0, 1.25, 0);
    collar.rotation.x = Math.PI / 2;
    tshirtGroup.add(collar);

    // Add AXIS logo on the front of the shirt
    const logoGeometry = new THREE.PlaneGeometry(1.5, 0.75);
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f9ff,
      metalness: 0.5,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.5, 1.3);
    tshirtGroup.add(logo);

    // Add AXIS text
    const textGeometry = new THREE.PlaneGeometry(1, 0.5);
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      metalness: 0.5,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.set(0, 0, 1.301);
    logo.add(text);

    // Position the t-shirt
    tshirtGroup.rotation.x = -0.2;
    scene.add(tshirtGroup);

    // Set up interactive rotation
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && tshirtRef.current) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y
        };

        tshirtRef.current.rotation.y += deltaMove.x * 0.01;
        tshirtRef.current.rotation.x += deltaMove.y * 0.01;
      }

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Add event listeners
    if (containerRef.current) {
      containerRef.current.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      // Touch events for mobile
      containerRef.current.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          isDragging = true;
          previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
        }
      });

      containerRef.current.addEventListener('touchmove', (e) => {
        if (isDragging && tshirtRef.current && e.touches.length === 1) {
          const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
          };

          tshirtRef.current.rotation.y += deltaMove.x * 0.01;
          tshirtRef.current.rotation.x += deltaMove.y * 0.01;

          previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
        }
      });

      containerRef.current.addEventListener('touchend', () => {
        isDragging = false;
      });
    }

    // Animation loop
    const animate = () => {
      if (!tshirtRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      if (!isDragging && tshirtRef.current) {
        tshirtRef.current.rotation.y += 0.005; // Slowly rotate when not being dragged
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', handleMouseDown);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[300px]" />;
};

export default Merchandise3DViewer;
