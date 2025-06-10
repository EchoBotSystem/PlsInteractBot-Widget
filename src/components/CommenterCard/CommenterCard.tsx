import type { Commenter } from "../../types/types";

interface CommenterCardProps {
  commenter: Commenter;
  rank: number;
  isAnimating: boolean;
  positionChange: number;
}

const getRankIcon = (rank: number): string => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank.toString();
};

const defaultAvatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366f1'/%3E%3Ccircle cx='50' cy='35' r='15' fill='white'/%3E%3Cpath d='M25 85 Q25 65 50 65 Q75 65 75 85 Z' fill='white'/%3E%3C/svg%3E";

// Componente para cada comentador individual
const CommenterCard: React.FC<CommenterCardProps> = ({
  commenter,
  rank,
  isAnimating,
  positionChange,
}) => {
  return (
    <div className={`commenter-card ${isAnimating ? "animating" : ""}`}>
      <div className="commenter-info">
        <div className={`rank-icon rank-${rank}`}>{getRankIcon(rank)}</div>

        <div className="avatar-container">
          <img
            src={
              commenter.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${commenter.username}`
            }
            alt={commenter.username}
            className="avatar"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultAvatar;
            }}
          />
        </div>

        <div className="commenter-names">
          <span className="username">{commenter.username}</span>
          <span className="display-name">
            {commenter.displayName || commenter.username}
          </span>
        </div>
      </div>

      <div className="comment-stats">
        <div className="comments-count">
          <span className="count">{commenter.comments.toLocaleString()}</span>
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
