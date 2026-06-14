import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-white border border-amazon-border rounded-md p-5 ${className}`}>
      {title && <h2 className="text-xl font-bold mb-4 text-amazon-text">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
