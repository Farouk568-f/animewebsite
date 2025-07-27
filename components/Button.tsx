import React from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 transform active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background-color)]';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] text-white shadow-lg shadow-[color:var(--color-primary)]/20 hover:shadow-2xl hover:shadow-[color:var(--color-primary)]/30 focus-visible:ring-[color:var(--color-primary)] hover:-translate-y-0.5',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 focus-visible:ring-slate-500',
  };

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;