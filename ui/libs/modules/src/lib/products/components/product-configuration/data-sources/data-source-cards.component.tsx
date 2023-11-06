import { useFetcher } from '@remix-run/react';
import {
  Accordion,
  AccordionItem,
  DataSourceCard,
  ExternalService,
  ServiceCategory,
  ServiceConfiguration,
  ServiceConfigurationDescription,
  ServiceStatus,
} from '@tauruseer/core';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ProductStore } from '../../../state/product-storage';
import { DataSourceConfigForm } from './config/data-source-config-form.component';
import { IDataSourceData } from '@tauruseer/module';

interface ICardsDataSourceProps {
  filter?: ServiceCategory | null | 'connected';
  dataSources: IDataSourceData[];
  isPage?: boolean;
}

const dataSourceSortHandler = (a: IDataSourceData, b: IDataSourceData) => {
  if (a.sourceName < b.sourceName) {
    return -1;
  }
  if (a.sourceName > b.sourceName) {
    return 1;
  }
  return 0;
};

export const CardsDataSource: React.FC<ICardsDataSourceProps> = ({
  filter,
  dataSources,
  isPage,
}) => {
  const store = ProductStore((state) => state);
  const [dataSourceActive, setDataSourceActive] = useState<string>();
  const [expandedCol] = useState<number | null>();
  const dataSourceFetch = useFetcher();
  const isLoading = dataSourceFetch.state !== 'idle' ? true : false;

  // triggers the oauth workflow for the selected data source
  const connectToSource = (dataSource: string) => {
    if (!isLoading) {
      dataSourceFetch.submit({ intent: 'authorize', dataSource }, { method: 'post' });
    }
  };

  const ActiveDataSource = (dataSource: string) => {
    store.setIsCardOpen(!expandedCol ? true : false);
    setDataSourceActive(dataSourceActive === dataSource ? '' : dataSource);
  };

  const dataSourceActionHandler = (dataSource: string, connected: boolean) => {
    if (
      dataSource === ExternalService.BitbucketServer ||
      dataSource === ExternalService.DocioScanner ||
      dataSource === ExternalService.Sonar
    ) {
      ActiveDataSource(dataSource);
    } else if (connected && !isPage) {
      ActiveDataSource(dataSource);
    } else if (connected && isPage) {
      return;
    } else {
      connectToSource(dataSource);
    }
  };

  const dsColClsName = classNames('data-source-grid', {
    'data-source-grid--expanded': dataSourceActive,
  });

  // filters data sources by service category
  const filteredDataSources = filter
    ? dataSources.filter((ds) => {
        if (filter === 'connected') {
          return ds.connected === true;
        }
        return ds.serviceCategories.includes(filter);
      })
    : dataSources;

  // sort alphabetically the data sources
  const sortedDataSources = filteredDataSources.sort(dataSourceSortHandler);

  useEffect(() => {
    if (!store.isCardOpen) {
      setDataSourceActive('');
    }
  }, [store.isCardOpen]);

  return (
    <div className="d-flex mt-4 w-100 px-2">
      <div className={dsColClsName}>
        {sortedDataSources.map((ds, i) => {
          // Gets the status of the service
          let status = ServiceStatus.NotConnected;

          if (!ds.enabled) {
            status = ServiceStatus.Disabled;
          } else if (ds.mappedAssets?.length && ds.mappedAssets?.length > 0 && ds.connected) {
            status = ServiceStatus.Mapped;
          } else if (ds.connected) {
            status = ServiceStatus.Connected;
          }

          //calculates the days remaining for the token to expire

          const timeRemaining = ds.expiresIn ? new Date(ds.expiresIn.getTime() - Date.now()) : null;
          const daysRemaining = timeRemaining
            ? Math.ceil(timeRemaining.getTime() / (1000 * 60 * 60 * 24))
            : null;
          const daysRemainingMessage =
            daysRemaining && daysRemaining >= 0
              ? `The token will expire in ${daysRemaining} days`
              : 'The token has expired';

          const setDefaultTab = () => {
            if (ds.connected) {
              return (
                ds.configurationOptions.filter(
                  (config) =>
                    !(
                      config === ServiceConfiguration.PersonalAccessToken ||
                      config === ServiceConfiguration.OAuth
                    ),
                )[0] || ServiceConfiguration.Repository
              );
            } else {
              return ds.configurationOptions[0];
            }
          };

          function getCustomSubtitle(ds: IDataSourceData) {
            switch (ds.source) {
              case ExternalService.DocioScanner:
                if (!ds.mappedAssets?.length) {
                  return '';
                }
                return ds.mappedAssets?.length > 1
                  ? `${ds.mappedAssets?.length} repos configured`
                  : `${ds.mappedAssets?.length} repo configured`;
              default:
                return '';
            }
          }

          function getCustomExpandedHeader(
            ds: IDataSourceData,
          ): { title: string; subtitle?: string } | null {
            switch (ds.source) {
              case ExternalService.DocioScanner:
                return {
                  title: 'Account Key',
                  subtitle: ds.accountApiKey,
                };
              default:
                return null;
            }
          }

          return (
            <DataSourceCard
              source={ds.source}
              sourceName={ds.sourceName}
              iconColor={ds.iconColor}
              id={ds.id}
              key={ds.id}
              isHidden={dataSourceActive && dataSourceActive !== ds.id}
              isExpand={dataSourceActive === ds.id}
              OnClick={() => dataSourceActionHandler(ds.id, ds.connected || false)}
              status={status}
              assetsMapped={ds.mappedAssets?.length}
              categories={ds.serviceCategories}
              subtitle={getCustomSubtitle(ds)}
              expandedHeader={getCustomExpandedHeader(ds)}
              isPage={isPage}
            >
              <Accordion defaultActiveIndex={setDefaultTab()}>
                {ds.configurationOptions
                  .filter((serviceConfig) =>
                    isPage ? serviceConfig === ServiceConfiguration.PersonalAccessToken : true,
                  )
                  .map((serviceConfig, index) => {
                    if (serviceConfig !== ServiceConfiguration.PersonalAccessToken) {
                      return (
                        <AccordionItem
                          key={index}
                          title={ServiceConfigurationDescription[serviceConfig]}
                          index={serviceConfig}
                        >
                          <DataSourceConfigForm
                            key={index}
                            dataSource={ds}
                            dataSourceConfig={serviceConfig}
                          />
                        </AccordionItem>
                      );
                    }
                  })}
              </Accordion>
            </DataSourceCard>
          );
        })}
      </div>
    </div>
  );
};
