import { FaIcon, TNotificationClassification } from '@tauruseer/core';

type TStatusIconProps = {
  status: TNotificationClassification;
  imageUrl?: string;
};

export const StatusIcon: React.FC<TStatusIconProps> = ({ status, imageUrl }) => {
  const getStatusModifiers = (status: TNotificationClassification) => {
    switch (status) {
      case 'Successful': {
        return {
          icon: 'check',
          color: '#378632',
          background: '#37863233',
        };
      }
      case 'Warning': {
        return {
          icon: 'triangle-exclamation',
          color: '#FF961F',
          background: '#FF961F26',
        };
      }
      case 'Error': {
        return {
          icon: 'triangle-exclamation',
          color: '#FFC107',
          background: '#DB4A4A33',
        };
      }
      case 'Info': {
        return {
          icon: 'circle-info',
          color: '#2563EB',
          background: '#2563EB33',
        };
      }
      default: {
        return {
          icon: 'circle-info',
          color: '#2563EB',
          background: '#2563EB33',
        };
      }
    }
  };

  return imageUrl ? (
    <img src={imageUrl} alt="status" className="status-icon" />
  ) : (
    <FaIcon
      icon={getStatusModifiers(status).icon}
      size={17}
      style={{
        color: getStatusModifiers(status).color,
        backgroundColor: getStatusModifiers(status).background,
      }}
      classes="status-icon"
    />
  );
};
