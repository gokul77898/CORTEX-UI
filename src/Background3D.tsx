import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Central warped sphere */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[0, 0, -5]}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <MeshDistortMaterial 
            color="#8a2be2" 
            emissive="#4a00e0"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
            distort={0.4} 
            speed={2} 
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Floating secondary shapes */}
      <Float speed={3} rotationIntensity={3} floatIntensity={4}>
        <mesh position={[-5, 3, -8]}>
          <torusGeometry args={[1, 0.3, 32, 64]} />
          <meshStandardMaterial color="#00f0ff" roughness={0.2} metalness={0.8} wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={4} floatIntensity={5}>
        <mesh position={[6, -2, -6]}>
          <octahedronGeometry args={[1.5]} />
          <meshStandardMaterial color="#ff007f" roughness={0.2} metalness={0.8} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-2] pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff007f" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
