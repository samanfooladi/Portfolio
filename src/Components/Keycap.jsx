import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text } from "@react-three/drei";
import { BufferAttribute, Color } from "three";

const PRESS_EVERY = 3.2;
const PRESS_DURATION = 0.28;
const PRESS_DEPTH = 5;

// Paint a top-to-bottom gradient into the body's vertex colors
const applyGradient = (geometry, top, bottom) => {
  geometry.computeBoundingBox();
  const { min, max } = geometry.boundingBox;
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const from = new Color(bottom);
  const to = new Color(top);
  const mixed = new Color();

  for (let i = 0; i < position.count; i++) {
    const t = (position.getY(i) - min.y) / (max.y - min.y);
    mixed.copy(from).lerp(to, t).toArray(colors, i * 3);
  }

  geometry.setAttribute("color", new BufferAttribute(colors, 3));
};

// Sizes are in hero pixels; the parent scales the group to world units
const Keycap = (props) => {
  const bodyRef = useRef();
  const capRef = useRef();

  useLayoutEffect(() => {
    applyGradient(bodyRef.current.geometry, "#23232B", "#0E0E12");
  }, []);

  // Quick press-and-release every few seconds
  useFrame(({ clock }) => {
    const t = clock.elapsedTime % PRESS_EVERY;
    const press = t < PRESS_DURATION ? Math.sin((Math.PI * t) / PRESS_DURATION) : 0;
    capRef.current.position.z = 22 - press * PRESS_DEPTH;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group rotation={[-0.35, 0.25, (-10 * Math.PI) / 180]} {...props}>
        <RoundedBox ref={bodyRef} args={[76, 80, 32]} radius={12} smoothness={4}>
          <meshStandardMaterial vertexColors roughness={0.6} />
        </RoundedBox>
        <group ref={capRef} position={[0, 4, 22]}>
          <RoundedBox args={[58, 60, 12]} radius={5} smoothness={4}>
            <meshStandardMaterial color="#3A3A49" roughness={0.5} />
          </RoundedBox>
          <Text position={[0, 0, 6.5]} fontSize={30} color="#2B4BFF" anchorX="center" anchorY="middle">
            S
          </Text>
        </group>
      </group>
    </Float>
  );
};

export default Keycap;
