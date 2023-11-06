export type TNotification = {
  id: number;
  accountId: number;
  userId: number;
  text: string;
  innerText: string;
  type: number;
  notificationDateUTC: string;
  isDismissed: boolean;
  externalServiceId: number;
  referenceId: number;
  payload: { [x: string]: string | number };
  updatedDateTimeUtc: null;
  eventTypeDescription: 'Announcement' | 'Event';
  eventType: 1 | 2; // 1 = Event, 2 = Announcement
  expirationDate: string;
  read: boolean;
  classification: 'None' | 'Info' | 'Warning' | 'Error' | 'Successful';
  url?: string;
  gravatarUrl?: string;
};

export enum EEventType {
  Announcement = 2,
  Event = 1,
}

export type TNotificationClassification = 'None' | 'Info' | 'Warning' | 'Error' | 'Successful';

export const INTENT_MARK_AS_READ = 'mark-as-read';
export const INTENT_DISMISS = 'dismiss';
