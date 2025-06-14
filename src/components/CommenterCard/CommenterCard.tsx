import type { Commenter } from "../../types/types";
import { getRankIcon } from "../../utils/functions";

interface CommenterCardProps {
  commenter: Commenter;
  rank: number;
  isAnimating: boolean;
  positionChange: number;
}

const defaultAvatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366f1'/%3E%3Ccircle cx='50' cy='35' r='15' fill='white'/%3E%3Cpath d='M25 85 Q25 65 50 65 Q75 65 75 85 Z' fill='white'/%3E%3C/svg%3E";

// Component for each individual commenter
const CommenterCard: React.FC<CommenterCardProps> = ({
  commenter,
  rank,
  isAnimating,
  positionChange,
}) => {
  return (
    <div
      className={`commenter-card ${isAnimating ? "animating" : ""}`}
      role="listitem"
    >
      <div className="commenter-info">
        <div className={`rank-icon rank-${rank}`}>{getRankIcon(rank)}</div>

        <div className="avatar-container">
          <img
            src={
              commenter.profileImageUrl ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${commenter.userLogin}`
            }
            alt={commenter.userLogin}
            className="avatar"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultAvatar;
            }}
          />
        </div>

        <div className="commenter-names">
          <span className="username">{commenter.userLogin ?? "NoName"}</span>
        </div>
      </div>

      <div className="comment-stats">
        <div className="comments-count">
          <span className="count">
            {commenter.messageCount.toLocaleString()}
          </span>
          <span className="label">comments</span>
        </div>

        {positionChange !== 0 && (
          <div
            className={`position-change ${positionChange > 0 ? "up" : "down"}`}
          >
            {positionChange > 0 ? "▲" : "▼"}
            <span>{Math.abs(positionChange)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommenterCard;
