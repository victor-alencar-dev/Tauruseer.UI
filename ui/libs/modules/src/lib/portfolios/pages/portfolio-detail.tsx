import { Breadcrumbs, ButtonIndicator, Header } from '@tauruseer/core';
import { IPortfolio, IProductsList, ProductsGrid, productListBtn } from '@tauruseer/module';
import React, { useState } from 'react';
import { AddProductForm } from '../components/form/portfolio-add-prodcut-component';
import { portfolioDetailBreadcrumbs } from '../model/portfolio.model';

interface IProps {
  portfolioDetail: IPortfolio;
  productsList: IProductsList;
}
export const PortfolioProducts = ({ portfolioDetail, productsList }: IProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isFormShown, setFormVisibility] = useState(false);
  const { products } = portfolioDetail;

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
      <div className="d-flex align-items-center justify-content-between">
        <Breadcrumbs
          data={portfolioDetailBreadcrumbs(`${portfolioDetail.name}`)}
          className="mt-2 mb-3"
        />
      </div>
      <Header title={`${portfolioDetail.name}`} icon="k-i-group" buttons={Buttons} />
      <ProductsGrid
        data={products || []}
        productType={selectedTab}
        selectedTab={selectedTab}
        btnText="Add Product to Portfolio"
        clickAction={() => setFormVisibility(true)}
      />
      {isFormShown && (
        <AddProductForm
          existingProduct={productsList.products}
          onCancel={() => setFormVisibility(false)}
          portfolioId={portfolioDetail?.portfolioId}
        />
      )}
    </div>
  );
};

export default PortfolioProducts;
