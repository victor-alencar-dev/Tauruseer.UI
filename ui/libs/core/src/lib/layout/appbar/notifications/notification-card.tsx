import React from 'react';
import dayjs from 'dayjs';
import {
  Chip,
  CustomLink,
  EEventType,
  FaIcon,
  TChipModifier,
  TNotificationClassification,
} from '@tauruseer/core';
import { StatusIcon } from './status-icon';
import classNames from 'classnames';

type TNotificationCardProps = {
  date: string;
  messageHTML: string;
  classification: TNotificationClassification;
  type: EEventType;
  read: boolean;
  link?: string;
  imageUrl?: string;
  onDismiss: () => void;
  onLinkClick: () => void;
  onClick?: () => void;
};

export const NotificationCard: React.FC<TNotificationCardProps> = ({
  date,
  messageHTML,
  type,
  classification,
  imageUrl,
  read,
  onDismiss,
  link,
  onLinkClick,
  onClick,
}) => {
  const typeModifiers: {
    [x: number]: { copy: string; modifier: TChipModifier };
  } = {
    [EEventType.Event]: {
      copy: 'Event',
      modifier: 'primary',
    },
    [EEventType.Announcement]: {
      copy: 'Announcement',
      modifier: 'secondary',
    },
  };

  const [isDismissed, setIsDismissed] = React.useState<boolean>(false);

  const Content: React.FC = () => (
    <>
      <header className="notification-card__header">
        <h3 className="notification-card__header-title">
          {dayjs(date).format('MMMM D[th], YYYY')}
        </h3>
        <Chip
          copy={typeModifiers[type].copy}
          type={'general'}
          modifier={typeModifiers[type].modifier}
        />
      </header>
      <main className="notification-card__main">
        <StatusIcon status={classification} imageUrl={imageUrl} />
        {messageHTML && (
          <div
            className="notification-card__main-message"
            dangerouslySetInnerHTML={{ __html: messageHTML }}
          />
        )}
      </main>
    </>
  );

  return (
    <section
      className={classNames('notification-card', {
        'notification-card--new-event': !read && type === EEventType.Event,
        'notification-card--new-announcement': !read && type === EEventType.Announcement,
        'notification-card--dismissed': isDismissed,
      })}
    >
      <button
        className="notification-card__dismiss-btn"
        onClick={() => {
          onDismiss();
          setIsDismissed(true);
        }}
      >
        <FaIcon icon="close" size={10} />
      </button>
      {onClick ? (
        <button className="notification-card__content-wrapper" onClick={onClick}>
          <Content />
        </button>
      ) : link ? (
        <CustomLink to={link} className="notification-card__link" onClick={onLinkClick}>
          <div className="notification-card__content-wrapper">
            <Content />
          </div>
        </CustomLink>
      ) : (
        <div className="notification-card__content-wrapper">
          <Content />
        </div>
      )}
    </section>
  );
};
