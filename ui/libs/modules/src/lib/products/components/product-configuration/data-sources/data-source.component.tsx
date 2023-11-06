import { Alert, ExternalService, ExternalServiceAsInt, Header } from '@tauruseer/core';
import React, { useMemo, useState } from 'react';

import { CardsDataSource } from './data-source-cards.component';
import { dataSourcesConfig } from '@tauruseer/module';

interface IAlert {
  message: string;
  messageType: 'danger' | 'warning' | 'success' | 'info';
  title: string;
}
interface IAlertContext {
  alert: IAlert;
  showAlert: boolean;
  setAlert: (message: IAlert) => void;
  setShowAlert: (showAlert: boolean) => void;
}

export const AlertContext = React.createContext<IAlertContext>({
  alert: {
    message: '',
    messageType: 'info',
    title: '',
  },
  showAlert: false,
  setAlert: () => {},
  setShowAlert: () => {},
});

export interface IUserDataSource {
  source?: ExternalService;
  connected?: boolean;
  externalServiceId?: string;
  urlInfo?: string;
  userName?: string;
  expiresIn?: Date;
  mappedAssets?: {
    name: string;
    url: string;
    id: string;
    externalServiceId: string;
    scanKey?: string;
  }[];
  unmappedAssets?: {
    name: string;
    url: string;
    id: string;
    externalServiceId: string;
    isWorkTrackingProject: boolean;
  }[];
}
interface IDataSourceProps {
  userDataSources?: IUserDataSource[];
  accountApiKey?: string;
  mappedAssets?: {
    name: string;
    url: string;
    id: string;
    externalServiceId: string;
    scanKey?: string;
  }[];
  isPage?: boolean;
}

export const DataSource: React.FC<IDataSourceProps> = ({
  userDataSources,
  mappedAssets,
  accountApiKey,
  isPage,
}) => {
  const [alert, setAlert] = useState<IAlert>({ message: '', messageType: 'info', title: '' });
  const [showAlert, setShowAlert] = useState(false);
  // Data Sources
  // We get the data sources from the dataSources array from data-source-layout. Then we get additional data from the userDataSources array.

  const dataSources = useMemo(() => {
    return dataSourcesConfig.map((dataSource) => {
      const userDataSource = userDataSources?.find((userDataSource) => {
        return userDataSource.source === dataSource.source;
      });

      if (dataSource.source === ExternalService.DocioScanner) {
        // we pass the mapped assets to the scanner data source
        // and we filter work items from jira
        dataSource.mappedAssets = mappedAssets?.filter(
          (asset) => Number(asset.externalServiceId) !== ExternalServiceAsInt.JIRA,
        );
        dataSource.accountApiKey = accountApiKey;
        dataSource.connected = mappedAssets?.length ? mappedAssets?.length > 0 : false;
      }

      return userDataSource ? { ...dataSource, ...userDataSource } : dataSource;
    });
  }, [userDataSources]);

  // Dropdown Options
  // WIP: This is a temporary solution to get the service categories from the dataSources array, but it will be changed when we integrate this component with the backend.

  // See if it is possible to use MapEnumToObject

  // Gets all values from serviceCategories in dataSources and puts them in an array without duplicates

  return (
    <AlertContext.Provider value={{ alert, setAlert, showAlert, setShowAlert }}>
      {/* We are not going to work in the stepper for now. It will be hidden because of https://dev.azure.com/tauruseer/Platform/_boards/board/t/Platform%20Team/Stories/?workitem=662 */}
      {/* <DataSourceStepper /> */}
      {isPage && <Header title="Data Sources" icon="fa-database" isFAIcon buttons={[]} />}
      <div className="card card-content mb-5 px-4" style={{ minHeight: '400px' }}>
        <div className="container-fluid">
          {showAlert && (
            <Alert
              title={alert.title}
              type={alert.messageType}
              disableAutoClose={false}
              onClose={() => setShowAlert(false)}
              timeToClose={15000}
            >
              {alert.message}
            </Alert>
          )}
        </div>
        <CardsDataSource filter={'connected'} dataSources={dataSources} isPage={isPage} />
      </div>
    </AlertContext.Provider>
  );
};
