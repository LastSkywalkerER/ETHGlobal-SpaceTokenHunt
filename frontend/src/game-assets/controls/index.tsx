import { OrbitControls as ThreeOrbitControls } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";

extend({ ThreeOrbitControls });

export const OrbitControls = () => {
  const { camera, gl } = useThree();
  return <ThreeOrbitControls attach={"orbitControls"} args={[camera, gl.domElement]} enabled />;
};
