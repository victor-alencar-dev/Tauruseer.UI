import { Button } from '@progress/kendo-react-buttons';
import { Icon } from '@progress/kendo-react-common';
import { GridNoRecords } from '@progress/kendo-react-grid';
import { useNavigate } from '@remix-run/react';
import { DataGrid, DataGridColumn } from '@tauruseer/core';
import { BtnActive, IAssetDiscovery, mainPageBtnIndicator } from '@tauruseer/module';
import {
  discoveredColumnsGridModel,
  investigatingColumnsGridModel,
  riskAcceptedColumnsGridModel,
} from './asset-discovery-grid.model';
import { CustomCellCollection } from './custom-columns-grid';

interface IProps {
  data?: IAssetDiscovery[];
  selectedTab?: number;
  showCTAOnEmptyList: boolean;
}
export function AssetDiscoveryTGrid(props: IProps) {
  const { showCTAOnEmptyList } = props;
  const navigate = useNavigate();
  const dataSourcesLink = '/datasources';

  let columnsGridModel;
  if (props.selectedTab === BtnActive.Discovered) columnsGridModel = discoveredColumnsGridModel;
  if (props.selectedTab === BtnActive.RiskAccepted) columnsGridModel = riskAcceptedColumnsGridModel;
  if (props.selectedTab === BtnActive.Investigating)
    columnsGridModel = investigatingColumnsGridModel;
  if (props.selectedTab === BtnActive.IsMapped) columnsGridModel = discoveredColumnsGridModel;
  const emptyState = (
    <GridNoRecords>
      <div className="data-empty-grid" style={{ height: '200px' }}>
        <Icon name="grid-layout" size="medium" style={{ opacity: 0.5 }} />
        <div className="data-empty-message" style={{ opacity: 0.5 }}>
          {'Your account is not connected to a data source.'}
        </div>
        <Button
          size="large"
          themeColor={'dark'}
          fillMode="solid"
          rounded="medium"
          className="button-primary mt-3"
          onClick={() => navigate(dataSourcesLink)}
        >
          {'Connect to a data source'}
        </Button>
      </div>
    </GridNoRecords>
  );

  return (
    <DataGrid
      title={mainPageBtnIndicator[props.selectedTab ?? 0].title}
      count
      data={props.data || []}
      columnModel={columnsGridModel as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      sortable={true}
      filter
      filterPlaceholder="Find Asset"
      filterField={['name']}
      EmptyStateComponent={showCTAOnEmptyList && props.data?.length === 0 ? emptyState : null}
    />
  );
}

export default AssetDiscoveryTGrid;
