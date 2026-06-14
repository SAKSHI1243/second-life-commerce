import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium text-sm transition-all focus-visible:ring-2 focus-visible:ring-amazon-orange outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-text border border-[#FCD200]',
    secondary: 'bg-amazon-orange hover:bg-[#F3A847] text-amazon-text border border-[#A88734]',
    outline: 'bg-white hover:bg-gray-50 text-amazon-text border border-amazon-border shadow-sm'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
