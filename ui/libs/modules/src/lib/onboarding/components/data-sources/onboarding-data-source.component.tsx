import { Stepper, StepperChangeEvent } from '@progress/kendo-react-layout';
import { useFetcher } from '@remix-run/react';
import { Alert, DataSourceMap } from '@tauruseer/core';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { ONBOARDING } from '../../model/onboarding.model';
import { DataSource, OnboardingStore } from '../../state/onboarding-storage';
import {
  dataSourceInfoMap,
  dataSourcesMap1,
  dataSourcesMap2,
} from './onboarding-data-source.model';

const stepsOnboarding = [{ disabled: true }, { disabled: true }, { disabled: true }];
interface OnBoardingDataSourcesProps {
  dataSources: Array<DataSource>;
}

export const OnBoardingDataSources = ({ dataSources }: OnBoardingDataSourcesProps) => {
  const dataSourceFetch = useFetcher();
  const store = OnboardingStore((state) => state);
  const [value, setValue] = React.useState<number>(0);
  const [dataSourceActive, setDataSourceActive] = React.useState<string>();
  const [expandedCol, setExpandedCol] = React.useState<number | null>();
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [dataSourceCol1, setDataSourceCol1] =
    React.useState<Array<dataSourceInfoMap>>(dataSourcesMap1);
  const [dataSourceCol2, setDataSourceCol2] =
    React.useState<Array<dataSourceInfoMap>>(dataSourcesMap2);
  const dsCol1ClsName = classNames('d-flex flex-column me-3', {
    'w-50': !expandedCol,
    'w-100': expandedCol === 1,
    'w-0': expandedCol === 2,
  });
  const dsCol2ClsName = classNames('d-flex flex-column', {
    'w-50': !expandedCol,
    'w-100': expandedCol === 2,
    'w-0': expandedCol === 1,
  });
  const isLoading = dataSourceFetch.state !== 'idle' ? true : false;
  const handleChange = (e: StepperChangeEvent) => {
    setValue(e.value);
  };
  useEffect(() => {
    redirectFromDataSource(store.currentSelectedDataSource, store.step);
  }, [store.step, store.currentSelectedDataSource]);

  const redirectFromDataSource = (dataSource: DataSource, step: number) => {
    let col = dataSourcesMap1.find((dt) => dt.id === dataSource)?.col;
    if (!col) {
      col = dataSourcesMap2.find((dt) => dt.id === dataSource)?.col;
    }
    setValue(step - 1);
    setShowAlert(false);
    if (step === ONBOARDING.step2 && dataSource) {
      setDataSourceActive(dataSource);
      setExpandedCol(col);
      setShowAlert(true);
    } else if (step === ONBOARDING.step2 && !dataSource) {
      setDataSourceActive('');
      setExpandedCol(null);
    } else if (step === ONBOARDING.step3) {
      setDataSourceCol1(dataSourcesMap1.filter((dt) => dataSources.includes(dt.id)));
      setDataSourceCol2(dataSourcesMap2.filter((dt) => dataSources.includes(dt.id)));
    }
  };

  const connectSource = (dataSource: string, col: number | null) => {
    setExpandedCol(expandedCol === col ? null : col);
    if (!expandedCol) {
      if (dataSources.includes(dataSource as any)) {
        store.setSelectedDataSourceCard(dataSource as any);
        store.setDeleteBtnDisabled(expandedCol === col ? true : false);
        store.setActionDisabled(false);
      } else if (!dataSources.includes(dataSource as any)) {
        store.setActionDisabled(true);
      }
    } else {
      if (dataSources.length) {
        store.setActionDisabled(false);
      } else {
        store.setActionDisabled(true);
      }
    }
    store.setPrimaryBtnText(expandedCol === col ? 'Continue' : 'Save');
    store.setDeleteBtnEnabled(expandedCol === col ? false : true);
    setDataSourceActive(dataSourceActive === dataSource ? '' : dataSource);
  };

  const connectToSource = (dataSource: string) => {
    if (!isLoading) {
      return () => dataSourceFetch.submit({ dataSource }, { method: 'post' });
    }
    return () => {};
  };

  return (
    <div>
      <div className="pe-5 ps-5">
        <Stepper value={value} onChange={handleChange} items={stepsOnboarding} className="mt-4" />
        <label className="d-block text-center typography-body2 fw-semibold mb-4 ">
          {store.step !== ONBOARDING.step3 ? 'Select Data Source' : 'Data Sources selected'}
        </label>
        {showAlert && (
          <Alert title="Data Source linked!" type="success" onClose={() => {}}>
            The {dataSourceActive} Repository has been added as a data source to your organization
            space.
          </Alert>
        )}
      </div>
      <div className="d-flex p-5">
        <div className={dsCol1ClsName}>
          {dataSourceCol1.map((ds, i) => {
            return (
              <DataSourceMap
                source={ds.source}
                sourceName={ds.sourceName}
                iconColor={ds.iconColor}
                isLoading={isLoading}
                id={`${ds.id}`}
                isMapped={dataSources.includes(ds.id as any)}
                isHide={dataSourceActive && dataSourceActive !== ds.id}
                isExpand={dataSourceActive === ds.id}
                OnClick={() => connectSource(`${ds.id}`, ds.col)}
                ChildrenEvent={connectToSource(`${ds.id}`)}
                key={i}
              />
            );
          })}
        </div>
        <div className={dsCol2ClsName}>
          {dataSourceCol2.map((ds, i) => {
            return (
              <DataSourceMap
                source={ds.source}
                sourceName={ds.sourceName}
                iconColor={ds.iconColor}
                isLoading={isLoading}
                id={`${ds.id}`}
                isMapped={dataSources.includes(ds.id as any)}
                isHide={dataSourceActive && dataSourceActive !== ds.id}
                isExpand={dataSourceActive === ds.id}
                OnClick={() => connectSource(`${ds.id}`, ds.col)}
                ChildrenEvent={connectToSource(`${ds.id}`)}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
