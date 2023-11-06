import { Button } from '@progress/kendo-react-buttons';
import { useFetcher, useParams } from '@remix-run/react';
import { MessageCard } from '@tauruseer/core';
import { SBOM_REPORT_ACTION } from '@tauruseer/module';
import classNames from 'classnames';
import { ReactElement, useEffect, useState } from 'react';
import { SBOMStore } from '../../state/sbom-storage';
import DependencyDataGrid from './dependency-grid/dependency-grid';
import ProductDependencyDataGrid from './dependency-grid/product-dependency';
import GenerateSomReport from './generate-report-modal';
import ReportHistoryDataGrid from './report-history-grid/report-history-grid';

export interface ISbomTab {
  title: string;
  onclick: React.EventHandler<any>;
  tab: string;
  isActive: boolean;
}
export const SbomTabContainer = ({ title, onclick, tab, isActive }: ISbomTab): ReactElement => {
  const tabClass = classNames('sbomTabs', { isTabActive: isActive });
  return (
    <div className={tabClass} onClick={() => onclick(tab)}>
      {title}
    </div>
  );
};
export type sbomReportType = 'SbomProduct' | 'SbomRepository';
export interface ISbomProductAggregate {
  currentReports: Array<any>;
  sbomReport: sbomReportType;
}
export const SbomProductAggregated = ({ currentReports, sbomReport }: ISbomProductAggregate) => {
  const storage = SBOMStore((state) => state);
  const fetcher = useFetcher();
  const [activeTab, setActiveTab] = useState<string>('dependency');
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [currentReport, setCurrentReports] = useState<Array<any>>(currentReports);
  const [canGetReport, setCanGetReport] = useState<boolean>(false);
  const [runningReport, setRunningReport] = useState<string>();
  const tabTitle = sbomReport === 'SbomProduct' ? 'Product Dependency' : 'Repository Dependencies';
  const productAggregationTabs = [
    { title: tabTitle, tab: 'dependency' },
    { title: 'Report History', tab: 'report' },
  ];

  useEffect(() => {
    if (sbomReport === 'SbomProduct') {
      canGenerateReport(currentReports);
    }
  }, [currentReport]);

  useEffect(() => {
    if (storage.reportsRunning) {
      getReportInProgress();
    }
  }, [storage.reportsRunning]);

  useEffect(() => {
    if (storage.selectedRepository) {
      getReportInProgress();
    }
    if (sbomReport === 'SbomRepository' && !storage.selectedRepository) {
      canGenerateReport([]);
    }
  }, [storage.selectedRepository]);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data) {
      const {
        data: { data },
      } = fetcher.data;
      setCurrentReports(data);
      storage.setNewReportRunning(false);
      if (storage.selectedRepository) {
        canGenerateReport(data);
      }
    }
  }, [fetcher.data]);

  const toggleDialog = () => {
    setToggle(!toggle);
  };

  const { productId } = useParams();
  const handleTabs = (tab: string) => {
    setActiveTab(tab);
  };
  //reload  the reports list if they are done being generated
  const reloadReportQueue = () => {
    setLoading(true);
    if (activeTab === 'dependency') {
      handleTabs('report');
    }
    storage.setNewReportRunning(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const canGenerateReport = (currentReport: Array<any>) => {
    setCanGetReport(currentReport.length > 1);
    if (currentReport.length === 0) {
      setRunningReport(undefined);
    }
    if (currentReport.length === 1) {
      setRunningReport(currentReport[0]?.format);
    }
    if (sbomReport === 'SbomRepository' && !storage.selectedRepository) {
      setCanGetReport(true);
    }
  };

  const getReportInProgress = () => {
    const objectId = sbomReport === 'SbomProduct' ? productId : storage.selectedRepository;
    fetcher.load(
      `/products/${productId}/sbom/data-aggregation?option=${SBOM_REPORT_ACTION.GET_REPORTS_IN_PROCESS}&objectId=${objectId}&reportPage=${sbomReport}`,
    );
  };

  return (
    <>
      {currentReport.length > 0 && (
        <MessageCard
          title="We are currently processing the reports you requested"
          message={'It should take between 5 to 20 minutes to see it reflected on this screen.'}
          icon="fa-message-exclamation"
          loading={loading}
          button={{
            label: 'Refresh Report History',
            icon: 'fa-rotate',
            onClick: reloadReportQueue,
          }}
        />
      )}
      <div className="card">
        <div className="row" style={{ height: '750px', padding: '24px', marginBottom: '24px' }}>
          <div className="col-12 d-flex" style={{ marginBottom: '24px', height: '48px' }}>
            <div className="col-4">
              {productAggregationTabs.map((item, index) => {
                return (
                  <SbomTabContainer
                    title={item.title}
                    key={index}
                    onclick={handleTabs}
                    tab={item.tab}
                    isActive={activeTab === item.tab}
                  />
                );
              })}
            </div>
            <div className="d-flex col-4 justify-content-end flex-grow-1">
              <Button
                size="large"
                themeColor={'dark'}
                fillMode="solid"
                rounded="medium"
                disabled={canGetReport}
                className="button button-primary"
                style={{ padding: '16px 32px', fontSize: '13px' }}
                onClick={toggleDialog}
              >
                Generate a new report
              </Button>
            </div>
          </div>

          <div className="col-12">
            {activeTab === 'dependency' ? (
              sbomReport === 'SbomProduct' ? (
                <ProductDependencyDataGrid productId={productId} />
              ) : (
                <DependencyDataGrid
                  productId={productId}
                  reloadGrid={storage.selectedRepository ? true : false}
                />
              )
            ) : (
              <ReportHistoryDataGrid productId={productId} sbomReport={sbomReport} />
            )}
          </div>
        </div>
      </div>
      {toggle && (
        <GenerateSomReport
          onClose={toggleDialog}
          productId={productId}
          sbomReport={sbomReport}
          runningReport={runningReport}
        />
      )}
    </>
  );
};

export default SbomProductAggregated;
