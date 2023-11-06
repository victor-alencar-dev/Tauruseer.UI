import { useTransition } from '@remix-run/react';
import {
  AppBar,
  Footer,
  LeftNav,
  LoadingIndicator,
  PendoConfig,
  TNotification,
  interpolate,
  pendoScript,
} from '@tauruseer/core';
import classNames from 'classnames';
import { ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
interface IProps {
  children: ReactNode;
  isNewUser: boolean;
  userName: string;
  accountName: string;
  email: string;
  gravatar: string;
  notificationList?: TNotification[];
}

function Layout({
  children,
  isNewUser,
  userName,
  email,
  gravatar,
  notificationList,
  accountName,
}: IProps) {
  const clsName = classNames({
    'align-items-center d-flex justify-content-center': isNewUser,
    'main-content__info__data pt-3': !isNewUser,
    'main-content__info__onb': isNewUser,
  });
  const transition = useTransition();
  const isLoading = transition.state === 'loading';
  const script = interpolate(pendoScript, PendoConfig({ email, accountName, userName }), '');
  return (
    <>
      {
        <script
          dangerouslySetInnerHTML={{
            __html: script,
          }}
        />
      }
      <Container fluid className="wrapper">
        <AppBar
          isDirt={isNewUser}
          userName={userName}
          email={email}
          gravatar={gravatar}
          notificationList={notificationList}
        />
        <div className="main-content">
          {!isNewUser && <LeftNav />}
          <div className="main-content__info pb-5">
            <div className={clsName}>{isLoading ? <LoadingIndicator /> : children}</div>
          </div>
          {isNewUser && (
            <div className="onboarding-footer">
              <Footer />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
export default Layout;
