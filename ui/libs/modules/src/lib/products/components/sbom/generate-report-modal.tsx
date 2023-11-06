import { Button } from '@progress/kendo-react-buttons';
import { useFetcher } from '@remix-run/react';
import { ModalForm } from '@tauruseer/core';
import { SBOM_REPORT_ACTION, sbomReportType } from '@tauruseer/module';
import { useEffect, useState } from 'react';
import { SBOMStore } from '../../state/sbom-storage';

interface IOptionsTeams {
  onClick: React.EventHandler<any>;
  format: 'CycloneDx' | 'SPDX';
  isDisabledBtn: boolean;
}
export const DownloadOption = ({ onClick, format, isDisabledBtn }: IOptionsTeams) => {
  const imgPath = format === 'CycloneDx' ? 'cyclonedx-download.png' : 'spdx-download.png';
  return (
    <div className="d-flex flex-column justify-content-center align-items-center sbomModal">
      <span
        className="ff-ubuntu text-lg font-bold text-center"
        style={{
          marginBottom: '24px',
          width: '171px',
          height: '29.577px',
        }}
      >
        <img src={`/${imgPath}`} alt={format} />
      </span>
      <Button
        size="large"
        themeColor={'dark'}
        fillMode="solid"
        rounded="medium"
        disabled={isDisabledBtn}
        className="button button-primary"
        style={{ padding: '16px', width: '196px', fontSize: '13px' }}
        onClick={() => onClick(format)}
      >
        Generate
      </Button>
    </div>
  );
};
interface IProps {
  onClose: React.EventHandler<any>;
  productId?: string | undefined;
  runningReport?: string | undefined;
  sbomReport: sbomReportType;
}

const GenerateSomReport = ({ onClose, productId, runningReport, sbomReport }: IProps) => {
  const storage = SBOMStore((state) => state);
  const fetcher = useFetcher();
  const [disableCycloneDx, setDisableCycloneDx] = useState(false);
  const [disableSPDX, setDisableSPDX] = useState(false);
  const [currentFormat, setCurrentFormat] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>();
  const [infoMessage, setInfoMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();
  const canCyclone = runningReport !== 'CycloneDx' || !runningReport;
  const canSPDX = runningReport !== 'SPDX' || !runningReport;
  const reportTitle = sbomReport === 'SbomProduct' ? 'Product' : 'Repository';
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data) {
      const { data } = fetcher.data;
      if (data && data.succeed) {
        setMessageType('text-success');
        setShowAlert(true);
        setInfoMessage('Your report is being generated');
        storage.setNewReportRunning(true);
        setTimeout(() => {
          onClose(null);
        }, 3000);
        runningReport = currentFormat;
      } else {
        setShowAlert(true);
        setMessageType('text-warning');
        setInfoMessage(data);
      }
      setCurrentFormatDownloaded();
    }
  }, [fetcher.data]);

  const setCurrentFormatDownloaded = () => {
    if (currentFormat === 'CycloneDx') {
      setDisableSPDX(false);
      setDisableCycloneDx(true);
    }
    if (currentFormat === 'SPDX') {
      setDisableSPDX(true);
      setDisableCycloneDx(false);
    }
  };

  const setSelected = (format: string) => {
    const objectId = sbomReport === 'SbomProduct' ? productId : storage.selectedRepository;
    setCurrentFormat(format);
    if (format === 'CycloneDx') setDisableSPDX(true);
    if (format === 'SPDX') setDisableCycloneDx(true);
    fetcher.load(
      `/products/${productId}/sbom/data-aggregation?option=${SBOM_REPORT_ACTION.GENERATE_NEW_REPORT}&objectId=${objectId}&reportPage=${sbomReport}&format=${format}`,
    );
  };
  return (
    <ModalForm
      title={`Generate ${reportTitle} SBOM Report`}
      onClose={onClose}
      icon="fa-light fa-file-arrow-down"
      subTitle="Please choose the preferred format to generate your report"
    >
      {' '}
      {showAlert && (
        <span className={`ms-3 text-ml font-bold ff-montserrat ${messageType}`}>{infoMessage}</span>
      )}
      <div className="d-flex sbomContainer mt-4">
        {canCyclone && (
          <DownloadOption
            format="CycloneDx"
            onClick={setSelected}
            isDisabledBtn={disableCycloneDx}
          />
        )}
        {canSPDX && (
          <DownloadOption format="SPDX" onClick={setSelected} isDisabledBtn={disableSPDX} />
        )}
      </div>
    </ModalForm>
  );
};

export default GenerateSomReport;
