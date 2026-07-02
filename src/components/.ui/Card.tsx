"use client";

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  icon: ReactNode;
  headerActions?: ReactNode;
}

const Card = ({ children, title, subtitle, icon, headerActions }: CardProps) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <div className="card-header-content">
            <div className="card-icon">
              {icon}
            </div>
            <div>
              <h2>{title}</h2>
              <div className="card-subtitle">
                {subtitle}
              </div>
            </div>
          </div>
          {headerActions && (
            <div className="card-header-actions">
              {headerActions}
            </div>
          )}
        </div>
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;