import { Button } from '@progress/kendo-react-buttons';
import { Drawer, DrawerContent, DrawerSelectEvent } from '@progress/kendo-react-layout';
import React from 'react';
import { TrStore } from '../../shared/storage/storage';
import { CustomNavLink } from './left-nav.component';
import { ILeftNavItems, LeftNavItems } from './left-nav.model';

export function LeftNav() {
  let items: Array<ILeftNavItems> = [];
  const store = TrStore((state) => state);
  const data = 5;
  const [selectedId, setSelectedId] = React.useState<number>(1);
  // const { data, isLoading } = leftNavService();

  // If the app is running in development mode, show the development nav items
  const developmentNavItems: ILeftNavItems[] =
    process.env['NODE_ENV'] === 'development'
      ? [{ text: 'Components', icon: 'k-i-preview', route: '/components', isexpand: true }]
      : [];

  if (data) {
    items = [...LeftNavItems, ...developmentNavItems].map((i) => {
      if (i.counter !== undefined) {
        i.counter = data;
      }
      return {
        ...i,
      };
    });
  }

  const onSelect = (e: DrawerSelectEvent) => {
    setSelectedId(e.itemIndex);
  };

  return (
    <div>
      <Drawer
        expanded={store.lefNavToggle}
        position={'start'}
        mode={'push'}
        className={store.lefNavToggle ? 'drawer-open ' : 'drawer-closed'}
        mini={true}
        items={
          !data
            ? []
            : items.map((i: ILeftNavItems, index) => ({
                ...i,
                isexpand: store.lefNavToggle.toString(),
              }))
        }
        item={CustomNavLink}
        onSelect={onSelect}
        miniWidth={65}
        width={301}
      >
        <DrawerContent>
          <Button
            size="small"
            rounded="full"
            fillMode="solid"
            icon={store.lefNavToggle ? 'chevron-left' : 'chevron-right'}
            className={store.lefNavToggle ? 'toggle-left-nav-open' : 'toggle-left-nav-close'}
            onClick={() => {
              store.setToggle(!store.lefNavToggle);
            }}
          ></Button>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export default LeftNav;
