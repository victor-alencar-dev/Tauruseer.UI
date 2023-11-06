import { Link } from '@remix-run/react';
import { FaIcon } from './icon.component';
import { CustomLink } from './customLink.component';

export type TChipIcon = string;
export type TChipType = 'status' | 'badge' | 'breadcrumb' | 'severity' | 'general';
export type TChipModifier =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success'
  | 'critical'
  | 'medium'
  | 'low'
  | 'high';

export type TChipProps = {
  iconRight?: string;
  icon?: string;
  copy: string;
  type: TChipType;
  modifier?: TChipModifier;
  url?: string;
};

export const Chip = ({ iconRight, icon, type, modifier, copy, url }: TChipProps) => {
  const chipDom = (
    <span
      className={`ts-chip-${type} ${modifier && `ts-chip-${type}--${modifier}`} ${
        url && `ts-chip-${type}--link`
      }`}
    >
      {icon && (
        <FaIcon icon={icon} size={type === 'breadcrumb' ? 10 : 13} classes="ts-chip__icon" />
      )}
      {copy}
      {iconRight && (
        <FaIcon
          icon={iconRight}
          size={type === 'breadcrumb' ? 10 : 13}
          classes="ts-chip__icon-right"
        />
      )}
    </span>
  );

  return url ? <CustomLink to={url}>{chipDom}</CustomLink> : chipDom;
};
