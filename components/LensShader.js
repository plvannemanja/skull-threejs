'use client'
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const LensDistortionShader = {
  uniforms: {
    baseIor: { value: 0.910 },
    bandOffset: { value: 0.0019 },
    jitterIntensity: { value: 20.7 },
    tDiffuse: { value: null },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float baseIor;
    uniform float bandOffset;
    uniform float jitterIntensity;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec3 color = texture2D(tDiffuse, uv).rgb;
      // Add distortion logic here if needed
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

export const CustomShaderPlane = () => {
  const meshRef = useRef();
  const clock = useRef(new THREE.Clock());

  const shaderMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    depthTest: false,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      mousePos: { value: new THREE.Vector2(0.5, 0.5) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec2 mousePos;

      #define N 16
      #define PI 3.14159265
      #define depth 1.0
      #define rate 0.3
      #define huecenter 0.5

      vec3 hsv2rgb(in vec3 c) {
          vec3 rgb = clamp(abs(mod(c.y * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 0.3);
          return c.x * mix(vec3(0.1), rgb, 1.0);
      }

      void main() {
          vec2 v = gl_FragCoord.xy / iResolution.xy;
          float t = iTime * 0.08;
          float r = 1.8;
          float d = 0.0;
          for (int i = 1; i < N; i++) {
              d = (PI / float(N)) * (float(i) * 14.0);
              r += length(vec2(rate * v.y, rate * v.x)) + 1.21;
              v = vec2(v.x + cos(v.y + cos(r) + d) + cos(t), v.y - sin(v.x + cos(r) + d) + sin(t));
          }
          r = (sin(r * 0.09) * 0.5) + 0.5;
          vec3 hsv = vec3(
              mod(mousePos.x + huecenter, 1.0),
              1.0 - 0.5 * pow(max(r, 0.0) * 1.2, 0.5),
              1.0 - 0.2 * pow(max(r, 0.4) * 2.2, 6.0)
          );
          vec4 fogColor = vec4(0.1, 0.1, 0.1, 1.0);
          float fogFactor = exp(-0.02 * pow(r, 2.0));
          fogFactor = clamp(fogFactor, 0.0, 1.0);
          gl_FragColor = mix(fogColor, vec4(hsv2rgb(hsv), 1.0), fogFactor);
      }
    `,
  });

  useFrame(() => {
    if (meshRef.current) {
      shaderMaterial.uniforms.iTime.value = clock.current.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

