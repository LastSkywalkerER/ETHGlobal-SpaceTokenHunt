"use client";

import { KeyboardControlsEntry } from "@react-three/drei";
import { ConnectWallet, useBalance, useSigner } from "@thirdweb-dev/react";
import cx from "classnames";
import { ConnectKitButton } from "connectkit";
import { FC, ReactNode, useRef, useState } from "react";
import { useAccount } from "wagmi";

import {
  BulletColors,
  colorToAction,
  gameOverHealthFactor,
  minBalanceForGame,
} from "../shared/constants/constants";
import { useGame } from "../shared/services/game/game.service";
import { useModal } from "../shared/services/modal";
import { Avatar } from "./Avatar";
import { Balances } from "./Balances";
import { BlurWrapper } from "./BlurWrapper";
import { GuiButton } from "./GuiButton";
import { GuiCard } from "./GuiCard";
import ErrorModal from "./Modals/ErrorModal/ErrorModal";
import { PageLoader } from "./Modals/PageLoader/PageLoader";
import { SuccessModal } from "./Modals/SuccessModal/SuccessModal";
import { RatingBoard } from "./RatingBoard";
import { TopUpWindow } from "./TopUpWindow";

interface GuiProps {
  map: KeyboardControlsEntry<string>[];
  className?: string;
}

export const GuiOverlay: FC<GuiProps> = ({ map, className }) => {
  const audio = useRef<HTMLAudioElement | null>(null);
  const { data } = useBalance();
  const { isConnected } = useAccount();
  const signer = useSigner();

  const [modal, setModal] = useState<ReactNode>(null);

  const { error, clearError, loading, success, clearSuccess } = useModal();

  const {
    setBulletColor,
    bulletColor,
    isPlaying,
    setIsPlaying,
    borrowRepayPercentage,
    incBRP,
    decBRP,
    user,
  } = useGame();

  const isReadyForGame = +(data?.displayValue || "0") >= minBalanceForGame;

  const beginGame = () => {
    audio.current?.play();
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const topUp = () => {
    setModal(<TopUpWindow />);
  };

  const ratingBoard = () => {
    setModal(<RatingBoard />);
  };

  return (
    <div className={cx("absolute top-0 right-0 bottom-0 left-0 w-full h-full z-10", className)}>
      {/*Backgound*/}
      {!isPlaying && (
        <div className={"absolute top-0 left-0 w-full h-full"}>
          <img className={"w-full h-full object-cover opacity-50"} src="./bg.png" alt="bg" />
        </div>
      )}

      <BlurWrapper modalContent={modal} isShow={!!modal} onClose={() => setModal(null)}>
        {/*Top panel*/}
        <div className="fixed top-0 w-full items-start justify-between flex">
          {signer && user && (
            <div className={"flex gap-12"}>
              <ConnectWallet />
              <GuiCard>
                <Avatar walletAddress={user.address} />
              </GuiCard>
              <GuiCard>
                <p>{`Current action - ${colorToAction[bulletColor]}`}</p>
                <p>{`Action percentage - ${borrowRepayPercentage}%`}</p>
              </GuiCard>
              <GuiCard>
                <p className={cx({ "!text-red-600": user.healthFactor < gameOverHealthFactor })}>
                  {`Health factor - ${user.healthFactor.toFixed(2)}`}
                </p>
                <p>{`Net worth - ${user.netWorth.toFixed(2)}$`}</p>
              </GuiCard>
            </div>
          )}
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
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
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
                  <div className={"bg-white w-full h-[1px] my-2"} />
                  <div className={"max-w-[200px]"}>
                    <span className={"text-sm"}>
                      * A minimum top up of {minBalanceForGame} ETH is required to play the game
                      <br />* Game over after Health factor below {gameOverHealthFactor}
                    </span>
                  </div>
                </GuiCard>
                <GuiCard className="flex flex-col gap-12">
                  {isConnected ? (
                    isReadyForGame ? (
                      <>
                        <GuiButton onClick={beginGame}>Play</GuiButton>
                        <GuiButton onClick={topUp}>Top&nbsp;Up</GuiButton>
                        <GuiButton onClick={ratingBoard}>Rating&nbsp;Board</GuiButton>
                      </>
                    ) : (
                      <>
                        <GuiButton onClick={topUp}>Top&nbsp;Up</GuiButton>
                        <GuiButton onClick={ratingBoard}>Rating&nbsp;Board</GuiButton>
                      </>
                    )
                  ) : (
                    <ConnectKitButton />
                  )}
                </GuiCard>
              </div>
            ) : (
              <ConnectWallet className={"z-50"} btnTitle={"Login"} />
            )}
          </div>
        )}

        {/*Bottom panel*/}
        {isPlaying && (
          <div className={"fixed bottom-20 left-1/2 -translate-x-1/2"}>
            <div className={"relative flex"}>
              <div
                className={
                  "absolute top-1/2 right-0 translate-x-full -translate-y-1/2 flex flex-col items-center"
                }
              >
                <GuiButton onClick={incBRP}>+</GuiButton>
                <span>{borrowRepayPercentage}%</span>
                <GuiButton onClick={decBRP}>-</GuiButton>
              </div>
              {[
                BulletColors.Purple,
                BulletColors.Orange,
                BulletColors.Blue,
                BulletColors.Green,
              ].map((color, index) => (
                <GuiCard
                  onClick={() => setBulletColor(color)}
                  key={color}
                  className={"cursor-pointer flex flex-col gap-2 items-center"}
                >
                  <div className={"w-10 h-10"} style={{ backgroundColor: color }} />
                  {bulletColor === color ? (
                    <span className={"font-bold"}>{colorToAction[color]}</span>
                  ) : (
                    <span>{colorToAction[color]}</span>
                  )}
                </GuiCard>
              ))}
            </div>
          </div>
        )}
      </BlurWrapper>

      {error && <ErrorModal error={error} onClose={clearError} />}
      {loading && !success && <PageLoader />}
      {success && !loading && <SuccessModal onClose={clearSuccess} />}
    </div>
  );
};
