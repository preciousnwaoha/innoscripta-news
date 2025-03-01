import React from "react";
import "./Checkbox.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <label className={`checkbox ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <span className="checkbox-custom"></span>
      <span className="checkbox-label-text">{label}</span>
    </label>
  );
};

export default Checkbox;
