import { GridCellProps } from '@progress/kendo-react-grid';
import { DEVICES, IGridColumnModel, getActualDeviceRes } from '@tauruseer/core';

export const getDataRecordsToDisplay = () => {
  const device = getActualDeviceRes();
  switch (device) {
    case DEVICES.FULL_HD:
      return 8;
    case DEVICES.TWO_K:
    case DEVICES.FOUR_K:
      return 15;
    case DEVICES.LAPTOP:
      return 5;
    default:
      return 10;
  }
};
export const setColumnsWidthCell = (columns: IGridColumnModel[], widthRef: any) => {
  const device = getActualDeviceRes();
  return columns.map((col) => {
    return {
      ...col,
      ...(widthRef[col?.field]?.[device] && { width: widthRef[col.field][device] }),
    };
  });
};
export const columnsCustomCell = (
  props: GridCellProps,
  name: string,
  CustomCellCollection: Array<any>,
) => {
  const { Element } = CustomCellCollection.filter((col) => col.name === name)[0];
  return Element(props);
};
