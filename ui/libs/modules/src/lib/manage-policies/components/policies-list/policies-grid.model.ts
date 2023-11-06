import { GridCellProps } from "@progress/kendo-react-grid";
import { PoliciesCustomCells } from "./policies-grid-columns";

export const PoliciesGridModel = [
  {
    field: 'name',
    title: 'Name',
    customCell: 'PolicyNameColumn',
  },
  {
    field: 'status',
    title: 'Status',
    customCell: 'PolicyStatusColumn',
  },
  {
    field: 'policyType',
    title: 'Type',
  },
  {
    field: 'scope',
    title: 'Scope',
  },
  {
    field: 'rules',
    title: 'Rules',
    customCell: 'PolicyRulesColumn',
  },
  {
    field: 'matchingProducts',
    title: 'Matching Products',
    width: '200px'
  },
];

export const ManagePoliciesData = [
  {
    name: 'Log4j',
    status: 'active',
    type: 'Architectural',
    scope: 'Organization',
    rules: 0,
    matching_products: 6,
  },
  {
    name: 'Angular JS Sunset',
    status: 'active',
    type: 'Security',
    scope: 'Organization',
    rules: 2,
    matching_products: 21,
  },
  {
    name: 'Use of Xcode',
    status: 'inactive',
    type: 'Architectural',
    scope: 'Organization',
    rules: 0,
    matching_products: 21,
  },{
    name: 'Log4j',
    status: 'active',
    type: 'Architectural',
    scope: 'Organization',
    rules: 0,
    matching_products: 6,
  },
  {
    name: 'Angular JS Sunset',
    status: 'active',
    type: 'Security',
    scope: 'Organization',
    rules: 2,
    matching_products: 21,
  },
  {
    name: 'Use of Xcode',
    status: 'inactive',
    type: 'Architectural',
    scope: 'Organization',
    rules: 0,
    matching_products: 21,
  },{
    name: 'Log4j',
    status: 'active',
    type: 'Architectural',
    scope: 'Organization',
    rules: 0,
    matching_products: 6,
  },
  {
    name: 'Angular JS Sunset',
    status: 'active',
    type: 'Security',
    scope: 'Organization',
    rules: 2,
    matching_products: 21,
  },
  {
    name: 'Use of Xcode',
    status: 'inactive',
    type: 'Architectural',
    scope: 'Organization',
    rules: 0,
    matching_products: 21,
  },
];

export const columnsCustomCell = (props: GridCellProps, name: string) => {
  const { Element } = PoliciesCustomCells.filter((col) => col.name === name)[0];
  return Element(props);
};
