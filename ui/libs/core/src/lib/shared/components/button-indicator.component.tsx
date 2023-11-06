import { Button } from '@progress/kendo-react-buttons';
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import { useNavigate } from '@remix-run/react';
import classNames from 'classnames';

interface IPropsBtn {
  title: string;
  link?: boolean;
  to?: string;
  Event?: React.EventHandler<any>;
  id: number;
  valueIndicator?: number | string;
  isActive: boolean;
  hasIndicator: boolean;
  disabled?: boolean;
}

export const ButtonIndicator = ({
  title,
  link,
  to,
  Event,
  id,
  isActive,
  valueIndicator,
  hasIndicator,
  disabled,
}: IPropsBtn) => {
  const classN = classNames({ 'button button-primary': isActive, 'button button-text': !isActive });
  const badgeContainerClassNames = classNames({ 'me-4': hasIndicator, 'ms-3': !hasIndicator });
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(to as string);
  };

  const handleEvent = () => {
    if (Event) Event(id);
  };

  return (
    <BadgeContainer className={badgeContainerClassNames}>
      <Button
        size="large"
        themeColor={isActive ? 'dark' : 'light'}
        fillMode="solid"
        rounded="medium"
        className={classN}
        disabled={disabled}
        onClick={link ? handleNavigate : handleEvent}
      >
        {title}
      </Button>
      {hasIndicator && (
        <Badge position="edge" rounded="full">
          {valueIndicator}
        </Badge>
      )}
    </BadgeContainer>
  );
};
export default ButtonIndicator;
