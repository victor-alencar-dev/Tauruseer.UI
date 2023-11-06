import { filterBy, getter, orderBy } from '@progress/kendo-data-query';
import { Button } from '@progress/kendo-react-buttons';
import { Icon } from '@progress/kendo-react-common';
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridHeaderCellProps,
  GridNoRecords,
  GridPageChangeEvent,
  GridSortChangeEvent,
  getSelectedState,
} from '@progress/kendo-react-grid';
import { Input, Switch } from '@progress/kendo-react-inputs';
import {
  ButtonIndicator,
  FaIcon,
  IDataGridProps,
  IPageState,
  IconButton,
  PagerGrid,
  TAction,
  columnsCustomCell,
  getDataRecordsToDisplay,
} from '@tauruseer/core';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

export const DEFAULT_HEADER_HEIGHT = 90;

export function DataGrid<T>({
  BtnOnClick,
  btnText,
  button,
  columnModel,
  count,
  countStrings,
  customCellComponents,
  customClass,
  data,
  filter,
  filterPlaceholder,
  hasIcon,
  icon,
  sortable,
  IconOnClick,
  buttonGroup,
  title,
  minHeight,
  height,
  filterField,
  pageable,
  resizable,
  EmptyStateComponent,
  switchFilter,
  switchLabel,
  switchFilterAction,
  // server paging props
  serverSidePaging,
  totalRecords,
  offset,
  limit,
  serverSort,
  onServerSorting,
  onServerPagingChange,
  actions,
  setSelectedState,
  dataItemKey,
  selectedState,
  headline,
}: IDataGridProps<T>) {
  const take = getDataRecordsToDisplay();
  const [gridHeight, setGridHeight] = useState<string>();
  const [page, setPage] = React.useState<IPageState>({
    skip: 0,
    take,
  });

  // To enable selection we should pass an object with the id of the item as a key and a boolean as a value.
  // The boolean value will indicate if the item is selected or not.
  // The id of the item should be unique.

  // The selected state should be stored in the parent component.
  // The parent component should pass the selected state to the grid.
  // The props needed are:
  // - selectedState: the selected state object
  // - setSelectedState: the function to update the selected state
  // - dataItemKey: the key of the item to use as id

  const SELECTED_FIELD = 'selected';
  const idGetter = getter(dataItemKey || '');

  const onSelectionChange = React.useCallback(
    (event: any) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState || {},
        dataItemKey: dataItemKey || '',
      });
      setSelectedState && setSelectedState(newSelectedState);
    },
    [selectedState],
  );

  const onHeaderSelectionChange = React.useCallback((event: any) => {
    const checkboxElement = event.syntheticEvent.target;
    const checked = checkboxElement.checked;
    const newSelectedState: any = {};
    filteredData.forEach((item: any) => {
      newSelectedState[idGetter(item)] = checked;
    });
    setSelectedState && setSelectedState(newSelectedState);
  }, []);

  // When the sortable prop in the grid is set to true, each column will have a sort property, Unless it the sortable prop is set to false inside the column model.
  const [sort, setSort] = React.useState<any>([]);
  const [filterValue, setFilterValue] = React.useState<string>('');
  const [filteredData, setFilteredData] = React.useState<T[]>(data);

  const refHeaderGrid = useRef(null);
  useEffect(() => {
    setHighlight();
  }, [height]);

  useEffect(() => {
    setFilteredData(data);
    setPage({ skip: 0, take });
  }, [data]);

  useEffect(() => {
    setPage({ skip: 0, take });
  }, [take]);

  const setHighlight = () => {
    const gridHeight = height && showHeader ? `${height - DEFAULT_HEADER_HEIGHT}px` : '';
    setGridHeight(gridHeight);
  };
  const showHeader = count || title;
  const countString =
    data.length === 1 ? countStrings?.singular ?? 'Element' : countStrings?.plural ?? 'Elements';
  const dataGridClassName = classNames(`data-grid ${customClass}`, {
    'data-grid-spaceless': showHeader,
    'mb-4': showHeader,
  });
  const containerClassName = classNames({ 'grid-container': showHeader });
  const pageChange = (event: GridPageChangeEvent) => {
    setPage({ skip: event.page.skip, take: event.page.take });
  };
  const sortEvent = (e: GridSortChangeEvent) => {
    const { sort } = e;
    // this will allow sorting for nested elements
    const titleSort = sort.map((item) => ({
      field: `${item.field}.title`,
      dir: item.dir,
    }));

    setSort([...titleSort, ...sort]);
    setPage({ skip: 0, take });
  };

  const filterData = (data: T[], filterValue: string) => {
    const filters = (filterField ?? []).map((field) => ({
      field: field,
      value: filterValue,
      operator: 'contains',
      ignoreCase: true,
    }));
    const filteredData =
      filterValue && filterField ? filterBy(data, { logic: 'or', filters: filters }) : data;

    return filteredData;
  };

  const Actions = actions?.map((item: TAction, index) => (
    <ButtonIndicator
      Event={item.event}
      id={index}
      key={index}
      title={item.title}
      valueIndicator={item.valueIndicator}
      isActive={item.isActive}
      hasIndicator={item.hasIndicator}
    />
  ));

  return (
    <div className={containerClassName} style={{ height }}>
      {showHeader && (
        <div className="d-flex justify-content-between p-4" ref={refHeaderGrid}>
          <div
            className={classNames({
              'w-50': filter,
              'w-100': !filter,
              'flex-row': true,
              'd-flex': true,
            })}
          >
            <div className="d-flex">
              <div>
                {headline && <label className="d-block typography-h1 text-xl">{headline}</label>}
                {title && <label className="d-block typography-h1">{title}</label>}
                {count && (
                  <label className="d-block typography-h2 text-muted">
                    {`${data.length} ${countString}`}
                  </label>
                )}
              </div>

              {hasIcon && (
                <IconButton icon="k-i-help" onClick={IconOnClick} style={{ marginLeft: '6px' }} />
              )}
            </div>
            {true && <div className="grid-container__actions">{Actions}</div>}
          </div>

          <div className="grid-container__heading-right">
            {buttonGroup}

            {filter && filterField && (
              <div className="grid-container__filter">
                <FaIcon icon="search" size={16} classes="grid-container__filter-icon" />
                <Input
                  className="grid-container__filter-input"
                  placeholder={filterPlaceholder}
                  onChange={(e) => {
                    setFilterValue(e.target.value as string);
                    setFilteredData(filterData(data, e.target.value as string));
                  }}
                  value={filterValue}
                />
              </div>
            )}
            {switchFilter && (
              <div className="d-flex justify-content-end align-items-center me-4 custom-switch">
                <Switch
                  size={'medium'}
                  trackRounded={'full'}
                  thumbRounded={'full'}
                  onChange={switchFilterAction}
                />
                <label className="ms-3 ff-ubuntu text-md font-regular">{switchLabel}</label>
              </div>
            )}
            {button && (
              <Button
                size="large"
                themeColor={'dark'}
                fillMode="solid"
                rounded="medium"
                className="button button-primary ms-2"
                iconClass="fa-solid fa-plus"
                onClick={BtnOnClick}
              >
                {btnText}
              </Button>
            )}
          </div>
        </div>
      )}

      <div className={dataGridClassName}>
        <Grid
          data={(pageable || !serverSidePaging
            ? orderBy(filteredData, sort).slice(page.skip, page.skip + page.take)
            : orderBy(filteredData, sort)
          ).map((item) =>
            selectedState
              ? {
                  ...item,
                  [SELECTED_FIELD]: selectedState[idGetter(item)],
                }
              : item,
          )}
          skip={offset || page.skip}
          take={limit || page.take}
          total={totalRecords || filteredData.length}
          pageable={pageable ?? true}
          resizable={resizable ?? true}
          sortable={sortable ?? false}
          sort={serverSort || sort}
          onSortChange={onServerSorting || sortEvent}
          pager={PagerGrid}
          onPageChange={serverSidePaging ? onServerPagingChange : pageChange}
          style={{ height: gridHeight }}
          dataItemKey={dataItemKey}
          selectedField={SELECTED_FIELD}
          selectable={
            selectedState
              ? {
                  enabled: true,
                  drag: false,
                  cell: false,
                  mode: 'multiple',
                }
              : {}
          }
          onSelectionChange={onSelectionChange}
          onHeaderSelectionChange={onHeaderSelectionChange}
        >
          {selectedState && (
            <GridColumn
              field={SELECTED_FIELD}
              width="50px"
              className="data-grid__checkbox"
              headerSelectionValue={
                filteredData.findIndex((item) => !selectedState[idGetter(item)]) === -1
              }
            />
          )}
          {columnModel.map((grid: any, i: any) => {
            if (grid.customCell || grid.customHeaderCell) {
              const Cell = grid.customCell
                ? (props: GridCellProps) => {
                    return columnsCustomCell(props, grid.customCell, customCellComponents || []);
                  }
                : undefined;

              const HeaderCell = grid.customHeaderCell
                ? (props: GridCellProps) => {
                    return columnsCustomCell(
                      props,
                      grid.customHeaderCell,
                      customCellComponents || [],
                    );
                  }
                : undefined;

              return (
                <GridColumn
                  width={grid.width}
                  field={grid.field}
                  title={grid.title}
                  key={i}
                  cell={Cell}
                  headerCell={HeaderCell as React.ComponentType<GridHeaderCellProps> | undefined}
                  sortable={grid.sortable ?? true}
                />
              );
            }
            return <GridColumn field={grid.field} title={grid.title} key={i} />;
          })}
          {EmptyStateComponent ? (
            EmptyStateComponent
          ) : (
            <GridNoRecords>
              <div className="data-empty-grid" style={{ height: minHeight, opacity: 0.5 }}>
                <Icon name="grid-layout" size="medium" />
                <div className="data-empty-message">
                  {filterValue && data.length > 0 ? 'No Records Found' : 'No Records Available'}
                </div>
              </div>
            </GridNoRecords>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default DataGrid;
