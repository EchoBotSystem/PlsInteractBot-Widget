import React, { useState, useEffect, useRef } from "react";
import CommenterCard from "./components/CommenterCard/CommenterCard";
import useTopCommentersWebSocket from "./hooks/useTopCommentersWebSocket";

// Componente principal
const TopCommentersWidget: React.FC = () => {
  const [animatingCommenters, setAnimatingCommenters] = useState<Set<string>>(
    new Set()
  );
  const previousPositions = useRef<Record<string, number>>({});

  const { commenters: wsCommenters } = useTopCommentersWebSocket();

  useEffect(() => {
    const movedCommenters = new Set<string>();
    const currentPositions: Record<string, number> = {};

    wsCommenters.forEach((commenter, index) => {
      currentPositions[commenter.username] = index;
      if (previousPositions.current[commenter.username] !== index) {
        movedCommenters.add(commenter.username);
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

          <div className="commenters-count">10</div>
        </div>
      </div>

      <div className="commenters-list">
        {wsCommenters.map((commenter, index) => {
          const currentRank = index;
          const previousRank =
            previousPositions.current[commenter.username] ?? currentRank;
          const positionChange = previousRank - currentRank;

          return (
            <CommenterCard
              key={commenter.username}
              commenter={commenter}
              rank={index + 1}
              isAnimating={animatingCommenters.has(commenter.username)}
              positionChange={positionChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopCommentersWidget;
