import { useTexture } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { FC } from "react";

export interface CoinProps {
  logo: string;
}

export const Coin: FC<MeshProps & CoinProps> = ({ logo, ...props }) => {
  const [map] = useTexture([logo]);

  return (
    <mesh {...props} rotation={[1, 1, 1]}>
      <cylinderGeometry args={[1, 1, 0.3]} />
      <meshStandardMaterial map={map} />
    </mesh>
  );
};
