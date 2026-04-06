import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';
import './StatCard.css';

const StatCard = ({ title, value, icon: Icon, trend, trendDirection = 'up', color = 'green' }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-info">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-value">{value}</span>
        {trend && (
          <span className={`stat-card-trend ${trendDirection}`}>
            {trendDirection === 'up' ? (
              <HiArrowTrendingUp size={14} />
            ) : (
              <HiArrowTrendingDown size={14} />
            )}
            {trend}
          </span>
        )}
      </div>
      {Icon && (
        <div className={`stat-card-icon ${color}`}>
          <Icon />
        </div>
      )}
    </div>
  );
};

export default StatCard;
