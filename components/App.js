'use client'
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { CustomShaderPlane } from "./LensShader";

// Plane Component
function BackgroundPlane() {
  const { viewport } = useThree();

  return (
    <group>
      <mesh rotation={[0, 0, 0]} position={[0, 0, -3]}>
        {/* <planeGeometry args={[viewport.width, viewport.height]} /> */}
        <meshStandardMaterial transparent opacity={0.6} />
        <ambientLight intensity={0.1} />
      </mesh>
      <fog attach="fog" args={["#3c3c5d", 0, 25]} />
    </group>
  );
}

// Point Light Component
function InteractiveLight() {
  const lightRef = useRef();
  const { viewport, mouse } = useThree();

  useFrame(() => {
    const x = mouse.x * viewport.width * 0.5;
    const y = mouse.y * viewport.height * 0.5;

    lightRef.current.position.set(x, y, 4);
    lightRef.current.rotation.set(-y, x, 4);
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 10]}
      intensity={4 * Math.PI}
      color="white"
      distance={10}
    />
  );
}

// 3D Object Component
function AnimatedObject() {
  const objRef = useRef();
  const pointsRef1 = useRef();
  const pointsRef2 = useRef();
  const [animationComplete, setAnimationComplete] = useState(false);
  const skullModel = useLoader(OBJLoader, "/skull.obj");
  
  useEffect(() => {
    if (skullModel) {
      // Animate object with GSAP
      gsap
        .timeline({
          onComplete: () => setAnimationComplete(true),
        })
        .fromTo(
          objRef.current.scale,
          { x: 0.08, y: 0.08, z: 0.08 },
          { x: 0.015, y: 0.015, z: 0.015, duration: 6, ease: "expo.out" }
        )
        .fromTo(
          [pointsRef1.current.material, pointsRef2.current.material],
          { opacity: 0 },
          { opacity: 1, duration: 3 },
          "-=9"
        );

      // Material setup
      skullModel.children.forEach((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhongMaterial({
            color: "white",
            wireframe: true,
            transparent: true,
            opacity: 0,
          });

          gsap.fromTo(
            child.material,
            { opacity: 0 },
            { opacity: 0.2, duration: 2, delay: 2 }
          );
        }
      });
    }
  }, [skullModel]);

  // Mouse Interaction for LookAt
  useFrame(({ mouse }) => {
    if (animationComplete) {
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
        vector.multiplyScalar(1);
        objRef.current.rotation.y += (vector.x - objRef.current.rotation.y) * 0.05;
        objRef.current.rotation.x -= (vector.y + objRef.current.rotation.x) * 0.05;
    }
  });

  if (!skullModel) return null;

  return (
    <group ref={objRef} position={[0, 0, 0]}>
      <mesh>
        <primitive object={skullModel} />
      </mesh>
      {/* First Points Group */}
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={19281}
            itemSize={3}
            array={skullModel.children[0].geometry.attributes.position.array}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.01}
          color="white"
          transparent
          sizeAttenuation
        />
      </points>
      {/* Second Points Group */}
      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={19281}
            itemSize={3}
            array={skullModel.children[1].geometry.attributes.position.array}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.01}
          color="white"
          transparent
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Main 3D Scene Component
function ThreeJSScene() {
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      camera={{ position: [0, 0, 6] }}
    >
      {/* <CustomShaderPlane /> */}
      <AnimatedObject />
      <InteractiveLight />
      <BackgroundPlane />
      <CustomShaderPlane />
    </Canvas>
  );
}

// Main Application Component
export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ThreeJSScene />
    </div>
  );
}
