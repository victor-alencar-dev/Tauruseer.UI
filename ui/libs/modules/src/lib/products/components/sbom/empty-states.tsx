import { Icon } from '@progress/kendo-react-common';
import { GridNoRecords } from '@progress/kendo-react-grid';

export const SbomEmptyGridState: React.ReactNode = (
  <GridNoRecords>
    <div className="data-empty-grid" style={{ height: '430px' }}>
      <Icon name="grid-layout" size="medium" />
      <div className="data-empty-message d-flex flex-column">
        <span className="ff-ubuntu text-ml font-medium">{'No Dependencies available'}</span>
        <div className="ff-montserrat text-md font-regular d-flex flex-column">
          <span>{'This particular repository doesn’t'}</span>
          <span>{'have any SBOM reports yet'}</span>
        </div>
      </div>
    </div>
  </GridNoRecords>
);
export const SbomEmptyHistoryReportGridState: React.ReactNode = (
  <GridNoRecords>
    <div className="data-empty-grid" style={{ height: '430px' }}>
      <Icon name="grid-layout" size="medium" />
      <div className="data-empty-message d-flex flex-column">
        <span className="ff-ubuntu text-ml font-medium">{'No reports available'}</span>
      </div>
    </div>
  </GridNoRecords>
);
export const SbomLoadingGridState: React.ReactNode = (
  <GridNoRecords>
    <div className="data-empty-grid" style={{ height: '430px' }}>
      <i className="fa-solid fa-spinner-third fa-spin text-xxlg"></i>
      <div className="data-empty-message d-flex flex-column">
        <span className="ff-ubuntu text-ml font-medium">{'Loading'}</span>
        <div className="ff-montserrat text-md font-regular d-flex flex-column">
          <span>{'Please wait while we collect your data'}</span>
        </div>
      </div>
    </div>
  </GridNoRecords>
);

export const ChartEmptyState = () => {
  return (
    <div style={{ height: '132', width: '275', textAlign: 'center' }}>
      <i className="fa-duotone fa-chart-column text-xxlg" style={{ color: '#4231B4' }}></i>
      <div className="data-empty-message d-flex flex-column mt-2">
        <span className="ff-ubuntu text-ml font-medium">{'No Files Available'}</span>
        <div className="ff-montserrat text-md font-regular d-flex flex-column">
          <span>{'This particular repository doesn’t'}</span>
          <span>{'have any SBOM reports yet'}</span>
        </div>
      </div>
    </div>
  );
};
export const ChartLoadingState: React.ReactNode = (
  <div style={{ height: '132', width: '275', textAlign: 'center' }}>
    <i className="fa-solid fa-spinner-third fa-spin text-xxlg" style={{ color: '#4231B4' }}></i>
    <div className="data-empty-message d-flex flex-column mt-2">
      <span className="ff-ubuntu text-ml font-medium">{'Loading'}</span>
      <div className="ff-montserrat text-md font-regular d-flex flex-column">
        <span>{'Please wait while we collect your data'}</span>
      </div>
    </div>
  </div>
);
