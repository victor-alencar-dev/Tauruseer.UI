import { AutoComplete, AutoCompleteChangeEvent } from '@progress/kendo-react-dropdowns';
import { useFetcher, useNavigate } from '@remix-run/react';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { AppBarUserMenu } from './appbar-user-menu';
import { AppBarNotification } from './notifications/appbar-notification';
import { TNotification } from '@tauruseer/core';

export interface AppBarProps {
  isDirt: boolean;
  userName: string;
  email: string;
  gravatar: string;
  notificationList?: TNotification[];
}
export const SearchItem = ({ Entity, Description }: any) => {
  const navigateTo = useNavigate();
  // click selection
  const goToVulnerabilityDetail = () => {
    navigateTo(`/global-search/${Entity}`);
  };
  return (
    <span className="d-flex ms-2 w-100 align-items-center">
      <div className="p-2" onClick={goToVulnerabilityDetail}>
        <label className="ff-ubuntu text-md font-bolder"> {Entity}</label>
        <label className="ff-ubuntu text-md  ms-2">Score {Description}</label>
      </div>
    </span>
  );
};
export const SearchList = (el: React.ReactElement<any>, values: any) => {
  const { dataItem } = values;
  return React.cloneElement(el, el.props, <SearchItem {...dataItem} />);
};
export function AppBar({ isDirt, userName, email, gravatar, notificationList }: AppBarProps) {
  const fetcher = useFetcher();
  const navigateTo = useNavigate();
  const onChange = (event: AutoCompleteChangeEvent) => {
    if (event.value.length > 4) {
      fetcher.load(`/search?query=${event.value}`);
    }
    // enter selection
    if (event.nativeEvent.type === 'keydown' && fetcher.data.length) {
      navigateTo(`/global-search/${event.value}`);
    }
  };

  return (
    <Row>
      <Navbar bg="light" expand="lg" className="appbar justify-content-between">
        <Navbar.Brand href="/">
          <div className="logo-wrapper">
            <div className="logo-wrapper__background"></div>
            <img src="/startleft_logo_horz_wht_tm.svg" alt="appbar-logo" className="appbar-img" />
          </div>
        </Navbar.Brand>
        {!isDirt && (
          <div className="autocomplete-wrapper">
            <span className="k-icon k-i-search tr-search-icon"></span>
            <AutoComplete
              data={fetcher.data}
              itemRender={SearchList}
              textField="Entity"
              placeholder="Search for any issue or element"
              loading={fetcher.state === 'loading'}
              clearButton
              onChange={onChange}
            />
          </div>
        )}
        <div className="user-info-wrapper">
          <AppBarNotification data={notificationList} />
          <AppBarUserMenu
            onboardingCompleted={!isDirt}
            userName={userName}
            email={email}
            gravatar={gravatar}
          />
        </div>
      </Navbar>
    </Row>
  );
}

export default AppBar;
