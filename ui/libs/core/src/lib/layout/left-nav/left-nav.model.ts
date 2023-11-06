export interface ILeftNavItems {
  text: string;
  icon: string;
  route: string;
  isexpand: boolean;
  selected?: boolean;
  counter?: number;
}
export const LeftNavItems: Array<ILeftNavItems> = [
  {
    text: 'Asset Discovery',
    icon: 'k-i-align-left-element',
    route: '/',
    isexpand: true,
  },
  { text: 'Products', icon: 'k-i-windows', route: '/products', isexpand: true },
  { text: 'Portfolios', icon: 'k-i-group', route: '/portfolios', isexpand: true },
];
