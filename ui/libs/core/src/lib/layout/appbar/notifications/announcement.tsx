import { Chip } from '@tauruseer/core';
import dayjs from 'dayjs';

export type TNotificationAnnouncementProps = {
  date: string;
  titleHTML: string;
  detailHTML: string;
};

export const NotificationAnnouncement: React.FC<TNotificationAnnouncementProps> = ({
  date,
  titleHTML,
  detailHTML,
}) => {
  return (
    <main className="announcement">
      <Chip copy="Announcement" type="general" modifier="secondary" />
      <p className="announcement__date"> {dayjs(date).format('MMMM D[th], YYYY')}</p>
      <h3 className="announcement__title" dangerouslySetInnerHTML={{ __html: titleHTML ?? '' }} />
      <p className="announcement__content" dangerouslySetInnerHTML={{ __html: detailHTML ?? '' }} />
    </main>
  );
};
