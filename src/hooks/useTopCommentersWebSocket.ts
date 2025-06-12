import { useEffect, useState } from "react";
import type { Commenter } from "../types/types";

interface WebSocketData {
  data: Commenter[];
}

const url = import.meta.env.VITE_TOP_COMMENTERS_WS_URL;

const useTopCommentersWebSocket = (): { commenters: Commenter[] } => {
  const [commenters, setCommenters] = useState<Commenter[]>([]);

  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "getRanking" }));
    };

    ws.onmessage = (event: MessageEvent) => {
      const data: WebSocketData = JSON.parse(event.data);
      console.log("msg:", data);

      setCommenters(data.data);
    };

    ws.onerror = (event: Event) => {
      console.log({ error: event });
    };

    return () => ws.close();
  }, []);

  return { commenters };
};

export default useTopCommentersWebSocket;
