
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  className = '' 
}) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-5 transition-all duration-300 hover:border-yellow/30 ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="p-2 rounded-md bg-secondary/50">
          <Icon size={18} className="text-yellow" />
        </div>
      </div>
      
      <div className="flex items-baseline">
        <h3 className="text-2xl font-semibold">{value}</h3>
        
        {trend && (
          <span className={`ml-2 text-xs flex items-center ${
            trend.positive ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
