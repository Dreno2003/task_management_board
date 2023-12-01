import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ to, label }) => {
  return (
    <Link to={to} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {label}
    </Link>
  );
}

export default Button;
