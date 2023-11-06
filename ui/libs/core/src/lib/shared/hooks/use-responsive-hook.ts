import { useMediaQuery } from 'react-responsive';
import { TrStore } from '../storage/storage';

export type Breakpoint = 'fullHD' | '2K' | '4K';

export type BreakPointMappings = {
  [key in Breakpoint]: string;
};

export interface ConditionalHeight {
  '4K': number;
  '2K': number;
  fullHD: number;
  laptop: number;
  menuClose: number;
  default: number;
}

const breakpointMappings: BreakPointMappings = {
  fullHD: '(min-width: 1920px)',
  '2K': '(min-width: 2560px)',
  '4K': '(min-width: 3840px)',
};

export const breakpointScreenRes: ConditionalHeight = {
  fullHD: 1920,
  menuClose: 1900,
  laptop: 1200,
  '2K': 2560,
  '4K': 3840,

  default: 0,
};

export const DEVICES = {
  FULL_HD: 'fullHD',
  LAPTOP: 'laptop',
  TWO_K: '2K',
  FOUR_K: '4K',
};
export const useResponsive = (breakpoint: Breakpoint) => {
  const matches = useMediaQuery({ query: breakpointMappings[breakpoint] });
  return matches;
};

export const getActualDeviceRes = () => {
  const store = TrStore((state) => state);
  const breakpointRes = store.innerWidth;
  let device = 'fullHD';
  if (breakpointRes >= breakpointScreenRes.laptop && breakpointRes < breakpointScreenRes.fullHD) {
    device = DEVICES.LAPTOP;
  }
  if (breakpointRes >= breakpointScreenRes.fullHD && breakpointRes < breakpointScreenRes['2K']) {
    device = DEVICES.FULL_HD;
  }
  if (breakpointRes >= breakpointScreenRes['2K'] && breakpointRes <= breakpointScreenRes['4K']) {
    device = DEVICES.TWO_K;
  }
  return device;
};
export default useResponsive;
