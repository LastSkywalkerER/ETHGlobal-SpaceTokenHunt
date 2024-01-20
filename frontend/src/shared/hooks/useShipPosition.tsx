import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { baseURL } from "../constants/constants";

export const useShipPosition = () => {
  const shipSocket = useRef<Socket | null>(null);

  useEffect(() => {
    shipSocket.current = io(`${baseURL}/ship`, {
      transports: ["websocket"],
      query: {
        userUuid: "userUuid",
      },
    });

    shipSocket.current.on("connect", console.log);
    shipSocket.current.on("disconnect", console.log);

    return () => {
      shipSocket.current?.off("connect");
      shipSocket.current?.off("disconnect");
    };
  }, []);

  const sendShipPosition = useCallback((shipPosition: { x: number; y: number; z: number }) => {
    if (!shipSocket.current) return;

    shipSocket.current.emit("shipPosition", shipPosition);
  }, []);

  return { sendShipPosition };
};
