import React, { useEffect, useRef, useState } from 'react';
import { Popup } from '@progress/kendo-react-popup';
import {
  EEventType,
  FaIcon,
  INTENT_DISMISS,
  INTENT_MARK_AS_READ,
  TNotification,
} from '@tauruseer/core';
import { useClickOutSide } from '../../../shared/hooks/click-outside-hook';
import { NoNotifications } from './no-notifications';
import { NotificationCard } from './notification-card';
import { NotificationAnnouncement, TNotificationAnnouncementProps } from './announcement';
import { useFetcher } from '@remix-run/react';

export type TAppBarNotificationProps = {
  data?: TNotification[];
};

export const AppBarNotification: React.FC<TAppBarNotificationProps> = ({ data }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementProps, setAnnouncementProps] = useState<TNotificationAnnouncementProps>({
    date: '',
    titleHTML: '',
    detailHTML: '',
  });

  const notificationFetcher = useFetcher();
  const isLoading = notificationFetcher.state !== 'idle' ? true : false;
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false);

  const markAsReadHandler = async (ids: number[]) => {
    if (!isLoading) {
      setHasSubmitted(true);
      notificationFetcher.submit(
        {
          intent: INTENT_MARK_AS_READ,
          ids: JSON.stringify(ids),
        },
        { method: 'post' },
      );
    }
  };

  const dismissHandler = async (ids: number[]) => {
    if (!isLoading) {
      setHasSubmitted(true);
      notificationFetcher.submit(
        {
          intent: INTENT_DISMISS,
          ids: JSON.stringify(ids),
        },
        { method: 'post' },
      );
    }
  };

  useEffect(() => {
    if (hasSubmitted && !isLoading) {
      setHasSubmitted(false);
    }
  }, [isLoading, hasSubmitted]);

  const anchor = useRef(null);
  const ref = useRef<HTMLInputElement>(null);

  const showBadge = data?.some((item) => !item.read);
  const notificationCount = data?.length ?? 0;
  const unReadNotificationCount = data && data.filter((item) => !item.read).length;
  const unreadNotifications = data && data.filter((item) => !item.read).length > 0;

  const handleClickOutside = (target: object) => {
    if (
      anchor.current &&
      !(anchor.current as HTMLInputElement).contains(target as HTMLInputElement)
    ) {
      setShowPopUp(false);

      if (!data) {
        return;
      }

      const eventIds = data
        .filter((item) => item.eventType === EEventType.Event)
        .map((item) => item.id);
      markAsReadHandler(eventIds);
    }
  };

  useClickOutSide(ref, handleClickOutside);

  const interpolate = ({
    payload,
    template,
  }: {
    payload?: { [x: string]: string | number };
    template: string;
  }) => {
    if (!payload) {
      return template;
    }
    const keys = Object.keys(payload);
    const result = keys.reduce((acc, key) => {
      return acc.replace(`{${key}}`, String(payload[key]));
    }, template);
    return result;
  };

  const createOnClickHandler = (item: TNotification) => {
    return () => {
      setShowAnnouncement(true);
      markAsReadHandler([item.id]);
      setAnnouncementProps({
        date: item.notificationDateUTC,
        titleHTML: interpolate({ payload: item.payload, template: item.text }),
        detailHTML: interpolate({ payload: item.payload, template: item.innerText }),
      });
    };
  };

  const markAllAsReadHandler = () => {
    if (!data) {
      return;
    }
    const eventIds = data.map((item) => item.id);
    markAsReadHandler(eventIds);
  };

  const notifications = data?.map((item) => {
    return (
      <NotificationCard
        read={item.read}
        key={item.id}
        classification={item.classification}
        messageHTML={interpolate({ payload: item.payload, template: item.text })}
        date={item.notificationDateUTC}
        type={item.eventType}
        onDismiss={() => dismissHandler([item.id])}
        onLinkClick={() => setShowPopUp(false)}
        onClick={
          item.eventType === EEventType.Announcement ? createOnClickHandler(item) : undefined
        }
        imageUrl={item.gravatarUrl}
        link={item.url}
      />
    );
  });

  return (
    <>
      <div className="notification-appbar">
        <button
          className="notification-appbar__button"
          onClick={() => setShowPopUp((state) => !state)}
          ref={anchor}
        >
          <FaIcon icon="bell" classes="notification-appbar__icon" solid size={16} />
          {showBadge && <div className="notification-appbar__badge"></div>}
        </button>
        <div className="notification-appbar__separator"></div>
      </div>
      <Popup show={showPopUp} anchor={anchor.current} margin={{ horizontal: 35, vertical: 10 }}>
        <article ref={ref} className={'notification-appbar__popup'}>
          {showAnnouncement && (
            <button
              className={'notification-appbar__popup-return-btn'}
              onClick={() => setShowAnnouncement(false)}
            >
              <FaIcon icon={'chevron-left'} size={14} />
            </button>
          )}
          <header className={'notification-appbar__popup-header'}>
            Latest Notifications {unReadNotificationCount ? `(${unReadNotificationCount})` : ''}
          </header>
          {showAnnouncement ? (
            <NotificationAnnouncement {...announcementProps} />
          ) : (
            <>
              <main className={'notification-appbar__popup-main'}>
                {notificationCount && notifications ? notifications : <NoNotifications />}
              </main>
              <footer className={'notification-appbar__popup-footer'}>
                <button
                  className={'notification-appbar__popup-footer-button'}
                  disabled={!notificationCount || !unreadNotifications}
                  onClick={markAllAsReadHandler}
                >
                  <FaIcon
                    icon={'check-double'}
                    classes={'notification-appbar__popup-footer-button-icon'}
                  />
                  <span>Mark all as read</span>
                </button>
              </footer>
            </>
          )}
        </article>
      </Popup>
    </>
  );
};
