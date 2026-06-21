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
import { useUserData } from "../shared/hooks/useUserData";
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

const HudStat: FC<{ label: string; value: ReactNode; danger?: boolean }> = ({
  label,
  value,
  danger,
}) => (
  <GuiCard className="px-4 py-2.5">
    <p className="hud-title">{label}</p>
    <p className={cx("font-display text-lg font-bold", danger ? "text-neon-red" : "text-white")}>
      {value}
    </p>
  </GuiCard>
);

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
  } = useGame();
  const { user } = useUserData();

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

  const lowHealth =
    !!user && typeof user.healthFactor === "number" && user.healthFactor < gameOverHealthFactor;

  const shortAddress = user?.address
    ? `${user.address.slice(0, 6)}…${user.address.slice(-4)}`
    : "—";

  return (
    <div className={cx("absolute inset-0 z-10 h-full w-full", className)}>
      {/* Ambient music — kept at the root so it keeps playing once the game
          starts (it used to live inside the lobby and stopped on Play). */}
      <audio ref={audio} src="audios/ambient.mp3" autoPlay loop />

      {/* Background (lobby only) */}
      {!isPlaying && (
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover opacity-40" src="./bg.png" alt="bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-space-950/70 via-space-950/30 to-space-950/90" />
        </div>
      )}

      <BlurWrapper modalContent={modal} isShow={!!modal} onClose={() => setModal(null)}>
        {/* Top HUD bar */}
        <div className="fixed inset-x-0 top-0 z-20 flex flex-wrap items-start justify-between gap-3 p-4">
          {signer && user && (
            <div className="flex flex-wrap items-stretch gap-3">
              <GuiCard className="flex items-center gap-3 px-3 py-2">
                <Avatar walletAddress={user.address ?? ""} className="h-10 w-10" />
                <div className="leading-tight">
                  <p className="hud-title">Wallet</p>
                  <p className="font-display text-sm font-semibold text-white">{shortAddress}</p>
                </div>
              </GuiCard>
              {/* Gameplay stats only matter while playing — hide them in the lobby
                  so they don't overlap the centered title. */}
              {isPlaying && (
                <>
                  <HudStat label="Action" value={colorToAction[bulletColor]} />
                  <HudStat label="Action %" value={`${borrowRepayPercentage}%`} />
                  <HudStat
                    label="Health factor"
                    value={user.healthFactor?.toFixed(2) ?? "—"}
                    danger={lowHealth}
                  />
                  <HudStat label="Net worth" value={`$${user.netWorth?.toFixed(2) ?? "0.00"}`} />
                </>
              )}
            </div>
          )}
          {isPlaying && (
            <GuiCard
              className="ml-auto flex h-10 w-10 cursor-pointer items-center justify-center p-0 text-white/70 transition-colors hover:text-neon-red"
              onClick={pauseGame}
            >
              ✕
            </GuiCard>
          )}
        </div>

        {/* Lobby */}
        {!isPlaying && (
          <div className="fixed inset-0 overflow-auto p-6 pt-28">
            <div className="flex min-h-full flex-col items-center justify-center">
              {signer ? (
                <div className="flex w-full max-w-5xl flex-col items-center gap-6">
                  <div className="text-center">
                    <h1 className="font-display text-3xl font-extrabold uppercase tracking-[0.3em] neon-text">
                      Space Token Hunt
                    </h1>
                    <p className="mt-1 text-sm text-white/50">Aave learning, gamified</p>
                  </div>

                  <div className="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-[1.4fr_1fr]">
                    <GuiCard className="p-6">
                      <h2 className="hud-title mb-3">Controls</h2>
                      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {map.map(({ name, keys }) => (
                          <div
                            key={name}
                            className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-1.5"
                          >
                            <span className="text-sm capitalize text-white/70">{name}</span>
                            <span className="font-display text-xs font-semibold text-neon-cyan">
                              {keys.join(" / ")}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-xs text-white/50">
                        <p>· A minimum top up of {minBalanceForGame} ETH is required to play.</p>
                        <p>· Game over when Health factor drops below {gameOverHealthFactor}.</p>
                      </div>
                    </GuiCard>

                    <GuiCard className="flex flex-col gap-3 p-6">
                      <h2 className="hud-title mb-1">Menu</h2>
                      {isConnected ? (
                        <>
                          {isReadyForGame && (
                            <GuiButton className="w-full animate-pulse-glow" onClick={beginGame}>
                              ▶ Play
                            </GuiButton>
                          )}
                          <GuiButton variant="secondary" className="w-full" onClick={topUp}>
                            Top up
                          </GuiButton>
                          <GuiButton variant="secondary" className="w-full" onClick={ratingBoard}>
                            Rating board
                          </GuiButton>
                          {!isReadyForGame && (
                            <p className="text-center text-xs text-neon-amber">
                              Top up at least {minBalanceForGame} ETH to start playing.
                            </p>
                          )}
                        </>
                      ) : (
                        <ConnectKitButton />
                      )}
                    </GuiCard>
                  </div>

                  <Balances />
                </div>
              ) : (
                <GuiCard className="flex flex-col items-center gap-5 px-12 py-12 text-center">
                  <h1 className="font-display text-2xl font-extrabold uppercase tracking-[0.3em] neon-text">
                    Space Token Hunt
                  </h1>
                  <p className="max-w-xs text-sm text-white/50">
                    Connect your wallet to start exploring DeFi the fun way.
                  </p>
                  <ConnectWallet className="z-50" btnTitle="Login" />
                </GuiCard>
              )}
            </div>
          </div>
        )}

        {/* Bottom action bar */}
        {isPlaying && (
          <div className="fixed bottom-10 left-1/2 z-20 -translate-x-1/2">
            <div className="flex items-end gap-3">
              <div className="flex gap-2">
                {[
                  BulletColors.Purple,
                  BulletColors.Orange,
                  BulletColors.Blue,
                  BulletColors.Green,
                ].map((color) => {
                  const active = bulletColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setBulletColor(color)}
                      className={cx(
                        "glass flex w-20 cursor-pointer flex-col items-center gap-2 p-3 transition-all",
                        active
                          ? "scale-105 ring-2 ring-offset-2 ring-offset-space-950"
                          : "opacity-70 hover:opacity-100",
                      )}
                      style={active ? { ["--tw-ring-color" as string]: color } : undefined}
                    >
                      <span
                        className="h-9 w-9 rounded-md"
                        style={{
                          backgroundColor: color,
                          boxShadow: active ? `0 0 16px -2px ${color}` : undefined,
                        }}
                      />
                      <span
                        className={cx(
                          "font-display text-xs uppercase tracking-wide",
                          active ? "font-bold text-white" : "text-white/70",
                        )}
                      >
                        {colorToAction[color]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <GuiCard className="flex flex-col items-center gap-1 p-2">
                <GuiButton variant="secondary" className="!px-3 !py-1" onClick={incBRP}>
                  +
                </GuiButton>
                <span className="font-display text-sm font-bold text-neon-cyan">
                  {borrowRepayPercentage}%
                </span>
                <GuiButton variant="secondary" className="!px-3 !py-1" onClick={decBRP}>
                  −
                </GuiButton>
              </GuiCard>
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
