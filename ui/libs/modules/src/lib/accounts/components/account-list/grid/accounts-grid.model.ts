import { GridCellProps } from "@progress/kendo-react-grid";
import { AccountsCustomCells } from "./accounts-grid-columns";

export const AccountsGridModel = [
  {
    field: 'name',
    title: 'Name',
    customCell: 'AccountNameTypeColumn',
  },
  {
    field: 'businessTypeId',
    title: 'Business Type',
    customCell: 'AccountBusinessTypeColumn'
  },
  {
    field: 'description',
    title: 'Description',
  },
  {
    field: 'options',
    title: 'Options',
  },
];

export const columnCustomCell = (props: GridCellProps, name: string) => {
  const { Element } = AccountsCustomCells.filter((col) => col.name === name)[0];
  return Element(props);
};
