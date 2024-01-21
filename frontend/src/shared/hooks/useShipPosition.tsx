import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { baseURL } from "../constants/constants";
import { useGame } from "../services/game/game.service";

export const useShipPosition = () => {
  const shipSocket = useRef<Socket | null>(null);
  const { user } = useGame();

  useEffect(() => {
    if (!user || shipSocket.current) return;

    shipSocket.current = io(`${baseURL}/ship`, {
      withCredentials: true,
      transports: ["websocket"],
      query: {
        userUuid: user.uuid,
      },
    });

    shipSocket.current.on("connect", console.log);
    shipSocket.current.on("disconnect", console.log);

    return () => {
      shipSocket.current?.off("connect");
      shipSocket.current?.off("disconnect");
    };
  }, [user]);

  const sendShipPosition = useCallback((shipPosition: { x: number; y: number; z: number }) => {
    if (!shipSocket.current) return;

    shipSocket.current.emit("shipPosition", shipPosition);
  }, []);

  return { sendShipPosition };
};
