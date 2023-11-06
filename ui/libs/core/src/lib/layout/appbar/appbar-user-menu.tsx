import { Avatar } from '@progress/kendo-react-layout';
import { Popup } from '@progress/kendo-react-popup';
import { Form } from '@remix-run/react';
import { TrStore } from '@tauruseer/core';
import { useRef, useState } from 'react';
import { useClickOutSide } from '../../shared/hooks/click-outside-hook';
import { IAppBarUserMenuProps, menuOptions } from './appbar-user-menu.model';

const UserAvatar = ({ imgSrc }: IAppBarUserMenuProps) => {
  const imgPath = imgSrc || '/user-placeholder.svg';

  return (
    <Avatar className="custom-avatar">
      <img src={imgPath} alt="user-profile" />
    </Avatar>
  );
};

const UserMenuHeader = ({ userName, email, gravatar }: IAppBarUserMenuProps) => (
  <div className="p-4 user-menu-header">
    <div className="d-flex align-items-center">
      <UserAvatar imgSrc={gravatar} />
      <div className="user-info">
        <p className="typography-h2">{userName}</p>
        <p className="typography-h2 text-muted">{email}</p>
      </div>
    </div>
  </div>
);

export const AppBarUserMenu = ({
  userName,
  onboardingCompleted,
  email,
  gravatar,
}: IAppBarUserMenuProps) => {
  const store = TrStore((state) => state);
  const anchor = useRef(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const filteredMenuOptions = menuOptions.filter((option) => {
    if (!store.showAccountOption) {
      return option.key !== 'accounts';
    }
    if (store.showAccountOption && option.key === 'accounts') {
      option.action.url = store.accountManagementUrl;
    }
    if (option.key === 'accounts' || option.key === 'managePolicies') {
      return onboardingCompleted ? option : null;
    }

    return option;
  });

  const handleClickOutside = (target: object) => {
    if (anchor?.current && !anchor?.current?.contains(target)) {
      setShowPopUp(false);
    }
  };

  useClickOutSide(ref, handleClickOutside);

  return (
    <>
      <button
        className="k-button k-button-md k-button-flat k-button-flat-base k-rounded-md user-menu-appbar"
        type="button"
        ref={anchor}
        onClick={() => setShowPopUp((prev) => !prev)}
      >
        <label className="d-none d-md-block me-3">{userName}</label>
        <UserAvatar imgSrc={gravatar} />
      </button>
      <Popup
        show={showPopUp}
        anchor={anchor.current}
        popupClass="user-menu-popup"
        anchorAlign={{ horizontal: 'right', vertical: 'bottom' }}
        popupAlign={{ horizontal: 'right', vertical: 'top' }}
      >
        <div ref={ref}>
          <UserMenuHeader userName={userName} email={email} gravatar={gravatar} />
          {filteredMenuOptions.map((option) => (
            <article className="menu-option" key={option.key}>
              <Form method={option.action.method} action={option.action.url}>
                <button
                  onClick={() => setShowPopUp(false)}
                  className="k-button k-button-md k-button-flat k-button-flat-base"
                  type="submit"
                >
                  <span
                    className={`${option.iconClass}`}
                    style={{ marginTop: '-3px', paddingLeft: '2px', color: '#1b2124' }}
                  />
                  {option.name}
                </button>
              </Form>
            </article>
          ))}
        </div>
      </Popup>
    </>
  );
};
