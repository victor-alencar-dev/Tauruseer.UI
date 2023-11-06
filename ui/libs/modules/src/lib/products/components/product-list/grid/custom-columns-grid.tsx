import { GridCellProps } from '@progress/kendo-react-grid';
import { Link } from '@remix-run/react';
import { MapEnumToObject, ProductEnumsReference } from '@tauruseer/core';
import { CollapsibleCollection, TIME_IN_SECONDS } from '@tauruseer/module';

const configureProduct = (productId: string) => {
  return `/products/${productId}/configure-product/product-details`;
};
const getEnumListValueById = (RefProduct: ProductEnumsReference, id: string | undefined) => {
  return MapEnumToObject(RefProduct)
    .filter((f) => f.id === id?.toString())
    .pop();
};
const getGeneralColumnValue = (field: string, value: number | string) => {
  let businessValue;
  if (field === 'businessCriticality') {
    businessValue = getEnumListValueById(ProductEnumsReference.BusinessCriticalities, `${value}`);
  }
  if (field === 'outcomeCategory') {
    businessValue = getEnumListValueById(ProductEnumsReference.OutcomeCategoryTypes, `${value}`);
  }
  if (field === 'businessPurpose') {
    businessValue = getEnumListValueById(ProductEnumsReference.BusinessPurposes, `${value}`);
  }
  if (field === 'financialImpact') {
    businessValue = getEnumListValueById(ProductEnumsReference.FinancialImpacts, `${value}`);
  }
  return businessValue?.title;
};
export const CustomNameColumn = (props: GridCellProps) => {
  const fieldValue = props.dataItem[`${props.field}`];
  const { productId } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Link to={`/products/${productId}/detail`} prefetch="intent">
        {fieldValue}
      </Link>
    </td>
  );
};
export const CustomCounterColumn = (props: GridCellProps) => {
  const fieldValue = props.dataItem[`${props.field}`];
  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div>{fieldValue ? fieldValue : '-'}</div>
    </td>
  );
};
export const CustomControlMaturityColumn = (props: GridCellProps) => {
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div style={{ paddingLeft: '3rem' }}>
        <span className="me-2 text-success">
          <i className="fa-solid fa-circle-check"></i>
        </span>
      </div>
    </td>
  );
};
export const CustomRisksColumn = (props: GridCellProps) => {
  const { riskIQLevel } = props.dataItem;
  const risk_ok = { color: '#2bc977' };
  const risk_danger = { color: '#db4a4a' };
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span style={riskIQLevel ? risk_danger : risk_ok} className="text-center">
        {riskIQLevel ? riskIQLevel : '0'}
      </span>
    </td>
  );
};

// convert seconds to a format date
const getAvgTime = (seconds: number) => {
  let formatTime = null;
  if (seconds) {
    for (const d of TIME_IN_SECONDS) {
      const timeValue = Math.floor(seconds / d.value);
      if (timeValue > 0) {
        formatTime = `${timeValue} ${d.format}${timeValue > 1 ? 's' : ''}`;
        break;
      }
    }
  }
  return formatTime;
};
export const CustomAvgRemediationTimeColumn = (props: GridCellProps) => {
  const { averageRemediationTime } = props.dataItem;
  const avgTime = getAvgTime(averageRemediationTime);
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span>{avgTime ? avgTime : 'Not Available'}</span>
    </td>
  );
};

export const CustomInternetExposureColumn = (props: GridCellProps) => {
  const { internetExposure, productId } = props.dataItem;
  const isExpose = internetExposure ? 'Exposed' : 'Not Exposed';
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {internetExposure !== null ? (
        isExpose
      ) : (
        <Link to={configureProduct(productId)} prefetch="intent" style={{ color: '#49A2F4' }}>
          Configure
        </Link>
      )}
    </td>
  );
};

export const CustomRiskOwnerColumn = (props: GridCellProps) => {
  const { productOwnerName, productOwnerEmail, productId } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {productOwnerName !== null ? (
        <>
          <div className="creator-name">{productOwnerName}</div>
          <div className="creator-identity">{productOwnerEmail}</div>
        </>
      ) : (
        <Link to={configureProduct(productId)} prefetch="intent" style={{ color: '#49A2F4' }}>
          Configure
        </Link>
      )}
    </td>
  );
};

export const GeneralCustomCell = (props: GridCellProps) => {
  const fieldValue = props.dataItem[`${props.field}`];
  const { productId } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {fieldValue !== null ? (
        <span className="text-center">{getGeneralColumnValue(`${props.field}`, fieldValue)}</span>
      ) : (
        <Link to={configureProduct(productId)} prefetch="intent" style={{ color: '#49A2F4' }}>
          Configure
        </Link>
      )}
    </td>
  );
};

export const DataClassificationCustomCell = (props: GridCellProps) => {
  const { sensitiveDataClassifications, productId } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {sensitiveDataClassifications !== null ? (
        <CollapsibleCollection dataInfo={sensitiveDataClassifications} limit={2} />
      ) : (
        <Link to={configureProduct(productId)} prefetch="intent" style={{ color: '#49A2F4' }}>
          Configure
        </Link>
      )}
    </td>
  );
};
export const CustomCellCollection = [
  {
    name: 'CustomNameColumn',
    Element: CustomNameColumn,
  },
  {
    name: 'CustomControlMaturityColumn',
    Element: CustomControlMaturityColumn,
  },
  {
    name: 'CustomRisksColumn',
    Element: CustomRisksColumn,
  },
  {
    name: 'CustomAvgRemediationTimeColumn',
    Element: CustomAvgRemediationTimeColumn,
  },
  {
    name: 'CustomInternetExposureColumn',
    Element: CustomInternetExposureColumn,
  },
  {
    name: 'CustomRiskOwnerColumn',
    Element: CustomRiskOwnerColumn,
  },
  {
    name: 'GeneralCustomCell',
    Element: GeneralCustomCell,
  },
  {
    name: 'DataClassificationCustomCell',
    Element: DataClassificationCustomCell,
  },
  {
    name: 'CustomCounterColumn',
    Element: CustomCounterColumn,
  },
];
