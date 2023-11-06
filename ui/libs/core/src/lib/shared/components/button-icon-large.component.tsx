import { Tooltip } from '@progress/kendo-react-tooltip';
import { FaIcon } from './icon.component';
import { CustomLink } from './customLink.component';

export type ButtonIconLargeProps = {
  onClick?: () => void;
  disabled?: boolean;
  icon: string;
  label: string;
  className?: string;
  color?: string;
  title?: string;
  url?: string;
  modifier?: {
    icon: string;
    color: string;
  };
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonIconLarge: React.FC<ButtonIconLargeProps> = ({
  onClick,
  disabled,
  icon,
  label,
  className,
  color,
  modifier,
  url,
  ...props
}) => {
  const element = (
    <Tooltip anchorElement="target" position="top">
      <button className={'button-icon-large'} onClick={onClick} disabled={disabled} {...props}>
        <div className="button-icon-large__icon">
          <FaIcon
            icon={icon}
            size={48}
            style={{ color: color }}
            classes="button-icon-large__icon-primary"
          />
          {modifier && (
            <FaIcon
              classes="button-icon-large__icon-modifier"
              icon={modifier.icon}
              size={23}
              style={{ color: modifier.color }}
            />
          )}
        </div>
        <p>{label}</p>
      </button>
    </Tooltip>
  );

  return url ? (
    <CustomLink to={url} style={{ textDecoration: 'none' }}>
      {element}
    </CustomLink>
  ) : (
    element
  );
};
