import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Color, MathUtils, Vector3 } from "three";

import { BulletColors } from "../../shared/constants/constants";

interface AnimatedBoxProps {
  scale: number;
  target: Vector3;
  speed: number;
}

const AnimatedBox: FC<AnimatedBoxProps> = ({ scale, target, speed }) => {
  const ref = useRef<any | null>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;

    if (ref.current.scale.x > 0) {
      ref.current.scale.x = ref.current.scale.y = ref.current.scale.z -= speed * delta;
    }
    ref.current.position.lerp(target, speed);
  });

  return <Instance ref={ref} scale={scale} position={[0, 0, 0]} />;
};

export interface BulletHitProps {
  id: number;
  nb?: number;
  position: Vector3;
  onEnded: () => void;
  color: BulletColors;
}

export const BulletHit: FC<BulletHitProps> = ({ nb = 100, position, onEnded, color }) => {
  const [bulletHitColor] = useState(() => {
    const bulletHitColorObj = new Color(color);
    bulletHitColorObj.multiplyScalar(12);

    return bulletHitColorObj;
  });

  const boxes = useMemo(
    () =>
      Array.from({ length: nb }, () => ({
        target: new Vector3(
          MathUtils.randFloat(-0.6, 0.6),
          MathUtils.randFloat(-0.6, 0.6),
          MathUtils.randFloat(-0.6, 0.6),
        ),
        scale: 0.1, //MathUtils.randFloat(0.03, 0.09),
        speed: MathUtils.randFloat(0.1, 0.3),
      })),
    [nb],
  );

  useEffect(() => {
    setTimeout(() => {
      onEnded();
    }, 500);
  }, []);

  return (
    <group position={[position.x, position.y, position.z]}>
      <Instances>
        <boxGeometry />
        <meshStandardMaterial toneMapped={false} color={bulletHitColor} />
        {boxes.map((box, i) => (
          <AnimatedBox key={i} {...box} />
        ))}
      </Instances>
    </group>
  );
};
