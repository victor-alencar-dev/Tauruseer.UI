import { Breadcrumbs, InfoCard, ModalForm } from '@tauruseer/core';
import {
  DependenciesTechnologiesDataGrid,
  IAffectedProducts,
  IVulnerability,
  VulnerabilityInfoCard,
  VulnerabilityRemediationAICard,
  vulnerabilityContent,
} from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import { SearchDetailBreadcrumbs } from '../model/search-breadcrumb.model';

export interface IVulnerabilitiesProps {
  vulnerability: IVulnerability;
  affectedProducts: IAffectedProducts[];
  aiRemediation?: {
    cve: string;
    remediationDescription: string;
    language: string;
  };
}

export const SearchDetails = ({
  vulnerability,
  affectedProducts,
  aiRemediation,
}: IVulnerabilitiesProps) => {
  const [showExpandModal, setShowExpandModal] = useState<boolean>(false);

  const content = vulnerabilityContent({
    vulnerability,
    onExpandModal: () => setShowExpandModal(true),
  });

  return (
    <>
      <Breadcrumbs
        data={SearchDetailBreadcrumbs(vulnerability.vulnerabilityId)}
        className="mb-4 mt-2"
      />
      <div className="row">
        <div className="col-12">
          <InfoCard content={content}></InfoCard>
        </div>
      </div>
      {aiRemediation && (
        <div className="row">
          <div className="col-12">
            <VulnerabilityRemediationAICard
              markdown={aiRemediation.remediationDescription}
              loading={false}
              language={aiRemediation.language?.toLowerCase()}
            />
          </div>
        </div>
      )}
      {showExpandModal && content.textbox && (
        <ModalForm
          title={content.header.title}
          onClose={() => setShowExpandModal(false)}
          width={1440}
        >
          <div
            className="code-vulnerabilities-expand-modal"
            style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}
          >
            {content.textbox.content}
          </div>
        </ModalForm>
      )}
    </>
  );
};
