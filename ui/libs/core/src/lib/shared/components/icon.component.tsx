import classNames from 'classnames';
import { serviceDescriptionsIcons } from '../models/external-icon-source.model';
interface IIconProps {
  icon: string;
  size?: number;
  classes?: string;
  style?: React.CSSProperties;
  title?: string;
  solid?: boolean;
}

export const Icon = ({ icon, style, classes, size = 16 }: IIconProps) => {
  const iconClassName = classNames('k-icon', `k-i-${icon}`, classes);

  return <span style={{ fontSize: size, ...style }} className={iconClassName}></span>;
};

export const FaIcon = ({ icon, style, classes, size = 16, title, solid }: IIconProps) => {
  const isServiceIcon = serviceDescriptionsIcons[icon] !== undefined;

  const iconClassName = isServiceIcon
    ? classNames(serviceDescriptionsIcons[icon], classes)
    : classNames({ far: !solid }, { fas: solid }, `fa-${icon}`, classes);

  return <i title={title} style={{ fontSize: size, ...style }} className={iconClassName}></i>;
};
