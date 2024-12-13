import React from "react";
import { IconBaseProps, IconType } from "react-icons";

export interface IconProps extends IconBaseProps {
  /** The React Icon component to render */
  icon: IconType;
  /** Additional class names for styling */
  className?: string;
  /** Size of the icon (e.g., "24px", 24, etc.) */
  size?: number | string;
  /** Color of the icon */
  color?: string;
}

const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = 24, color, className, ...rest }) => {
  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      {...rest}
    />
  );
};

export default Icon;
