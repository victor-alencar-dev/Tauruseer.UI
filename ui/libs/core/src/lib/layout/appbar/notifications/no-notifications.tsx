import { FaIcon } from '@tauruseer/core';
import React from 'react';

export const NoNotifications: React.FC = () => (
  <div className="notification-appbar__popup-empty">
    <FaIcon icon="bell-slash" classes="notification-appbar__popup-empty-icon" size={76} />
    <p className="notification-appbar__popup-empty-text">No new notifications</p>
    <p className="notification-appbar__popup-empty-subtext">Come back later</p>
  </div>
);
