import { GridCellProps } from '@progress/kendo-react-grid';
export type DataGridColumn =
  | 'field'
  | 'title'
  | 'customCell'
  | 'width'
  | 'sortable'
  | 'customHeaderCell';
export type StringCount = 'singular' | 'plural';

export interface Breakpoints {
  laptop: number | null;
  fullHD: number | null;
  '2k'?: number | null;
}
export interface IGridColumnModel {
  field: string;
  title: string;
  customCell?: string;
  customHeaderCell?: string;
  width?: number;
  sortable?: boolean;
}
export interface IPageState {
  skip: number;
  take: number;
}

export type TAction = {
  event: () => void;
  title: string;
  valueIndicator: number;
  isActive: boolean;
  hasIndicator: boolean;
};

export interface IDataGridProps<T> {
  data: Array<T>;
  columnModel: Record<DataGridColumn, any>[];
  customClass?: string;
  maxHeight?: string;
  title?: string;
  filter?: boolean;
  filterPlaceholder?: string;
  hasIcon?: boolean;
  icon?: string;
  count?: boolean;
  IconOnClick?: React.EventHandler<any>;
  countStrings?: Record<StringCount, string>;
  button?: boolean;
  btnText?: string;
  BtnOnClick?: React.EventHandler<any>;
  customCell?: (props: GridCellProps, name: string) => JSX.Element;
  customCellComponents?: Array<any>;
  buttonGroup?: any;
  minHeight?: string;
  height?: number;
  sortable?: boolean;
  filterField?: string[];
  pageable?: boolean;
  resizable?: boolean;
  EmptyStateComponent?: React.ReactNode;
  switchLabel?: string;
  switchFilter?: boolean;
  switchFilterAction?: React.EventHandler<any>;

  //server side paging
  serverSidePaging?: boolean;
  totalRecords?: number;
  offset?: number;
  limit?: number;
  serverSort?: any;
  onServerSorting?: React.EventHandler<any>;
  onServerPagingChange?: React.EventHandler<any>;
  actions?: TAction[];
  headline?: string;
  selectedState?: any;
  setSelectedState?: React.Dispatch<React.SetStateAction<any>>;
  dataItemKey?: string;
}
