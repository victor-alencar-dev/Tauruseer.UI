import React, { useContext, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

import { ServiceConfiguration } from '@tauruseer/core';
import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
import { Input } from '@progress/kendo-react-inputs';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { IDataSourceData } from '@tauruseer/module';
import { AlertContext } from '../data-source.component';
// Intents
const ADD_PERSONAL_TOKEN = 'addPersonalAccessToken';
const DISCONNECT = 'disconnect';

interface IPersonalAccessTokenProps {
  dataSource: IDataSourceData;
  dataSourceConfig: ServiceConfiguration;
  disabled?: boolean;
}

export const PersonalAccessToken: React.FC<IPersonalAccessTokenProps> = ({
  dataSource,
  disabled,
}) => {
  const { connected } = dataSource;
  const [token, setToken] = React.useState<string>('');
  const [baseUrl, setBaseUrl] = React.useState<string>(dataSource.urlInfo ?? '');
  const [userName, setUserName] = React.useState<string>(dataSource.userName ?? '');
  const [expireDate, setExpireDate] = React.useState<Date | null>(dataSource.expiresIn || null);

  const [connecting, setConnecting] = React.useState<boolean>(false);
  const { setShowAlert, setAlert } = useContext(AlertContext);

  const dataSourceFetch = useFetcher();
  const isLoading = dataSourceFetch.state !== 'idle' ? true : false;

  const disconnectHandler = async () => {
    if (!isLoading && dataSource.uniqueId) {
      setConnecting(false);
      await dataSourceFetch.submit(
        // Intent is check in the page actions
        { intent: DISCONNECT, uniqueId: dataSource.uniqueId },
        { method: 'post' },
      );
    }
  };

  const connectWithPersonalAccessToken = async (
    token: string,
    baseUrl: string,
    expireDate: Date | null,
  ) => {
    if (!isLoading) {
      setConnecting(true);
      await dataSourceFetch.submit(
        // Intent is check in the page actions
        {
          intent: ADD_PERSONAL_TOKEN,
          token,
          baseUrl,
          userName,
          expireDate: expireDate?.toISOString() ?? '',
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
      <div className="col-12 col-xl-7 d-flex flex-fill my-3 px-0 pe-lg-4 gap-3">
        {' '}
        <div className="col-12 col-xl-3 flex-fill">
          <label>User</label>
          <Input
            type="text"
            placeholder=""
            className="flex-fill"
            disabled={disabled || isLoading || connected}
            value={userName}
            onChange={(e) => setUserName(String(e.target.value).trim())}
          />
        </div>
        <div className="col-12 col-xl-3 flex-fill">
          <label>Personal Token</label>
          <Input
            type="password"
            placeholder={connected ? '****' : 'Enter your personal token'}
            className="flex-fill"
            disabled={disabled || isLoading || connected}
            value={token}
            onChange={(e) => setToken(String(e.target.value).trim())}
          />
        </div>
        <div className="col-12 col-xl-2 flex-fill">
          <label>Expiration Date</label>
          <DatePicker
            placeholder={'MM/DD/YYYY'}
            format={'MM/dd/yyyy'}
            // sets min to tomorrow
            min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
            validationMessage="Expiration date must be in the future"
            className="flex-fill"
            disabled={disabled || isLoading || connected}
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>
      </div>
      <div className="col-12 col-lg-4 d-flex flex-fill my-3 px-0 flex-column">
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
              disabled={disabled || isLoading || !token || !baseUrl}
              className="button button-secondary typography-body2 font-normal"
              rounded="medium"
              onClick={(e) => connectWithPersonalAccessToken(token, baseUrl, expireDate)}
              type="submit"
            >
              {!isLoading ? 'Connect' : <Loader size="medium" type="pulsing" themeColor="info" />}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
