import classNames from 'classnames';
import React, { useEffect } from 'react';
import { IconButton } from './icon-button.component';

export interface IAlertProps {
  title?: string;
  type: 'danger' | 'warning' | 'success' | 'info' | 'error';
  children?: React.ReactNode;
  onClose?: () => void;
  hideCloseButton?: boolean;
  disableAutoClose?: boolean;
  timeToClose?: number;
}

const DEFAULT_TIME_TO_CLOSE = 3500;

export const Alert = ({
  title,
  type,
  children,
  onClose,
  hideCloseButton,
  disableAutoClose,
  timeToClose,
}: IAlertProps) => {
  const alertClassName = classNames('alert', `alert-${type}`, 'alerts', 'mb-0');
  const timerSeconds = timeToClose ?? DEFAULT_TIME_TO_CLOSE;
  let timer: any;

  useEffect(() => {
    if (!disableAutoClose) {
      timer = setTimeout(() => {
        onClose?.();
      }, timerSeconds);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleCloseFromButton = () => {
    clearTimeout(timer);
    onClose?.();
  };

  return (
    <div className={alertClassName} role="alert" style={{ position: 'relative' }}>
      {!hideCloseButton && (
        <IconButton
          onClick={handleCloseFromButton}
          icon="k-i-x"
          style={{ position: 'absolute', right: 15 }}
        />
      )}

      {title && <label className="d-block alert-title fw-semibold">{title}</label>}
      <span className="alert-text">{children}</span>
    </div>
  );
};
