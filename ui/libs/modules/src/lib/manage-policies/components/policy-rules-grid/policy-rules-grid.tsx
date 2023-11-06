import { GridCellProps } from '@progress/kendo-react-grid';
import {
  DEVICES,
  DataGrid,
  DataGridColumn,
  ProductEnumsReference,
  getActualDeviceRes,
} from '@tauruseer/core';
import { useEffect, useState } from 'react';
import { ManagePolicyRulesGridModel } from '../../model/manage-policies-rules';
import { getEnumListValueById } from '../policy-configuration/policy-rules/policy-rule-form/policy-rule-form.model';
interface IPolicyRulesGridProps {
  rules: [];
}
export function PolicyRulesGrid({ rules }: IPolicyRulesGridProps) {
  const device = getActualDeviceRes();
  const [gridHeight, setGridHeight] = useState<string>('');
  useEffect(() => {
    if (device === DEVICES.LAPTOP) {
      setGridHeight(rules.length ? '64vh' : '46.5vh');
    }
    if (device === DEVICES.FULL_HD) {
      setGridHeight(rules.length ? '45vh' : '36vh');
    }
    if (device === DEVICES.TWO_K || device === DEVICES.FOUR_K) {
      setGridHeight(rules.length ? '35vh' : '29vh');
    }
  }, [device]);

  //TODO:remove this after the demo
  const ToolTypeCellComponent = (props: GridCellProps) => {
    return (
      <td
        colSpan={props.colSpan}
        role={'gridcell'}
        key={props.id}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
      >
        <span className="ff-montserrat test-md"> Technology</span>
      </td>
    );
  };
  //TODO:remove this after the demo
  const RuleResultCellComponent = (props: GridCellProps) => {
    const { dataItem } = props;
    const results = getEnumListValueById(
      ProductEnumsReference.RuleResult,
      dataItem.ruleResult?.toString(),
    );
    return (
      <td
        colSpan={props.colSpan}
        role={'gridcell'}
        key={props.id}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
      >
        <span className="ff-montserrat test-md"> {results?.title || ''}</span>
      </td>
    );
  };
  const CustomCellCollection = [
    {
      name: 'ToolTypeCellComponent',
      Element: ToolTypeCellComponent,
    },
    {
      name: 'RuleResultCellComponent',
      Element: RuleResultCellComponent,
    },
  ];
  return (
    <div className="policy-rules-grid">
      <DataGrid
        title="Rules"
        data={rules}
        columnModel={ManagePolicyRulesGridModel as Record<DataGridColumn, any>[]}
        countStrings={{ singular: 'rule', plural: 'rules' }}
        customCellComponents={CustomCellCollection}
        minHeight={gridHeight}
        filter
        filterPlaceholder="Filter Rules"
        count
        sortable={true}
      />
    </div>
  );
}
