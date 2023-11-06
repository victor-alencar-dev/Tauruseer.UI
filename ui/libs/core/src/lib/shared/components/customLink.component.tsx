import { Link } from '@remix-run/react';
import React from 'react';
import { FaIcon } from './icon.component';

type TCustomLinkProps = {
  to: string;
  className?: string;
  children: React.ReactNode;
  showExternalIcon?: boolean;
  [x: string]: any;
};

export const CustomLink: React.FC<TCustomLinkProps> = ({
  to,
  children,
  className,
  showExternalIcon,
  ...args
}) => {
  const isInternal = to.length > 0 ? to[0] === '/' : false;

  return isInternal ? (
    <Link to={to} className={className} {...args}>
      {children}
    </Link>
  ) : (
    <a href={to} className={className} target="_blank" rel="noreferrer" {...args}>
      {children}
      {showExternalIcon && <FaIcon icon="arrow-up-right-from-square" classes="ms-2" />}
    </a>
  );
};
