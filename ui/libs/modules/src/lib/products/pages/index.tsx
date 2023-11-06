import { ButtonIndicator, Header } from '@tauruseer/core';
import { IProductsList, productListBtn } from '@tauruseer/module';
import React from 'react';
import ProductsGrid from '../components/product-list/grid/products-grid.component';

interface IProps {
  data: IProductsList;
}
export const Products = ({ data }: IProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const { products } = data;

  const setSelected = (key: number) => {
    setSelectedTab(key);
  };

  const Buttons = productListBtn.map((item, index) => {
    return (
      <ButtonIndicator
        Event={setSelected}
        id={index}
        key={index}
        title={item.title as string}
        isActive={selectedTab === index}
        hasIndicator={item.hasIndicator as boolean}
      />
    );
  });

  return (
    <div className="pb-4">
      <Header title="Products" icon="k-i-window-restore" buttons={Buttons} />
      <ProductsGrid data={products} productType={selectedTab} selectedTab={selectedTab} />
    </div>
  );
};

export default Products;
