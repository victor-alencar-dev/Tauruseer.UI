import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { Breadcrumbs, CopyTextToClipboard } from '@tauruseer/core';
import classNames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { assetDetailBreadcrumbs } from '../model/asset-discovery-breadcrumbs.model';
import { DetailsContent } from '../model/asset-discovery-detail.model';
import { IAssetDiscovery } from '../model/asset-discovery.interface';

interface IProps {
  data: IAssetDiscovery; //TODO: changes for a detailed model
  scanDetails: any;
}

export function AssetDiscoveryDetails({ data, scanDetails }: IProps) {
  const {
    dataSource: { scanKey },
  } = data;
  const detailsContent = DetailsContent(data, scanDetails);
  const assetTitle = detailsContent[0].content[0].title;
  const statusText = (isDismissed: boolean, isInvestigated: boolean, isMapped: boolean): string => {
    let statusText = 'Discovered';
    if (isDismissed) statusText = 'Risk Accepted';
    if (isInvestigated && !isDismissed) statusText = 'Investigating';
    if (isMapped) statusText = 'Mapped';
    return statusText;
  };

  return (
    <Container fluid>
      <Breadcrumbs data={assetDetailBreadcrumbs(assetTitle)} className="mt-1 mb-2" />
      <Row>
        {detailsContent.map((c, i) => {
          return (
            <div className={classNames('w-50 p-2', c.display)} key={i}>
              {c.content.map((e, i) => {
                return (
                  <Card className="card card-content mb-3" style={{ height: e.height }} key={i}>
                    <CardBody>
                      <CardTitle className="typography-h1">
                        <div className="row">
                          <div
                            className="col-7 mb-3"
                            style={{ minWidth: '12rem', display: 'flex' }}
                          >
                            {e.icon && (
                              <div className="col-1">
                                <span className="fs-1">{e.icon}</span>
                              </div>
                            )}
                            <div className={classNames('col-11 flex-column', { 'ms-3': e.icon })}>
                              <span className="d-block ff-ubuntu text-xl mb-1 font-medium ">
                                {e.title}
                              </span>
                              <span className="d-block ff-montserrat text-md text-subtitle font-regular">
                                {e.subtitle}
                              </span>
                            </div>
                          </div>
                          {e.scanKey && (
                            <div className="col-4 scan-key" style={{ paddingLeft: '15px' }}>
                              <div className={classNames('d-inline')}>
                                <span className="d-block ff-ubuntu text-md mb-1 font-medium ">
                                  Scan Key <i className="fa-solid fa-key ms-1 text-sm"></i>
                                </span>
                                <span className="d-block ff-montserrat text-sm font-regular text-subtitle">
                                  Tauruseer SCA Scan Key
                                </span>
                                <CopyTextToClipboard
                                  copyText={scanKey}
                                  alertMessage="Copied to clipboard"
                                >
                                  <span
                                    className="d-block ff-montserrat text-sm font-regular mt-2"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <i
                                      className="fa-regular fa-copy me-1"
                                      style={{ color: '#4231B4' }}
                                    ></i>
                                    {scanKey}
                                  </span>
                                </CopyTextToClipboard>
                              </div>
                            </div>
                          )}
                        </div>
                        {e.hasStatus && (
                          <div className="chip chip-primary-dark status-info">
                            {statusText(e.isDismissed, e.isInvestigated, e.isMapped)}
                          </div>
                        )}
                      </CardTitle>
                      <Row className="w-100 h-75 d-flex justify-content-center">{e.element}</Row>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          );
        })}
      </Row>
    </Container>
  );
}

export default AssetDiscoveryDetails;
