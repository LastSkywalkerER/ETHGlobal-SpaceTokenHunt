import { Environment } from "@react-three/drei";

import { FC, useEffect, useState } from "react";
import { Bullet } from "../Bullet";
import { BulletHit } from "../BulletHit";
import { Ship } from "../ship";
import { Asteroid } from "../asteroid";
import { Vector3 } from "three";
import { BulletData } from "../../types/game.types";
import { useSigner } from "@thirdweb-dev/react";
import { useGame } from "../../shared/services/game.service";
import { useShip } from "../../shared/services/ship.service";

interface Hit {
  id: number;
  position: Vector3;
}

export interface ExperienceProps {
  downgradedPerformance?: boolean;
}

export const Experience: FC<ExperienceProps> = ({ downgradedPerformance }) => {
  const { ethers, init, onShoot, position } = useGame();
  const { shipSpecs, loadShipSpecs } = useShip();

  const signer = useSigner();

  const [bullets, setBullets] = useState<BulletData[]>([]);
  const [hits, setHits] = useState<Hit[]>([]);

  const { bulletColor } = useGame();

  useEffect(() => {
    signer && init(signer);
    loadShipSpecs();
  }, [signer]);

  const onFire = async (bullet: BulletData) => {
    await onShoot(bullet);
    setBullets((bullets) => [...bullets, bullet]);
  };

  const onHit = (bulletId: number, position: Vector3) => {
    setBullets((bullets) => bullets.filter((bullet) => bullet.id !== bulletId));
    setHits((hits) => [...hits, { id: bulletId, position }]);
  };

  const onHitEnded = (hitId: number) => {
    setHits((hits) => hits.filter((h) => h.id !== hitId));
  };

  return (
    <>
      {shipSpecs && (
        <Ship
          downgradedPerformance={downgradedPerformance}
          onFire={onFire}
          position={position}
          specs={shipSpecs}
        />
      )}
      {ethers.map(({ id, position }) => (
        <Asteroid key={id} position={position} id={id} />
      ))}

      {shipSpecs &&
        bullets.map((bullet) => (
          <Bullet
            key={bullet.id}
            color={bulletColor}
            {...bullet}
            onHit={(position) => onHit(bullet.id, position)}
            WEAPON_OFFSET={shipSpecs.WEAPON_OFFSET}
          />
        ))}

      {hits.map((hit) => (
        <BulletHit key={hit.id} {...hit} onEnded={() => onHitEnded(hit.id)} />
      ))}
      <ambientLight intensity={1} />
      <Environment files={"./space/Space_sn_copy.hdr"} background />
      <Environment preset="sunset" />
    </>
  );
};
