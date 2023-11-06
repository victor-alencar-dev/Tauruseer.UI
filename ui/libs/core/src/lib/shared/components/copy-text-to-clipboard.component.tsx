import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NotificationsAlert } from './notification.component';

export interface ICopyTextToClipboardProps {
  copyText: string;
  alertMessage: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CopyTextToClipboard: React.FC<ICopyTextToClipboardProps> = ({
  copyText,
  children,
  className,
  alertMessage,
  style,
}) => {
  const [showAlert, setShowAlert] = React.useState(false);
  const scanKeyCopy = () => {
    setShowAlert(true);
    if (!showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div style={{ cursor: 'pointer', ...style }} className={className}>
      <CopyToClipboard text={copyText}>
        <span onClick={scanKeyCopy}>{children}</span>
      </CopyToClipboard>
      <NotificationsAlert alert={showAlert} alertMessage={alertMessage} type="success" />
    </div>
  );
};
