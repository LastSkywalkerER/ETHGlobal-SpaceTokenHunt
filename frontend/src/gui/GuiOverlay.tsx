"use client";

import cx from "classnames";
import { GuiCard } from "./GuiCard";
import { KeyboardControlsEntry } from "@react-three/drei";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { ConnectWallet, useBalance, useSigner } from "@thirdweb-dev/react";
import { useGame } from "../shared/services/game.service";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { BulletColors, colorToAction } from "../shared/constants/constants";
import { BlurWrapper } from "./BlurWrapper";
import { TopUpWindow } from "./TopUpWindow";
import { GuiButton } from "./GuiButton";
import { Balances } from "./Balances";


interface GuiProps {
  map: KeyboardControlsEntry<string>[];
  className?: string;
}


const minBalanceForGame = 0.1;

export const GuiOverlay: FC<GuiProps> = ({ map, className }) => {
  const audio = useRef<HTMLAudioElement | null>(null);
  const { data } = useBalance();
  const { isConnected } = useAccount();
  const signer = useSigner();

  const [modal, setModal] = useState<ReactNode>(null);

  const {
    setBulletColor,
    bulletColor,
    isPlaying,
    setIsPlaying,
    loadGameData,
    borrowRepayPercentage,
    incBRP,
    decBRP,
  } = useGame();

  useEffect(() => {
    signer && loadGameData(signer);
  }, [signer]);

  const isReadyForGame = +(data?.displayValue || "0") >= minBalanceForGame;

  const beginGame = () => {
    audio.current?.play();
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const topUp = async () => {


    setModal(<TopUpWindow />);
  };

  return (
    <div className={cx("absolute top-0 right-0 bottom-0 left-0 w-full h-full z-10", className)}>
      <BlurWrapper modalContent={modal} isShow={!!modal} onClose={() => setModal(null)}>
        {/*Top panel*/}
        <div className="fixed top-0 w-full items-start justify-between flex">
          {signer &&
            <div className={"flex gap-12"}>
              <ConnectWallet />
              <GuiCard>
                <p>{`Current action - ${colorToAction[bulletColor]}`}</p>
                <p>{`Action percentage - ${borrowRepayPercentage}%`}</p>
              </GuiCard>
            </div>}
          {isPlaying && (
            <GuiCard className="cursor-pointer py-1 px-2" onClick={pauseGame}>
              X
            </GuiCard>
          )}
        </div>

        {/*Side panel*/}
        {!isPlaying && signer && <Balances className={"fixed top-1/2 left-10 -translate-y-1/2"} />}

        {/*Center panel*/}
        {!isPlaying && (
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
            {signer ? (
              <div className="flex gap-12 items-center justify-center">
                <GuiCard>
                  <audio
                    ref={audio}
                    src="audios/ambient.mp3"
                    autoPlay
                    onEnded={(event) => event.currentTarget.play()}
                  />

                  <h1>Controls</h1>
                  {map.map(({ name, keys }) => (
                    <p key={name}>{`${name} - ${keys.map((key) => `${key} `)}`}</p>
                  ))}
                </GuiCard>
                <GuiCard className="flex flex-col gap-12">
                  {isConnected ? isReadyForGame ? <>
                        <GuiButton
                          onClick={beginGame}
                        >
                          Play
                        </GuiButton>
                        <GuiButton
                          onClick={topUp}
                        >
                          Top up
                        </GuiButton>
                      </> :
                      <GuiButton
                        onClick={topUp}
                      >
                        Top up
                      </GuiButton>
                    :
                    <ConnectKitButton />}


                </GuiCard>
              </div>
            ) : (
              <ConnectWallet btnTitle={"Login"} />
            )}
          </div>
        )}

        {/*Bottom panel*/}
        {isPlaying && <div className={"fixed bottom-20 left-1/2 -translate-x-1/2"}>
          <div className={"relative flex"}>
            <div className={"absolute top-1/2 right-0 translate-x-full -translate-y-1/2 flex flex-col items-center"}>
              <GuiButton
                onClick={incBRP}
              >
                +
              </GuiButton>
              <span>{borrowRepayPercentage}%</span>
              <GuiButton
                onClick={decBRP}
              >
                -
              </GuiButton>
            </div>
            {[BulletColors.Green, BulletColors.Blue].map((color, index) => (
              <GuiCard onClick={() => setBulletColor(color)} key={color}
                       className={"cursor-pointer flex flex-col gap-2 items-center"}>
                <div className={"w-10 h-10"} style={{ backgroundColor: color }} />
                {bulletColor === color ? <span className={"font-bold"}>{index}</span> : <span>{index}</span>}
              </GuiCard>))}
          </div>
        </div>}
      </BlurWrapper>
    </div>
  );
};
