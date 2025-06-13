import React, { useState, useEffect, useRef, useMemo } from "react";
import CommenterCard from "./components/CommenterCard/CommenterCard";
import useTopCommentersWebSocket from "./hooks/useTopCommentersWebSocket";

// Componente principal
const TopCommentersWidget: React.FC = () => {
  const [animatingCommenters, setAnimatingCommenters] = useState<Set<string>>(
    new Set()
  );
  const previousPositions = useRef<Record<string, number>>({});
  const params = new URLSearchParams(document.location.search);
  const { commenters: wsCommenters } = useTopCommentersWebSocket();

  const listLength = useMemo(() => {
    const commentersLength =
      params.has("list_length") && Number(params.get("list_length"))
        ? Number(params.get("list_length"))
        : 0;

    return commentersLength;
  }, [params]);

  const commenters = useMemo(() => {
    if (listLength <= 0) return wsCommenters;

    return wsCommenters.slice(0, listLength);
  }, [listLength, wsCommenters]);

  useEffect(() => {
    const movedCommenters = new Set<string>();
    const currentPositions: Record<string, number> = {};

    wsCommenters.forEach((commenter, index) => {
      currentPositions[commenter.userId] = index;
      if (previousPositions.current[commenter.userId] !== index) {
        movedCommenters.add(commenter.userId);
      }
    });

    previousPositions.current = currentPositions;
    setAnimatingCommenters(movedCommenters);

    // Limpiar animaciones después de 1 segundo
    setTimeout(() => {
      setAnimatingCommenters(new Set<string>());
    }, 1000);
  }, [wsCommenters]);

  return (
    <div className="top-commenters-widget">
      <div className="widget-header">
        <div className="header-content">
          <div className="header-left">
            <div className="icon-container">💬</div>
            <div>
              <h1 className="title">Top Commenters</h1>
              <div className="live-indicator">
                <div className="live-badge"></div>
                <span className="live-text">LIVE</span>
              </div>
            </div>
          </div>

          <div className="commenters-count" data-testid="commenters-count">
            10
          </div>
        </div>
      </div>

      <div className="commenters-list">
        {commenters.map((commenter, index) => {
          const currentRank = index;
          const previousRank =
            previousPositions.current[commenter.userId] ?? currentRank;
          const positionChange = previousRank - currentRank;

          return (
            <CommenterCard
              key={commenter.userId}
              commenter={commenter}
              rank={index + 1}
              isAnimating={animatingCommenters.has(commenter.userId)}
              positionChange={positionChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopCommentersWidget;
