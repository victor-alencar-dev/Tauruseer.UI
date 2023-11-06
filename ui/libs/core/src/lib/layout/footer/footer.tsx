import classNames from 'classnames';
import { TrStore } from '../../shared';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  const store = TrStore((state) => state);

  const footerClassName = classNames('footer', {
    'footer-collapsed': !store.lefNavToggle,
  });

  return (
    <footer className={footerClassName}>
      <label className="d-block typography-h4">&copy; {new Date().getFullYear()} Tauruseer. </label>
      <label className="d-block typography-h4"> US Patents: 11,080,162 & 11,288,167.</label>
    </footer>
  );
}

export default Footer;
