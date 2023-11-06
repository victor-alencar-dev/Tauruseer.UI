import React from 'react';
import { FaIcon } from './icon.component';
import classNames from 'classnames';
import { CustomLink } from '@tauruseer/core';

export type TSmallCardProps = {
  icon: string;
  iconColor?: string;
  copy: string;
  status?: 'active' | 'inactive' | 'error';
  url: string;
  enabled: boolean;
};

export const SmallCard: React.FC<TSmallCardProps> = ({
  icon,
  copy,
  url,
  enabled,
  status = 'inactive',
  iconColor = '#000',
}) => {
  const Content = (
    <>
      <FaIcon icon={icon} size={48} style={{ color: iconColor }} />
      <p className="small-card__copy">{copy}</p>
    </>
  );

  return enabled ? (
    <CustomLink to={url} className={classNames('small-card', `small-card--${status}`)}>
      {Content}
    </CustomLink>
  ) : (
    <article className={classNames('small-card', `small-card--inactive`)}>{Content}</article>
  );
};
