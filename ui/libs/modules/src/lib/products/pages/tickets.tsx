import { StepperChangeEvent } from '@progress/kendo-react-layout';
import { IProducts, IWorkTrackingTool, TrackItemStatus } from '@tauruseer/module';
import { useState } from 'react';
import ProductDetailHeader from '../components/detail-header/product-detail-header';
import PrioritizedRisksBreadcrumbs from '../components/prioritized-risks/breadcrumbs/prioritized-risks.breadcrumbs.component';
import { TrackItemsContainer } from '../components/tickets/track-items.container.component';
import { TrackItemsHeader } from '../components/tickets/track-items.header.component';
import { Breadcrumbs } from '@tauruseer/core';

interface IPrioritizedRisksProps {
  productDetail: IProducts;
  data: {
    teamMembers: any;
    title: string;
    description: string;
  };
}

export const Tickets = ({ productDetail, data }: IPrioritizedRisksProps) => {
  const [step, setStep] = useState<TrackItemStatus>(TrackItemStatus.WORK_ITEM_TOOL);
  const [helperTexts, setHelperTexts] = useState<string[]>(Array(3).fill(''));
  const handleStepChange = (e: StepperChangeEvent) => {
    setStep(e.value);
  };
  const [workTrackingTool, setWorkTrackingTool] = useState<IWorkTrackingTool | null>(null);

  const breadcrumbsData = [
    { id: 'products', text: 'Products', to: '/products' },
    { id: 'product', text: productDetail.name, to: `/products/${productDetail.id}/detail/` },
    { id: 'track-item', text: 'Track Item', disabled: true, to: '/#' },
  ];

  return (
    <>
      <Breadcrumbs data={breadcrumbsData} className="mt-2 mb-3" />
      <ProductDetailHeader {...productDetail} />
      <TrackItemsHeader
        step={step}
        handleStepChange={handleStepChange}
        setStep={setStep}
        helperTexts={helperTexts}
        setHelperTexts={setHelperTexts}
        setWorkTrackingTool={setWorkTrackingTool}
      />
      <TrackItemsContainer
        step={step}
        setStep={setStep}
        setHelperTexts={setHelperTexts}
        helperTexts={helperTexts}
        workTrackingTool={workTrackingTool}
        data={data}
      />
    </>
  );
};
