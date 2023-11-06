import { Button } from '@progress/kendo-react-buttons';
import { DEVICES, ExternalServiceIcon, getActualDeviceRes } from '@tauruseer/core';
import { useEffect, useState } from 'react';

interface IProps {
  scanResults: Array<any>;
  projectType: string;
  hasScanResults: boolean;
}

export const EmptyScanResult: React.FC<{ isScanned: boolean }> = ({ isScanned }) => {
  return isScanned ? (
    <div className="text-center d-flex flex-column align-self-center  justify-content-center empty-scan-result">
      <img src="/scan-result-empty.svg" alt="" className="align-self-center" />
      <label className="ff-ubuntu text-md font-medium mt-2">No vulnerabilities found</label>
    </div>
  ) : (
    <div className="text-center d-flex flex-column align-self-center  justify-content-center empty-scan-result">
      <img src="/scan-result-empty.svg" alt="" className="align-self-center" />
      <label className="ff-ubuntu text-md font-medium mt-2">After scanning this asset,</label>
      <label className="ff-ubuntu text-md font-medium mb-3">details will be displayed here</label>
    </div>
  );
};
const ScannerResult = ({ scanResults, hasScanResults }: IProps): any => {
  const device = getActualDeviceRes();
  const scanLength = scanResults.length;
  const [cardHeight, setCardHeight] = useState<string>('');
  const [vulnerabilities, setVulnerabilities] = useState<Array<any>>(scanResults.slice(0, 3));
  useEffect(() => {
    if (device === DEVICES.LAPTOP) {
      setCardHeight('68vh');
    }
    if (device === DEVICES.FULL_HD) {
      setCardHeight('48vh');
    }
    if (device === DEVICES.TWO_K || device === DEVICES.FOUR_K) {
      setCardHeight('38vh');
    }
  }, [device]);
  const loadVulnerabilities = () => {
    setVulnerabilities(scanResults.slice(0, vulnerabilities.length + 3));
  };

  return scanLength ? (
    <div className="d-flex flex-column">
      <div className="card-content ">
        <div style={{ height: cardHeight, overflowY: 'auto' }}>
          {vulnerabilities.map((s, i) => {
            return (
              <div
                key={i}
                className="ff-montserrat mt-3 border border-dark-subtle rounded-2 p-3 text-sm"
              >
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">
                    Dependency: {s.dependencyName} {`v-${s.dependencyVersion}`}
                  </span>
                  <span
                    className="align-middle d-flex align-items-center"
                    style={{ color: '#4231B4' }}
                  >
                    <ExternalServiceIcon projectType={s.language || ''} className="fs-5 me-2" />
                    <span>{s.language || 'No Project Type Found'}</span>
                  </span>
                </div>
                {s.vulnerabilities.map((v: any, i: number) => {
                  return (
                    <div key={i} className="ps-2 ">
                      <label className="fw-semibold">{v.cveId}</label>
                      <p>{v.description}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {vulnerabilities.length >= 3 && (
        <div className="align-self-center">
          <Button
            themeColor={'light'}
            fillMode="solid"
            size="large"
            className="button button-secondary me-3"
            rounded="medium"
            onClick={loadVulnerabilities}
          >
            Load More
          </Button>
          <span className="text-muted text-sm d-block ff-montserrat" style={{ marginTop: '5px' }}>
            Displaying {vulnerabilities.length} of {scanResults.length}
          </span>
        </div>
      )}
    </div>
  ) : (
    <EmptyScanResult isScanned={hasScanResults} />
  );
};

export default ScannerResult;
