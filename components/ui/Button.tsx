import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  children, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center gap-3 justify-center font-extrabold transition-all duration-300 focus:outline-none disabled:opacity-50 tracking-tight active:scale-[0.98]";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_8px_30px_rgb(37,99,235,0.2)] hover:shadow-[0_12px_40px_rgb(37,99,235,0.3)]",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border-2 border-slate-100 text-slate-900 hover:border-blue-600 hover:text-blue-600 bg-white"
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-base",
    lg: "px-10 py-5 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;