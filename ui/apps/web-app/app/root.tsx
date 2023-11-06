import { ActionArgs, ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ThrownResponse,
  useCatch,
  useLoaderData,
} from '@remix-run/react';
import { tokenInterceptor } from '@tauruseer/api';
import {
  Error,
  INTENT_DISMISS,
  INTENT_MARK_AS_READ,
  TrStore,
  breakpointScreenRes,
  useWindowDimensions,
} from '@tauruseer/core';
import { LinkRoot, MetaRoot } from '@tauruseer/ui';
import { ReactNode, useEffect } from 'react';
import {
  dismissNotification,
  getNotificationList,
  markAsReadNotification,
} from './api/notifications/notifications.server';
import { checkAuth, isOnboardingNeeded } from './auth/auth.service.server';
import Layout from './layout';

export const links = () => LinkRoot;
export const meta: MetaFunction = () => MetaRoot;
interface IProps {
  children: ReactNode;
}

export const action: ActionFunction = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const token = await checkAuth(request);
  tokenInterceptor(token);

  switch (intent) {
    case INTENT_DISMISS: {
      const ids = JSON.parse(formData.get('ids')?.toString() || '');
      const res = ids ? await dismissNotification(ids) : null;
      return res;
    }

    case INTENT_MARK_AS_READ: {
      const ids = JSON.parse(formData.get('ids')?.toString() || '');
      const res = ids ? await markAsReadNotification(ids) : null;
      return res;
    }

    default:
      console.log('No intent found');
      return null;
  }
};

export const loader: LoaderFunction = async ({ request }: ActionArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const userData = await isOnboardingNeeded(request);
  const notificationList = await getNotificationList();
  return { userData, notificationList };
};

export function Document({ children }: IProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
}
export default function App() {
  const store = TrStore((state) => state);
  const { userData: data, notificationList } = useLoaderData();
  const {
    isOnboardingNeeded,
    fullName,
    email,
    showAccountOption,
    gravatar,
    accountUrl,
    accountName,
  } = data;
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    store.setShowAccountOption(showAccountOption);
    store.setAccountManagementUrl(accountUrl);
  }, []);

  useEffect(() => {
    store.setScreenResolution(width, height);
    if (width > 0 && width < breakpointScreenRes.menuClose) {
      store.setToggle(false);
    } else if (width >= breakpointScreenRes.menuClose) {
      store.setToggle(true);
    }
  }, [height, width]);
  return (
    <Document>
      <Layout
        isNewUser={isOnboardingNeeded}
        userName={fullName}
        email={email}
        gravatar={gravatar}
        notificationList={notificationList}
        accountName={accountName}
      >
        <Outlet />
        <ScrollRestoration />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
        <Scripts />
      </Layout>
    </Document>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document>
      <Layout isNewUser={false} userName={''} email={''} gravatar={''} accountName={''}>
        <Error caught={caught} />;
        <ScrollRestoration />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
        <Scripts />
      </Layout>
    </Document>
  );
}
// when is not session found
export function ErrorBoundary({ error }: { error: Error }) {
  const caught: ThrownResponse = { status: 404, data: '', statusText: 'Not Found' };
  return (
    <Document>
      <Error caught={caught} />
    </Document>
  );
}
