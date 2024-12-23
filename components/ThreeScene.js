'use client'
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";
import gsap from "gsap";

export default function ThreeJSScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Fog
    scene.fog = new THREE.Fog("#3c3c5d", 0, 25);

    // // Background Plane
    // const planeGeometry = new THREE.PlaneGeometry(
    //   window.innerWidth / 100,
    //   window.innerHeight / 100
    // );
    // const planeMaterial = new THREE.MeshStandardMaterial({
    //   transparent: true,
    //   opacity: 0.6,
    // });
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.position.set(0, 0, -3);
    // scene.add(plane);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Point Light
    const pointLight = new THREE.PointLight(0xffffff, 4 * Math.PI, 10);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Mouse Interaction
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const x = mouse.x * window.innerWidth * 0.005;
      const y = mouse.y * window.innerHeight * 0.005;
      pointLight.position.set(x, y, 4);
    };
    window.addEventListener("mousemove", onMouseMove);

    // Load Skull Model
    const objLoader = new OBJLoader();
    objLoader.load("/skull.obj", (skull) => {
      skull.children.forEach((child) => {
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

      skull.scale.set(0.08, 0.08, 0.08);
      skull.position.set(0, 0, 0);
      scene.add(skull);

      gsap.to(skull.scale, {
        x: 0.015,
        y: 0.015,
        z: 0.015,
        duration: 6,
        ease: "expo.out",
      });

      // Points animation
      const pointsMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: "white",
        transparent: true,
      });

      skull.children.forEach((child) => { 
        if (child.isMesh) {
          const pointsGeometry = new THREE.BufferGeometry();
          pointsGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
              child.geometry.attributes.position.array,
              3
            )
          );

          const points = new THREE.Points(pointsGeometry, pointsMaterial);
          scene.add(points);
          gsap.to(pointsMaterial, {
            opacity: 1,
            duration: 3,
          });
        }
      });
    });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
