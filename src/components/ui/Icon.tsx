import React from "react";
import "./Icon.css";

export interface IconProps {
  onClick?: () => void;
  className?: string;
  icon: React.ReactNode;
  title?: string;
}

const Icon: React.FC<IconProps> = ({ onClick, className = "", icon }) => {
  return (
    <div className={`icon ${className}`} onClick={onClick}>
      {icon}
    </div>
  );
};

export default Icon;
