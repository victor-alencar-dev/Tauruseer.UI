import { Fade } from '@progress/kendo-react-animation';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';

export type NotificationType = 'none' | 'success' | 'error' | 'warning' | 'info';
export interface INotificationProps {
  alertMessage: string;
  type?: NotificationType;
  style?: React.CSSProperties;
  alert: boolean;
}
export const NotificationsAlert: React.FC<INotificationProps> = ({ alertMessage, type, alert }) => {
  return (
    <div>
      <NotificationGroup
        className="text-copy-notification"
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Fade enter={true} exit={true}>
          {alert && (
            <Notification type={{ style: type }} className="d-flex align-items-center">
              <span className="m-1">{alertMessage}</span>
            </Notification>
          )}
        </Fade>
      </NotificationGroup>
    </div>
  );
};
