"use client";

import { useTexture } from "@react-three/drei";
import { PrimitiveProps, useLoader } from "@react-three/fiber";
import { FC, useLayoutEffect } from "react";
import * as THREE from "three";

export interface CustomObjectLoaderProps {
  objectPath: string;
  texturePath: string;
  normalPath: string;
  heightPath: string;
  roughnessPath: string;
  metalnessPath: string;
}

export const CustomObjectLoader: FC<Omit<PrimitiveProps, "object"> & CustomObjectLoaderProps> = ({
  objectPath,
  texturePath,
  normalPath,
  heightPath,
  roughnessPath,
  metalnessPath,
  ...props
}) => {
  const [texture, normal, height, roughness, metalness] = useTexture([
    texturePath,
    normalPath,
    heightPath,
    roughnessPath,
    metalnessPath,
  ]);
  const obj = useLoader(THREE.Loader as any, objectPath);

  const objClone = obj.clone();

  useLayoutEffect(() => {
    objClone.traverse(
      (
        child: THREE.Mesh & {
          material: THREE.MeshStandardMaterial;
        },
      ) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            normalMap: normal,
            // displacementMap: height,
            displacementBias: -0.05,
            displacementScale: 1,
            roughnessMap: roughness,
            metalnessMap: metalness,
            bumpMap: height,
          });
          child.geometry.computeVertexNormals();
        }
      },
    );
  }, [height, metalness, normal, objClone, roughness, texture]);

  return <primitive object={objClone} {...props} />;
};
