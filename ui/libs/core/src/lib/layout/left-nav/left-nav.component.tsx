import { DrawerItem, DrawerItemProps } from '@progress/kendo-react-layout';
import React from 'react';

import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import { Link, useLocation } from '@remix-run/react';
import classNames from 'classnames';

interface ICounterEleProps {
  element: React.ReactNode;
  counterValue: number;
  displayCounter: boolean;
}

const counterElement: React.FC<ICounterEleProps> = (props) => {
  const { element, counterValue } = props;

  if (!counterValue || !props.displayCounter) {
    return <>{element}</>;
  }

  return (
    <BadgeContainer>
      {element}
      <Badge position="edge" rounded="full" size="small">
        {counterValue}
      </Badge>
    </BadgeContainer>
  );
};

export const CustomNavLink = (props: DrawerItemProps) => {
  const isExp = props['isexpand'] === 'true';
  const displayOnIcon = !isExp;
  const displayOnLabel = !!isExp;
  const { pathname } = useLocation();

  const pathNameEqualsRoute =
    pathname.includes(props['route']) && props['text'] !== 'Asset Discovery';

  const isAssetDiscovery =
    pathname.includes('/asset-discovery') && props['text'] === 'Asset Discovery';

  const isEmptyLink = ['Dashboard', 'Portfolios', 'Risk'].includes(props['text'] as string);

  const drawerItemClassName = classNames({
    'k-selected': (pathNameEqualsRoute || isAssetDiscovery) && !isEmptyLink,
  });

  return (
    <Link to={props['route']} prefetch="intent">
      <DrawerItem {...props} className={drawerItemClassName}>
        {counterElement({
          counterValue: props['counter'],
          displayCounter: displayOnIcon,
          element: <span className={'k-icon ' + props.icon} />,
        })}

        <div className="item-wrap">
          {counterElement({
            counterValue: props['counter'],
            displayCounter: displayOnLabel,
            element: <div>{props.text}</div>,
          })}
        </div>
      </DrawerItem>
    </Link>
  );
};
