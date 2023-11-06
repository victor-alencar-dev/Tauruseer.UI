import { Button } from '@progress/kendo-react-buttons';
import React from 'react';
import { Card } from 'react-bootstrap';

export interface IMessageCardProps {
  title: string;
  message?: string;
  icon?: string;
  loading?: boolean;
  button?: {
    label: string;
    icon?: string;
    onClick: () => void;
  };
}

export const MessageCard: React.FC<IMessageCardProps> = ({
  title,
  message,
  icon,
  button,
  loading,
}) => {
  return title ? (
    <Card style={{ border: 'solid 1px #4231B4' }}>
      <Card.Body className={'d-flex align-items-center justify-content-between ps-4'}>
        <div>
          <Card.Title className="d-flex align-items-center typography-body2 text-primary-main font-medium">
            <i className={`far fa-xl ${icon}  me-2`} title={title} />
            {title}
          </Card.Title>
          {message && (
            <Card.Text className="typography-body1 text-sm" style={{ whiteSpace: 'pre-wrap' }}>
              {message}
            </Card.Text>
          )}
        </div>
        <div>
          {button && (
            <Button
              onClick={button.onClick}
              className="k-button k-button-lg k-button-solid k-button-solid-light k-rounded-md button button-secondary px-4"
              disabled={loading}
            >
              {button.icon && (
                <i
                  className={`fa ${button.icon} ${loading && `fa-spin`} me-2`}
                  title={button.label}
                ></i>
              )}
              {button.label}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  ) : null;
};
