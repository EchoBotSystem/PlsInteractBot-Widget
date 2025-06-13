import { useEffect, useRef, useState } from "react";
import type { Commenter } from "../types/types";

interface WebSocketData {
  data: Commenter[];
}

const url = import.meta.env.VITE_TOP_COMMENTERS_WS_URL;

const useTopCommentersWebSocket = (): { commenters: Commenter[] } => {
  const [commenters, setCommenters] = useState<Commenter[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url) return;

    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      ws.current = new WebSocket(`${url}?streamer=elcomebabillas`);

      ws.current.onopen = () => {
        ws.current!.send(JSON.stringify({ action: "getRanking" }));
      };

      ws.current.onmessage = (event: MessageEvent) => {
        const data: WebSocketData = JSON.parse(event.data);
        console.log("msg:", data);

        setCommenters(data.data);
      };

      ws.current.onerror = (event: Event) => {
        console.log({ error: event });
      };
    }

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  return { commenters };
};

export default useTopCommentersWebSocket;
