import React from 'react';
import { IconType } from 'react-icons';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";

interface IconProps {
  size?: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}

const createIcon = (IconComponent: IconType): React.FC<IconProps> => {
  const IconWrapper: React.FC<IconProps> = ({ size = "20px", color = "var(--icon-color)", onClick, className }) => (
    <IconComponent size={size} color={color} onClick={onClick} className={className} />
  );

  IconWrapper.displayName = `Icon(${IconComponent.name})`;

  return IconWrapper;
};

export const Icons = {
  visible: createIcon(IoEye),
  inVisible: createIcon(IoEyeOff),
  adminPanel: createIcon(GiProgression)
};
