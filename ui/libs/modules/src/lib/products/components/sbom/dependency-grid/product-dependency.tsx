import { GridPageChangeEvent, GridSortChangeEvent } from '@progress/kendo-react-grid';
import { useFetcher } from '@remix-run/react';
import { DataGrid, DataGridColumn } from '@tauruseer/core';
import { SBOM_REPORT_ACTION } from '@tauruseer/module';
import { useEffect, useState } from 'react';
import { SbomEmptyGridState, SbomLoadingGridState } from '../empty-states';
import { CustomCellCollection, ProductDependencyColumnsGrid } from './columns-grid.model';

interface IVulnerabilitiesDataGridProps {
  productId: string | undefined;
}

const ProductDependencyDataGrid = ({ productId }: IVulnerabilitiesDataGridProps) => {
  const fetcher = useFetcher();
  const [vulnerabilitiesList, setVulnerabilitiesList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [sort, setSort] = useState<any>([]);
  //default sort values
  const [sorting, setSorting] = useState<string>('Descending');
  const [orderBy, setOrderBy] = useState<string>('severity');

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    getVulnerabilitiesInfo(currentPage, orderBy, sorting);
    return () => clearTimeout(timer);
  }, []);

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

  const getVulnerabilitiesInfo = (page: number, orderBy: string, sorting: string) => {
    fetcher.load(
      `/products/${productId}/sbom/data-aggregation?option=${SBOM_REPORT_ACTION.GET_PRODUCT_DEPENDENCY}&page=${page}&limit=8&orderBy=${orderBy}&sort=${sorting}`,
    );
  };

  const onPageChange = (event: GridPageChangeEvent) => {
    setVulnerabilitiesList([]);
    setCurrentPage(event.page.skip);
    getVulnerabilitiesInfo(event.page.skip, orderBy, sorting);
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
    getVulnerabilitiesInfo(0, value, sortValue);
  };

  return (
    <DataGrid
      title={`Product Dependencies`}
      data={vulnerabilitiesList}
      columnModel={ProductDependencyColumnsGrid as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      customClass="sbom-grid"
      count
      filter
      filterPlaceholder="Find Dependency"
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

export default ProductDependencyDataGrid;
