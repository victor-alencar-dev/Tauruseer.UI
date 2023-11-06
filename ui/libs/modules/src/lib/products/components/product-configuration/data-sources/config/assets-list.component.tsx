import { DataGrid, DataGridColumn } from '@tauruseer/core';
import React from 'react';
import { IMappedAsset } from '@tauruseer/module';
import { CustomCellCollection, MappingColumnModelList } from './asset-grid-model';

interface IAssetsListProps {
  mappedAssets?: IMappedAsset[];
  options?: {
    modify?: boolean;
  };
  description?: {
    singular: string;
    plural: string;
  };
  onOpenModal: any;
}

export const AssetsList: React.FC<IAssetsListProps> = ({ mappedAssets, onOpenModal }) => {
  return (
    <DataGrid
      title="Mapping"
      data={mappedAssets || []}
      count
      filter
      button
      btnText={'Add Mapping'}
      BtnOnClick={() => onOpenModal(true)}
      columnModel={MappingColumnModelList as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      filterPlaceholder="Search for asset name"
      filterField={['name']}
      sortable={true}
    />
  );
};
