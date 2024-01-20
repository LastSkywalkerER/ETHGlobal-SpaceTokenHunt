import { Environment } from "@react-three/drei";
import { FC, useState } from "react";
import { Vector3 } from "three";

import { mockTokens } from "../../shared/constants/mockTokens";
import { useGame } from "../../shared/services/game/game.service";
import { useShip } from "../../shared/services/ship.service";
import { BulletData } from "../../types/game.types";
import { Asteroid } from "../asteroid";
import { Bullet } from "../Bullet";
import { BulletHit } from "../BulletHit";
import { Ship } from "../ship";

interface Hit {
  id: number;
  position: Vector3;
}

export interface ExperienceProps {
  downgradedPerformance?: boolean;
}

export const Experience: FC<ExperienceProps> = ({ downgradedPerformance }) => {
  const { onShoot, position } = useGame();
  const { shipSpecs } = useShip();

  const [bullets, setBullets] = useState<BulletData[]>([]);
  const [hits, setHits] = useState<Hit[]>([]);

  const { bulletColor } = useGame();

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
      {mockTokens.map((data, index) => {
        const { name, position, logo, address } = data as {
          name: string;
          position: { x: number; y: number; z: number };
          address: string;
          logo: string;
        };

        return (
          <Asteroid
            key={String(name)}
            position={new Vector3(position.x, position.y, position.z)}
            id={index}
            address={address}
            logo={logo}
            name={name}
          />
        );
      })}

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
        <BulletHit key={hit.id} {...hit} onEnded={() => onHitEnded(hit.id)} color={bulletColor} />
      ))}
      <ambientLight intensity={1} />
      <Environment files={"./space/Space_sn_copy.hdr"} background />
      <Environment preset="sunset" />
    </>
  );
};
