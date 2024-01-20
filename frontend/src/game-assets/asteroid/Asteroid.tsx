import {
  CollisionPayload,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
  vec3,
} from "@react-three/rapier";
import { useSigner } from "@thirdweb-dev/react";
import { FC, useRef, useState } from "react";
import { Vector3 } from "three";

import { useGame } from "../../shared/services/game/game.service";
import { BulletUserData } from "../Bullet";
import { Coin } from "../coin";

export interface AsteroidProps {
  onKilled?: () => void;
  id: number;
  name: string;
  address: string;
  logo: string;
}

export const Asteroid: FC<RigidBodyProps & AsteroidProps> = ({
  onKilled,
  id,
  name,
  address,
  logo,
  ...props
}) => {
  const rigidBody = useRef<RapierRigidBody | null>(null);

  const signer = useSigner();
  const { onHit } = useGame();

  const [isDead, setIsDead] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Vector3 | null>(null);

  const intersectionHandler = async ({ other }: CollisionPayload) => {
    const userData = other.rigidBody?.userData as BulletUserData;

    if (userData.type === "bullet" && signer) {
      setCurrentPosition(vec3(rigidBody.current?.translation()));

      try {
        await onHit(signer, {
          bulletId: userData.bulletId,
          etherId: id,
          hitPosition: vec3(rigidBody.current?.translation()),
          name,
          address,
          action: userData.action,
        });
        setIsDead(true);
        onKilled && onKilled();
      } catch (error) {
        console.error(error);
        setCurrentPosition(null);
      }
    }
  };

  if (isDead) {
    return null;
  }

  if (currentPosition) {
    return (
      <mesh {...props} rotation={[1, 1, 1]} position={currentPosition}>
        <cylinderGeometry args={[1, 1, 0.3]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
    );
  }

  return (
    <RigidBody
      ref={rigidBody}
      {...props}
      angularVelocity={[0, 1, 0]}
      enabledTranslations={[true, false, true]}
      onIntersectionEnter={intersectionHandler}
      colliders={"hull"}
    >
      <Coin logo={logo} />
    </RigidBody>
  );
};
