import React, { useContext, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

import { ServiceConfiguration } from '@tauruseer/core';
import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
import { Input } from '@progress/kendo-react-inputs';
import { IDataSourceData } from '@tauruseer/module';
import { AlertContext } from '../data-source.component';
// Intents
const OAUTH_CONNECTION = 'oauthConnection';
const OAUTH_DISCONNECT = 'oauthDisconnect';

interface IOAuthProps {
  dataSource: IDataSourceData;
  dataSourceConfig: ServiceConfiguration;
  disabled?: boolean;
}

export const OAuth: React.FC<IOAuthProps> = ({ dataSource, disabled }) => {
  const { connected } = dataSource;
  const [baseUrl, setBaseUrl] = React.useState<string>(dataSource.urlInfo ?? '');

  const [connecting, setConnecting] = React.useState<boolean>(false);
  const { setShowAlert, setAlert } = useContext(AlertContext);

  const dataSourceFetch = useFetcher();
  const isLoading = dataSourceFetch.state !== 'idle' ? true : false;

  const disconnectHandler = async () => {
    if (!isLoading && dataSource.uniqueId) {
      setConnecting(false);
      await dataSourceFetch.submit(
        // Intent is check in the page actions
        { intent: OAUTH_DISCONNECT, uniqueId: dataSource.uniqueId },
        { method: 'post' },
      );
    }
  };

  const connectWithPersonalAccessToken = async (baseUrl: string) => {
    if (!isLoading) {
      setConnecting(true);
      await dataSourceFetch.submit(
        // Intent is check in the page actions
        {
          intent: OAUTH_CONNECTION,
          baseUrl,
          dataSource: dataSource.id,
        },
        { method: 'post' },
      );
    }
  };

  useEffect(() => {
    if (!isLoading && dataSource.connected && connecting) {
      setAlert({
        messageType: 'success',
        message: 'The platform was successfully added as a data source!',
        title: 'Data Source connected!',
      });
      setShowAlert(true);
    } else if (!isLoading && !dataSource.connected && connecting) {
      setAlert({
        messageType: 'danger',
        message:
          'Tauruseer was unable to connect to the platform. Please check the token, url or date and try again.',
        title: 'Unable to connect to Data Source',
      });
      setShowAlert(true);
    }
  }, [isLoading, dataSource.connected, setShowAlert]);

  return (
    <>
      <div className="col-12 col-lg-6 d-flex flex-fill my-3 px-0 flex-column">
        <div className="flex-fill">
          <label>Repository Url</label>
          <Input
            type="text"
            placeholder="Repository URL"
            className="flex-fill"
            disabled={disabled || isLoading || connected}
            value={baseUrl}
            onChange={(e) => setBaseUrl(String(e.target.value).trim())}
          />
        </div>
        <div className="d-flex ps-5 mt-4 justify-content-end">
          {connected ? (
            <Button
              themeColor={'light'}
              fillMode="solid"
              size="large"
              disabled={disabled || isLoading}
              className="button button-secondary typography-body2 font-normal"
              rounded="medium"
              onClick={disconnectHandler}
            >
              {!isLoading ? (
                'Disconnect'
              ) : (
                <Loader size="medium" type="pulsing" themeColor="info" />
              )}
            </Button>
          ) : (
            <Button
              themeColor={'light'}
              fillMode="solid"
              size="large"
              disabled={disabled || isLoading || !baseUrl}
              className="button button-secondary typography-body2 font-normal"
              rounded="medium"
              onClick={(e) => connectWithPersonalAccessToken(baseUrl)}
              type="submit"
            >
              {!isLoading ? 'Connect' : <Loader size="medium" type="pulsing" themeColor="info" />}
            </Button>
          )}
        </div>
      </div>
      <div className="col-12 col-xl-6 d-flex flex-fill my-3 px-0 pe-lg-4 gap-3">
        {' '}
        <div className="col-12 col-xl-5 flex-fill"></div>
      </div>
    </>
  );
};
