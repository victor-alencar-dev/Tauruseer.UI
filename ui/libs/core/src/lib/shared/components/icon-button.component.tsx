// Get a list of all icons: https://www.telerik.com/kendo-angular-ui/components/icons/icon/icon-list/

import classNames from 'classnames';
import React from 'react';

interface IIconButtonProps {
  icon: string;
  onClick?: React.EventHandler<any>;
  size?: number;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const IconButton = ({
  icon,
  style,
  onClick,
  size = 16,
  disabled = false,
}: IIconButtonProps) => {
  const iconClassName = classNames('k-icon', icon);
  const wrapperClassName = classNames('icon-button', { 'icon-button-disabled': disabled });

  const doNothing = () => {};

  return (
    <div
      style={{ ...style, cursor: disabled ? 'auto' : 'pointer' }}
      onClick={disabled ? doNothing : onClick}
      className={wrapperClassName}
    >
      <span
        style={{
          fontSize: `${size}px`,
          color: disabled ? '#ccc' : 'inherit',
        }}
        className={iconClassName}
      ></span>
    </div>
  );
};
