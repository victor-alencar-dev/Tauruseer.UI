import { useNavigate } from '@remix-run/react';
import { DataGrid, DataGridColumn, DialogInfo, setColumnsWidthCell } from '@tauruseer/core';
import React from 'react';
import { IProducts } from '../../../model/product.interface';
import { ActiveProduct, infoWindow } from '../../../model/product.model';
import { CustomCellCollection } from './custom-columns-grid';
import {
  businessImpactColumnsGridModel,
  businessImpactColumnsWidth,
  riskManagementColumnsGridModel,
  riskManagementColumnsWidth,
} from './products-grid.model';
interface IProps {
  data: Array<IProducts>;
  productType: ActiveProduct;
  selectedTab: number;
  btnText?: string;
  clickAction?: React.EventHandler<any>;
}
export function ProductsGrid({ data, productType, selectedTab, btnText, clickAction }: IProps) {
  const tooltipInfo =
    ActiveProduct.RiskManagement === selectedTab
      ? infoWindow.riskManagement
      : infoWindow.businessImpact;

  const [toggle, setToggle] = React.useState<boolean>(false);
  const handleToggleDialog = () => {
    setToggle(!toggle);
  };
  const dialogProps = {
    onClose: handleToggleDialog,
    title: tooltipInfo.title,
    infoContent: tooltipInfo.infoContent,
  };
  const navigate = useNavigate();
  const columnsGridModel: Array<any> =
    productType === ActiveProduct.RiskManagement
      ? [riskManagementColumnsGridModel, 'Risk Management', riskManagementColumnsWidth]
      : [businessImpactColumnsGridModel, 'Business Impact', businessImpactColumnsWidth];
  const columnsGridModelData = setColumnsWidthCell(columnsGridModel[0], columnsGridModel[2]);
  const CreateProductAction = () => {
    navigate('/products/new/configure-product/product-details');
  };
  return (
    <>
      <DataGrid
        title={columnsGridModel[1]}
        data={data}
        count
        filter
        hasIcon
        icon="k-i-help"
        IconOnClick={() => setToggle(true)}
        button
        btnText={btnText || 'Add New Product'}
        BtnOnClick={clickAction || CreateProductAction}
        columnModel={columnsGridModelData as Record<DataGridColumn, any>[]}
        customCellComponents={CustomCellCollection}
        filterPlaceholder="Find Product"
        filterField={['name']}
        sortable={true}
      />
      {toggle && <DialogInfo {...dialogProps} />}
    </>
  );
}

export default ProductsGrid;
