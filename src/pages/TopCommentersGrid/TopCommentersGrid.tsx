import React from "react";
import styles from "./styles.module.css";
import useTopCommentersWebSocket from "../../hooks/useTopCommentersWebSocket";

const TopCommenters: React.FC = () => {
  const { commenters: wsCommenters } = useTopCommentersWebSocket();

  // Reorganizar para mostrar en orden: 2do, 1ro, 3ro
  const displayOrder =
    wsCommenters.length >= 3
      ? [wsCommenters[1], wsCommenters[0], wsCommenters[2]]
      : wsCommenters;

  const getPositionLabel = (index: number): string => {
    if (wsCommenters.length < 3) {
      return ["1st", "2nd", "3rd"][index] || "";
    }
    return ["2nd", "1st", "3rd"][index] || "";
  };

  const getPositionClass = (index: number): string => {
    if (wsCommenters.length < 3) {
      return ["first", "second", "third"][index] || "";
    }
    return ["second", "first", "third"][index] || "";
  };

  const generateAvatar = (userLogin: string): string => {
    // Generar un avatar simple basado en las iniciales
    const initials = userLogin.slice(0, 2).toUpperCase();
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
    ];
    const colorIndex = userLogin.length % colors.length;

    const svg = `
      <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="30" fill="${colors[colorIndex]}"/>
        <text x="30" y="38" font-family="Arial, sans-serif" font-size="18" font-weight="bold" 
              text-anchor="middle" fill="white">${initials}</text>
      </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return (
    <div className={styles["top3-commenters-widget"]}>
      <div className={styles["podium"]}>
        {displayOrder.map((commenter, index) => (
          <div
            key={commenter.userId}
            className={`${styles["podium-item"]} ${
              styles[getPositionClass(index)]
            }`}
          >
            <div className={styles["avatar-container"]}>
              <img
                src={
                  commenter.profileImageUrl ||
                  generateAvatar(commenter.userLogin)
                }
                alt={commenter.userLogin}
                className={styles["avatar"]}
              />
            </div>
            <div className={styles["username"]}>{commenter.userLogin}</div>
            <div className={styles["message-count"]}>
              {commenter.messageCount}
            </div>
            <div className={styles["position-badge"]}>
              {getPositionLabel(index)}
            </div>
          </div>
        ))}
      </div>
      <div className={styles["title"]}>Top comentarios</div>
    </div>
  );
};

export default TopCommenters;
