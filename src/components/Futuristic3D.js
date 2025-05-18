import React from "react";
import { Canvas } from "@react-three/fiber";

const Futuristic3D = () => {
  return (
    <div className="three-container">
      <Canvas>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Futuristic3D;
