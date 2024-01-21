import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { baseURL } from "../constants/constants";
import { useGame } from "../services/game/game.service";

export const useUserData = () => {
  const userSocket = useRef<Socket | null>(null);
  const { user, setUser } = useGame();

  useEffect(() => {
    if (!user || userSocket.current) return;

    userSocket.current = io(`${baseURL}/user`, {
      withCredentials: true,
      transports: ["websocket"],
      query: {
        userUuid: user.uuid,
      },
    });

    userSocket.current.on("connect", console.log);
    userSocket.current.on("disconnect", console.log);
    userSocket.current.on("update", (data) => data && setUser(data));

    return () => {
      userSocket.current?.off("connect");
      userSocket.current?.off("disconnect");

      userSocket.current?.disconnect();
    };
  }, [user]);

  return { user };
};
