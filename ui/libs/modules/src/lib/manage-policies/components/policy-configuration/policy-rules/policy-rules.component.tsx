import { Button } from '@progress/kendo-react-buttons';
import { GridCellProps } from '@progress/kendo-react-grid';
import { DataGrid, DataGridColumn, ProductEnumsReference } from '@tauruseer/core';
import { IPolicyRules } from '@tauruseer/module';
import { useState } from 'react';
import { ManagePolicyRulesGridModel } from '../../../model/manage-policies-rules';
import { getEnumListValueById } from './policy-rule-form/policy-rule-form.model';
import { RuleDeleteForm } from './policy-rule-form/rule-delete-form';
import { RuleForm } from './policy-rule-form/rule-form';

interface IPolicyRulesProps {
  rules: IPolicyRules;
  ui: string;
  techList: any;
}
export const PolicyRules = ({ rules, ui, techList }: IPolicyRulesProps) => {
  const [isRuleFormVisible, setIsRuleFormVisible] = useState(false);
  const [isDeleteRuleFormVisible, setIsDeleteRuleFormVisible] = useState(false);
  const [currentRuleId, setCurrentRuleId] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedRule, setSelectedRule] = useState<IPolicyRules>({} as IPolicyRules);

  const handleEditRule = (props: any) => {
    setIsEditing(true);
    setIsRuleFormVisible(true);
    setSelectedRule(props.dataItem);
  };
  const handleDeleteRule = (props: any) => {
    const {
      dataItem: { id },
    } = props;
    setCurrentRuleId(id);
    setIsDeleteRuleFormVisible(true);
  };
  const handleCreateRule = () => {
    setIsEditing(false);
    setIsRuleFormVisible(true);
    setSelectedRule({});
  };
  const ActionCell = (props: GridCellProps) => {
    return (
      <td
        colSpan={props.colSpan}
        role={'gridcell'}
        key={props.id}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
      >
        <Button fillMode="flat" onClick={() => handleEditRule(props)}>
          <i className="fa-solid fa-pencil"></i>
        </Button>
        <Button fillMode="flat" onClick={() => handleDeleteRule(props)}>
          <i className="fa-solid fa-trash-can"></i>
        </Button>
      </td>
    );
  };
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
    {
      name: 'ActionCell',
      Element: ActionCell,
    },
  ];
  const rulesModel = [
    ...ManagePolicyRulesGridModel,
    { name: 'CustomAction', title: 'Actions', customCell: 'ActionCell' },
  ];
  return (
    <>
      <DataGrid
        title="Edit Rules"
        count
        data={rules as IPolicyRules[]}
        minHeight="50vh"
        button
        btnText="Add New Rules"
        BtnOnClick={handleCreateRule}
        columnModel={rulesModel as Record<DataGridColumn, any>[]}
        customCellComponents={CustomCellCollection}
        sortable={true}
      />
      {isRuleFormVisible && (
        <RuleForm
          onClose={() => setIsRuleFormVisible(false)}
          rule={selectedRule}
          techList={techList}
          isEditing={isEditing}
          id={ui}
        />
      )}
      {isDeleteRuleFormVisible && (
        <RuleDeleteForm
          onClose={() => setIsDeleteRuleFormVisible(false)}
          policyId={ui}
          ruleId={currentRuleId}
        />
      )}
    </>
  );
};

export default PolicyRules;
