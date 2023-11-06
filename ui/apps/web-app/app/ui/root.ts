// modules
import kendoUiStyles from '@progress/kendo-theme-bootstrap/dist/all.css';
import bootstrap from '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import core from '../styles/core/core.css';
import globalStyles from '../styles/global.css';
import icons from '../styles/icons.css';
import root from '../styles/root.css';
import palette from '../styles/theme/palette.css';
import theme from '../styles/theme/theme.css';

export const LinkRoot = [
  {
    rel: 'icon',
    href: '/favicon.ico',
    type: 'image/x-icon',
  },
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: kendoUiStyles },
  { rel: 'stylesheet', href: bootstrap },
  { rel: 'stylesheet', href: icons },
  { rel: 'stylesheet', href: root },
  { rel: 'stylesheet', href: core },
  { rel: 'stylesheet', href: palette },
  { rel: 'stylesheet', href: theme },
];
export const MetaRoot = { title: 'Start Left' };
