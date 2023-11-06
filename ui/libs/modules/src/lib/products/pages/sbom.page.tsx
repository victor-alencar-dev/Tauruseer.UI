import { useLocation } from '@remix-run/react';
import { Breadcrumbs, Header } from '@tauruseer/core';
import { IMappedAsset, IRepository, SBOM_PATH } from '@tauruseer/module';
import { Outlet } from 'react-router';
import { SbomReportSelection } from '../components/sbom/dropdown-filters/sbom-filter.component';
import SbomProductFilterView from '../components/sbom/product-aggregated-filter-swicth';
import { productSbomBreadcrumbs } from '../model/products-breadcrumbs.model';

interface ISBOMreport {
  mappedAsset: Array<IMappedAsset>;
  product: {
    id: string;
    name: string;
  };
}
export const SbomReport = ({ mappedAsset, product }: ISBOMreport) => {
  const { pathname } = useLocation();
  //get current url path
  const path = pathname.split('/').slice(-1).pop();
  const repositoriesList: Array<IRepository> = mappedAsset
    .filter((r) => r.name)
    .map((a) => {
      const { assetId, name, id, productId } = a;
      return {
        assetId,
        name,
        id,
        productId,
      };
    });
  return (
    <div className="pb-4">
      <Breadcrumbs data={productSbomBreadcrumbs(product.id, product.name)} className="mb-3" />
      <Header
        title={`${path === SBOM_PATH.AGGREGATED ? 'Product' : 'Repository'} SBOM Reports`}
        icon="fa-regular fa-file-chart-column"
        switchOption={
          path === SBOM_PATH.AGGREGATED ? <SbomProductFilterView path={path} checked /> : null
        }
        children={
          path === SBOM_PATH.REPORT ? <SbomReportSelection repository={repositoriesList} /> : null
        }
      />
      <Outlet />
    </div>
  );
};

export default SbomReport;
