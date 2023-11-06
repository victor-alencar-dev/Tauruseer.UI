import { GridPageChangeEvent, GridSortChangeEvent } from '@progress/kendo-react-grid';
import { useFetcher } from '@remix-run/react';
import { DataGrid, DataGridColumn } from '@tauruseer/core';
import { SBOM_REPORT_ACTION, sbomReportType } from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import { SBOMStore } from '../../../state/sbom-storage';
import { SbomEmptyHistoryReportGridState, SbomLoadingGridState } from '../empty-states';
import { CustomCellCollection, RepoHistoryColumnsGrid } from './columns-grid.model';

interface IVulnerabilitiesDataGridProps {
  productId: string | undefined;
  sbomReport: sbomReportType;
}

const ReportHistoryDataGrid = ({ productId, sbomReport }: IVulnerabilitiesDataGridProps) => {
  const storage = SBOMStore((state) => state);
  const fetcher = useFetcher();
  const fetcherDownload = useFetcher();
  const canRequest = useRef<boolean>(false);
  const [vulnerabilitiesList, setVulnerabilitiesList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [sort, setSort] = useState<any>([]);
  //default sort values
  const [sorting, setSorting] = useState<string>('Descending');
  const [orderBy, setOrderBy] = useState<string>('created');

  useEffect(() => {
    if (sbomReport === 'SbomProduct' || storage.selectedRepository) {
      getVulnerabilitiesInfo(currentPage, orderBy, sorting);
    }
  }, []);

  useEffect(() => {
    if (storage.downloadReport) {
      fetcherDownload.load(
        `/products/${productId}/sbom/data-aggregation?option=${SBOM_REPORT_ACTION.GET_REPORT_DOWNLOAD_URL}&reportId=${storage.reportId}`,
      );
    }
  }, [storage.downloadReport]);

  // valid just when the page is sbom repository
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

  // download report from api call
  useEffect(() => {
    if (!fetcherDownload.data && fetcherDownload.state === 'loading') {
      return;
    }
    if (fetcherDownload.data) {
      storage.setDownloadReport(false);
      storage.setReportId('');
      const { data } = fetcherDownload.data;
      if (data.fileURL) {
        const link = document.createElement('a');
        link.setAttribute('href', data.fileURL);
        link.setAttribute('download', '');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }, [fetcherDownload.data]);

  // reload grid data after generate a report
  useEffect(() => {
    if (storage.reportsRunning) {
      getVulnerabilitiesInfo(0, orderBy, sorting);
    }
  }, [storage.reportsRunning]);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data) {
      const {
        data: { data, totalCount },
      } = fetcher.data;
      storage.setNewReportRunning(false);
      setTotalRecords(totalCount);
      setVulnerabilitiesList(data);
    }
  }, [fetcher.data]);

  const getVulnerabilitiesInfo = (page: number, orderBy: string, sorting: string) => {
    //depend on the current page, the objectid differs
    const objectId = sbomReport === 'SbomProduct' ? productId : storage.selectedRepository;
    fetcher.load(
      `/products/${productId}/sbom/data-aggregation?option=${SBOM_REPORT_ACTION.GET_PRODUCT_REPORT_HISTORY}&objectId=${objectId}&reportPage=${sbomReport}&page=${page}&limit=8&orderBy=${orderBy}&sort=${sorting}`,
    );
  };

  // event when select a repository
  const onReportChange = () => {
    if (storage.selectedRepository) {
      getVulnerabilitiesInfo(currentPage, orderBy, sorting);
    } else {
      setCurrentPage(0);
      setVulnerabilitiesList([]);
    }
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
      title={`Report History`}
      data={vulnerabilitiesList}
      columnModel={RepoHistoryColumnsGrid as Record<DataGridColumn, any>[]}
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
          : SbomEmptyHistoryReportGridState
      }
    />
  );
};

export default ReportHistoryDataGrid;
