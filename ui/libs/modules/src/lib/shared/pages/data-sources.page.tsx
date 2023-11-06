import {
  Header,
  ServiceCategoryDescription,
  SmallCardGrid,
  TSmallCardGridData,
} from '@tauruseer/core';
import { IExternalService, dataSourcesConfig } from '@tauruseer/module';
import React from 'react';

type TDataSourcePageProps = {
  externalServices: IExternalService[];
};

export const DataSourcesPage: React.FC<TDataSourcePageProps> = ({ externalServices }) => {
  const boilerplateData: TSmallCardGridData[] = dataSourcesConfig.map((dataSource) => ({
    id: dataSource.source,
    copy: dataSource.sourceName,
    icon: dataSource.source as string,
    iconColor: dataSource.iconColor,
    enabled: dataSource.enabled,
    status: 'inactive',
    url: '/datasources/' + dataSource.source,
    categories: dataSource.serviceCategories.map(
      (category) => ServiceCategoryDescription[category],
    ),
  })) as [];

  const data: TSmallCardGridData[] = boilerplateData.map((item) => {
    const service = externalServices.find((service) => service.externalServiceName === item.id);

    return {
      ...item,
      ...(service ? { status: 'active' } : {}),
    };
  });

  return (
    <>
      <Header title="Data Sources" icon="fa-database" isFAIcon buttons={[]} />
      <div className="card card-content mb-5 px-4" style={{ minHeight: '400px' }}>
        <div className="container-fluid">
          <SmallCardGrid placeholder="All Sources" data={data} />
        </div>
      </div>
    </>
  );
};
