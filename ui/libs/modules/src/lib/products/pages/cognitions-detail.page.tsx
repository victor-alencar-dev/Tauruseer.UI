import { ProductDataGridPage } from '@tauruseer/core';
import { ICognitionDetails, IProducts, cognitionDetailsBreadcrumbData } from '@tauruseer/module';
import CognitionActionCard from '../components/cognitions/detail/cognition.action-card';
import CognitionInfoCard from '../components/cognitions/detail/cognition.info-card';

export interface CognitionsProps {
  product: IProducts;
  cognition: ICognitionDetails;
}

export const CognitionDetails = ({ product, cognition }: CognitionsProps) => {
  return (
    <ProductDataGridPage
      breadcrumbData={cognitionDetailsBreadcrumbData(product, cognition)}
      product={product}
    >
      <div className="row">
        <div className="col-6">
          <CognitionInfoCard product={product} cognition={cognition} />
        </div>

        <div className="col-6">
          <CognitionActionCard product={product} cognition={cognition} />
        </div>
      </div>
    </ProductDataGridPage>
  );
};
