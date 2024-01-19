import { useTexture } from "@react-three/drei";

export const Coin = () => {
  const [map] = useTexture(["./eth.png"]);

  return (
    <mesh rotation={[1, 1, 1]}>
      <cylinderGeometry args={[1, 1, 0.3]} />
      <meshStandardMaterial map={map} />
    </mesh>
  );
};
