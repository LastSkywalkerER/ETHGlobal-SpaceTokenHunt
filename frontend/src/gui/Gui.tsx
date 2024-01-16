import { KeyboardControlsEntry } from "@react-three/drei";
import { FC, HTMLAttributes, ReactElement, ReactNode, useEffect, useRef } from "react";
import cx from "classnames";
import { ConnectWallet, useSigner } from "@thirdweb-dev/react";
import { useGame } from "../shared/services/game.service";
import classNames from "classnames";

interface GuiProps {
  map: KeyboardControlsEntry<string>[];
  className?: string;
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
}

const GuiCard: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cx("bg-gray-800 bg-opacity-75 rounded-lg p-4 border border-gray-600", className)}
    >
      {children}
    </div>
  );
};

export const Gui: FC<GuiProps> = ({ map, className, isPlaying, setIsPlaying }) => {
  const audio = useRef<HTMLAudioElement | null>(null);
  const signer = useSigner();

  const { bullets, buyBullets: buyGameBullets, wreckedEthers, loadGameData } = useGame();

  useEffect(() => {
    signer && loadGameData(signer);
  }, [signer]);

  const beginGame = () => {
    audio.current?.play();
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const buyBullets = async () => {
    signer && (await buyGameBullets(signer, 100));
  };

  return (
    <div className={cx("", className)}>
      <div className="fixed top-0 w-full items-start justify-between flex">
        {signer && <ConnectWallet />}
        {isPlaying && (
          <GuiCard className="cursor-pointer py-1 px-2" onClick={pauseGame}>
            X
          </GuiCard>
        )}
      </div>

      {!isPlaying && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
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
                {signer ? (
                  <>
                    <h1>Player</h1>

                    <p>{`Bullets - ${bullets}`}</p>
                    <p>{`Wrecked Ethers - ${wreckedEthers}`}</p>
                  </>
                ) : null}
              </GuiCard>
              <GuiCard className="flex flex-col gap-12">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={beginGame}
                >
                  Play
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={buyBullets}
                >
                  Buy Bullets
                </button>
              </GuiCard>
            </div>
          ) : (
            <ConnectWallet />
          )}
        </div>
      )}
    </div>
  );
};
