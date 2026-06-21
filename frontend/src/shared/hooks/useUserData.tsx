import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { normalizeUser } from "../api/Users";
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
    // Backend emits the "Update" event (capital U) with `walletAddress`.
    const onUpdate = (data: unknown) => data && setUser(normalizeUser(data as never));
    userSocket.current.on("Update", onUpdate);
    userSocket.current.on("update", onUpdate);

    return () => {
      userSocket.current?.off("connect");
      userSocket.current?.off("disconnect");

      userSocket.current?.disconnect();
    };
  }, [user]);

  return { user };
};
