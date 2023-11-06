import { GridPageChangeEvent, GridSortChangeEvent } from '@progress/kendo-react-grid';
import { useFetcher } from '@remix-run/react';
import { DataGrid, DataGridColumn } from '@tauruseer/core';
import { SBOM_REPORT_ACTION } from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import { SBOMStore } from '../../../state/sbom-storage';
import { SbomEmptyGridState, SbomLoadingGridState } from '../empty-states';
import { CustomCellCollection, columnsGrid } from './columns-grid.model';

interface IVulnerabilitiesDataGridProps {
  productId: string | undefined;
  reloadGrid: boolean;
}

const DependencyDataGrid = ({ productId, reloadGrid }: IVulnerabilitiesDataGridProps) => {
  const storage = SBOMStore((state) => state);
  const fetcher = useFetcher();
  const canRequest = useRef<boolean>(false);
  const [assetId, setAssetId] = useState<number>(0);
  const [vulnerabilitiesList, setVulnerabilitiesList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [sort, setSort] = useState<any>([]);
  //default sort values
  const [sorting, setSorting] = useState<string>('Descending');
  const [orderBy, setOrderBy] = useState<string>('severity');
  useEffect(() => {
    onReportChange();
  }, [reloadGrid]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (canRequest.current) {
      onReportChange();
    } else {
      // race condition timer
      timer = setTimeout(() => onReportChange, 1000);
      canRequest.current = true;
    }
    return () => clearTimeout(timer);
  }, [storage.selectedRepository]);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data) {
      const {
        data: { data, totalCount },
      } = fetcher.data;
      setTotalRecords(totalCount);
      setVulnerabilitiesList(data);
    }
  }, [fetcher.data]);

  const onReportChange = () => {
    if (storage.selectedRepository) {
      setAssetId(storage.selectedRepository);
      getVulnerabilitiesInfo(storage.selectedRepository, currentPage, orderBy, sorting);
    } else {
      setCurrentPage(0);
      setVulnerabilitiesList([]);
    }
  };

  const getVulnerabilitiesInfo = (
    assetId: number,
    page: number,
    orderBy: string,
    sorting: string,
  ) => {
    fetcher.load(
      `/products/${productId}/sbom/data-report/${assetId}?option=${SBOM_REPORT_ACTION.GET_DEPENDENCY_LIST}&page=${page}&limit=8&orderBy=${orderBy}&sort=${sorting}`,
    );
  };

  const onPageChange = (event: GridPageChangeEvent) => {
    setVulnerabilitiesList([]);
    setCurrentPage(event.page.skip);
    getVulnerabilitiesInfo(assetId, event.page.skip, orderBy, sorting);
  };
  const onSortChange = (event: GridSortChangeEvent) => {
    setVulnerabilitiesList([]);
    const { sort } = event;
    let value;
    let sortValue;
    // sometimes the sort comes empty
    if (!sort.length) {
      sortValue = sorting === 'Ascending' ? 'Descending' : 'Ascending';
      value = orderBy;
      setSort([{ field: value, dir: sortValue === 'Ascending' ? 'asc' : 'desc' }]);
    } else {
      sortValue = sort[0].dir === 'asc' ? 'Ascending' : 'Descending';
      value = sort[0].field;
      setSort(sort);
    }
    setOrderBy(value);
    setSorting(sortValue);
    setCurrentPage(0);
    getVulnerabilitiesInfo(assetId, 0, value, sortValue);
  };

  return (
    <DataGrid
      title={`Repository Dependencies`}
      data={vulnerabilitiesList}
      columnModel={columnsGrid as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      customClass="sbom-grid"
      count
      sortable={true}
      offset={currentPage}
      limit={8}
      height={627}
      serverSort={sort}
      onServerSorting={onSortChange}
      totalRecords={totalRecords}
      serverSidePaging
      onServerPagingChange={onPageChange}
      EmptyStateComponent={
        fetcher.state === 'loading' && !vulnerabilitiesList.length
          ? SbomLoadingGridState
          : SbomEmptyGridState
      }
    />
  );
};

export default DependencyDataGrid;
