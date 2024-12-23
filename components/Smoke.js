import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SmokeShaderPlane = () => {
  const planeRef = useRef();

  // Animate the shader's uniforms (e.g., time)
  useFrame((state) => {
    if (planeRef.current) {
      planeRef.current.material.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={planeRef} position={[0, 0, -2]}>
      <fog attach="fog" args={["#3c3c5d", 0, 25]} />
      <ambientLight intensity={0.1} />

      <planeGeometry args={[40, 40, 100, 100]} />
      <shaderMaterial
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          uniform vec3 u_lightPos;

          uniform float u_time;

          // Simplex Noise Functions
          vec4 permute(vec4 x) {
            return mod(((x * 34.0) + 1.0) * x, 289.0);
          }

          vec4 taylorInvSqrt(vec4 r) {
            return 1.79284291400159 - 0.85373472095314 * r;
          }

          float snoise(vec3 v) {
            const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

            // First corner
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);

            // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);

            // Offsets for the remaining corners
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;

            // Permutations
            i = mod(i, 289.0);
            vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
              i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
              i.x + vec4(0.0, i1.x, i2.x, 1.0));

            // Gradients: 7x7x6 points over a cube, mapped onto a 3D grid
            float n_ = 1.0 / 7.0;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);

            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);

            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);

            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
          }

          void main() {
            vec2 uv = vUv * 2.0 - 1.0;
            float fog = snoise(vec3(uv * 3.0, u_time * 0.2));
            vec3 smokeColor = vec3(0.2, 0.2, 0.2); // Dark grey color
            vec3 color = mix(vec3(0.0), smokeColor, fog * 0.5 + 0.5); // Blend smoke with dark grey
            
            // Light influence
            vec3 lightDir = normalize(u_lightPos - vPosition);
            float diff = max(dot(vNormal, lightDir), 0.0);
          
            // Add white blur effect
            float distanceToLight = length(u_lightPos - vPosition);
            float blur = smoothstep(0.0, 2.0, 2.0 - distanceToLight / 10.0);
            color += blur * vec3(1.0); // Add white blur
            gl_FragColor = vec4(color, 1.0);
          }
        `}
        uniforms={{
          u_time: { value: 0 },
          u_lightPos: { value: new THREE.Vector3(0, 0, 10) },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};