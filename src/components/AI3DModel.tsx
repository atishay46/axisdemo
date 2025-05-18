import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const AI3DModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const modelRef = useRef<THREE.Group>();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    try {
      if (!containerRef.current) return;

      // Scene setup with enhanced dark background
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup with zoom capability
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 50;
      cameraRef.current = camera;

      // Enhanced renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      
      if (!renderer) {
        throw new Error("Failed to create WebGL renderer");
      }

      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create main model group
      const model = new THREE.Group();
      modelRef.current = model;

      // Create multi-layered holographic shell
      const shellLayers = 3;
      for (let i = 0; i < shellLayers; i++) {
        const shellGeometry = new THREE.IcosahedronGeometry(8 + i * 2, i);
        const shellMaterial = new THREE.MeshPhongMaterial({
          color: 0x00f9ff,
          emissive: 0x00f9ff,
          emissiveIntensity: 0.2 - i * 0.05,
          shininess: 100,
          wireframe: true,
          transparent: true,
          opacity: 0.2 - i * 0.05,
        });
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        shell.userData = {
          rotationSpeed: 0.001 + i * 0.0005,
          rotationAxis: new THREE.Vector3(0, 1, 0),
        };
        model.add(shell);
      }

      // Create quantum core
      const coreGeometry = new THREE.OctahedronGeometry(6, 1);
      const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.5,
        shininess: 100,
        transparent: true,
        opacity: 0.6,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      model.add(core);

      // Create neural network with more complexity
      const neuralPoints = 50;
      const neuralGeometry = new THREE.BufferGeometry();
      const neuralPositions = new Float32Array(neuralPoints * 3);
      const neuralColors = new Float32Array(neuralPoints * 3);
      const neuralSizes = new Float32Array(neuralPoints);

      for (let i = 0; i < neuralPoints * 3; i += 3) {
        const radius = 10 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        neuralPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        neuralPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        neuralPositions[i + 2] = radius * Math.cos(phi);

        neuralColors[i] = 0.0;     // R
        neuralColors[i + 1] = 0.6; // G
        neuralColors[i + 2] = 1.0; // B

        neuralSizes[i / 3] = 0.2 + Math.random() * 0.3;
      }

      neuralGeometry.setAttribute('position', new THREE.BufferAttribute(neuralPositions, 3));
      neuralGeometry.setAttribute('color', new THREE.BufferAttribute(neuralColors, 3));
      neuralGeometry.setAttribute('size', new THREE.BufferAttribute(neuralSizes, 1));

      const neuralMaterial = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const neuralNetwork = new THREE.Points(neuralGeometry, neuralMaterial);
      model.add(neuralNetwork);

      // Create complex circuit patterns
      const circuitCount = 8;
      for (let i = 0; i < circuitCount; i++) {
        const circuitGeometry = new THREE.TorusGeometry(12 + i * 2, 0.1, 16, 100);
        const circuitMaterial = new THREE.MeshPhongMaterial({
          color: 0x00f9ff,
          emissive: 0x00f9ff,
          emissiveIntensity: 0.3,
          shininess: 100,
          transparent: true,
          opacity: 0.4,
        });
        const circuit = new THREE.Mesh(circuitGeometry, circuitMaterial);
        circuit.rotation.x = Math.PI / 2;
        circuit.userData = {
          rotationSpeed: 0.001 + i * 0.0005,
          rotationAxis: new THREE.Vector3(0, 1, 0),
          pulseSpeed: 0.002 + i * 0.001,
          pulseIntensity: 0.2 + i * 0.1,
        };
        model.add(circuit);
      }

      // Create data streams
      const streamCount = 12;
      for (let i = 0; i < streamCount; i++) {
        const streamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 20, 8);
        const streamMaterial = new THREE.MeshPhongMaterial({
          color: 0x00f9ff,
          emissive: 0x00f9ff,
          emissiveIntensity: 0.5,
          shininess: 100,
          transparent: true,
          opacity: 0.3,
        });
        const stream = new THREE.Mesh(streamGeometry, streamMaterial);
        
        const angle = (i / streamCount) * Math.PI * 2;
        stream.position.set(
          Math.cos(angle) * 15,
          Math.sin(angle) * 15,
          0
        );
        stream.rotation.z = angle + Math.PI / 2;
        
        stream.userData = {
          originalPosition: stream.position.clone(),
          speed: 0.001 + Math.random() * 0.002,
          phase: Math.random() * Math.PI * 2,
        };
        
        model.add(stream);
      }

      // Create energy particles with enhanced effects
      const particleCount = 300;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      const particleSizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 15 + Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i + 2] = radius * Math.cos(phi);

        particleColors[i] = 0.5;     // R
        particleColors[i + 1] = 0.0; // G
        particleColors[i + 2] = 1.0; // B

        particleSizes[i / 3] = 0.05 + Math.random() * 0.1;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      model.add(particles);

      scene.add(model);

      // Enhanced lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x00f9ff, 1, 100);
      pointLight1.position.set(20, 20, 20);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x8b5cf6, 1, 100);
      pointLight2.position.set(-20, -20, 20);
      scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0x00ffff, 1, 100);
      pointLight3.position.set(0, 0, 20);
      scene.add(pointLight3);

      // Mouse interaction handlers with zoom
      const handleMouseDown = (event: MouseEvent) => {
        setIsDragging(true);
        setPreviousMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging || !modelRef.current) return;

        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y,
        };

        modelRef.current.rotation.y += deltaMove.x * 0.01;
        modelRef.current.rotation.x += deltaMove.y * 0.01;

        setPreviousMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const zoomSpeed = 0.1;
        const newZoom = Math.max(0.5, Math.min(2, zoom + (event.deltaY > 0 ? -zoomSpeed : zoomSpeed)));
        setZoom(newZoom);
        if (cameraRef.current) {
          cameraRef.current.position.z = 50 / newZoom;
        }
      };

      // Touch interaction handlers
      const handleTouchStart = (event: TouchEvent) => {
        if (event.touches.length === 1) {
          setIsDragging(true);
          setPreviousMousePosition({
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
          });
        }
      };

      const handleTouchMove = (event: TouchEvent) => {
        if (!isDragging || !modelRef.current || event.touches.length !== 1) return;

        const deltaMove = {
          x: event.touches[0].clientX - previousMousePosition.x,
          y: event.touches[0].clientY - previousMousePosition.y,
        };

        modelRef.current.rotation.y += deltaMove.x * 0.01;
        modelRef.current.rotation.x += deltaMove.y * 0.01;

        setPreviousMousePosition({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        });
      };

      const handleTouchEnd = () => {
        setIsDragging(false);
      };

      // Add event listeners
      containerRef.current.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
      containerRef.current.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      // Animation loop with enhanced effects
      const animate = () => {
        try {
          if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !modelRef.current) return;

          // Auto-rotate when not dragging
          if (!isDragging) {
            modelRef.current.rotation.y += 0.002;
          }

          // Animate circuit patterns with pulsing
          modelRef.current.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
              if (child.userData.rotationSpeed) {
                child.rotateOnAxis(child.userData.rotationAxis, child.userData.rotationSpeed);
              }
              if (child.userData.pulseSpeed) {
                const time = Date.now() * child.userData.pulseSpeed;
                child.material.emissiveIntensity = 0.3 + Math.sin(time) * child.userData.pulseIntensity;
              }
              if (child.userData.originalPosition) {
                const time = Date.now() * child.userData.speed;
                child.position.x = child.userData.originalPosition.x + Math.sin(time + child.userData.phase) * 0.5;
                child.position.y = child.userData.originalPosition.y + Math.cos(time + child.userData.phase) * 0.5;
                child.position.z = child.userData.originalPosition.z + Math.sin(time * 0.5 + child.userData.phase) * 0.5;
              }
            }
          });

          // Animate neural network and particles
          const time = Date.now() * 0.001;
          if (neuralNetwork) {
            neuralNetwork.rotation.y += 0.001;
            const positions = neuralNetwork.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < positions.length; i += 3) {
              positions[i + 1] += Math.sin(time + i) * 0.02;
            }
            neuralNetwork.geometry.attributes.position.needsUpdate = true;
          }
          if (particles) {
            particles.rotation.y += 0.0005;
            particles.rotation.x += 0.0002;
            const positions = particles.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < positions.length; i += 3) {
              positions[i] += Math.sin(time + i) * 0.01;
              positions[i + 1] += Math.cos(time + i) * 0.01;
            }
            particles.geometry.attributes.position.needsUpdate = true;
          }

          rendererRef.current.render(sceneRef.current, cameraRef.current);
          requestRef.current = requestAnimationFrame(animate);
        } catch (err) {
          console.error('Animation error:', err);
          setError('Animation error occurred');
        }
      };

      // Handle window resize
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
          
          cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        }, 100);
      };

      window.addEventListener('resize', handleResize);
      requestRef.current = requestAnimationFrame(animate);

      // Cleanup
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
        if (containerRef.current && rendererRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        if (containerRef.current) {
          containerRef.current.removeEventListener('mousedown', handleMouseDown);
          containerRef.current.removeEventListener('touchstart', handleTouchStart);
        }
        if (resizeTimeout) clearTimeout(resizeTimeout);
      };
    } catch (err) {
      console.error('Initialization error:', err);
      setError('Failed to initialize 3D model');
    }
  }, [isDragging, previousMousePosition, zoom]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>Failed to load 3D visualization</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)'
      }}
    />
  );
};

export default AI3DModel; 