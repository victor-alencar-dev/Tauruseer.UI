import { TNotification } from '@tauruseer/core';
import { http } from '../fetch-client.server';

export const getNotificationList = async () => {
  try {
    const { data } = await http.get(`/notifications/`);
    const result = data.data.map((notification: TNotification) => ({
      ...notification,
      payload: JSON.parse(notification.payload as any),
    }));

    return result;
  } catch (error) {
    return null;
  }
};

export const dismissNotification = async (ids: string[]) => {
  try {
    const params = ids.map((id) => `notificationIds=${id}`).join('&');

    const { data } = await http.post(`/notifications/dismiss?${params}`);
    return data || 'success';
  } catch (error) {
    return null;
  }
};

export const markAsReadNotification = async (ids: string[]) => {
  try {
    const params = ids.map((id) => `notificationIds=${id}`).join('&');

    const { data } = await http.post(`/notifications/markasread?${params}`);
    return data || 'success';
  } catch (error) {
    return null;
  }
};
