import { GridCellProps } from '@progress/kendo-react-grid';
import { Chip, TChipModifier, CopyTextToClipboard } from '@tauruseer/core';
import { ReportStatus } from '@tauruseer/module';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { SBOMStore } from '../../../state/sbom-storage';

export const CustomHashColumn = (props: GridCellProps) => {
  const { hash } = props.dataItem;
  const textClass = hash ? '' : 'text-subtitle';

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span className={`text-center ff-montserrat font-regular text-md ${textClass}`}>
        {hash ? (
          <CopyTextToClipboard copyText={hash} alertMessage="Copied to clipboard">
            <span
              className="ff-montserrat text-md font-regular d-flex align-items-center"
              style={{ cursor: 'pointer', gap: '5px' }}
              onClick={() => {}}
            >
              <i className="fa-regular fa-copy me-1" style={{ color: '#4231B4' }}></i>
              {hash}
            </span>
          </CopyTextToClipboard>
        ) : (
          'Hash Value not available at this moment'
        )}
      </span>
    </td>
  );
};
export const CustomStatusColumn = (props: GridCellProps) => {
  const { status } = props.dataItem;
  const statusFilter = status === 'Created' ? 'Processing' : status;
  const valueInfo = ReportStatus.filter((s) => s.ref === statusFilter).pop();
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Chip
        copy={`${valueInfo?.text}`}
        type="badge"
        modifier={`${valueInfo?.type as TChipModifier}`}
        icon={`${valueInfo?.icon}`}
      />
    </td>
  );
};
export const CustomNameColumn = (props: GridCellProps) => {
  dayjs.extend(localizedFormat);
  const { created } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span
        className={`text-center ff-montserrat font-bold text-md`}
        style={{ textDecoration: 'underline' }}
      >
        {dayjs(created).format('lll')}
      </span>
    </td>
  );
};
export const CustomFormatColumn = (props: GridCellProps) => {
  const { format } = props.dataItem;
  const imgPath = format === 'CycloneDx' ? 'cyclonedx-logo.png' : 'SPDX-logo.png';
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <img src={`/${imgPath}`} alt={format} />
    </td>
  );
};
export const CustomActionColumn = (props: GridCellProps) => {
  const storage = SBOMStore((state) => state);
  const { status, id } = props.dataItem;

  const statusFilter = status === 'Created' ? 'Processing' : status;
  const icon =
    statusFilter !== 'Processing'
      ? 'fa-light fa-file-arrow-down'
      : 'fa-light fa-spinner-third fa-spin';

  const getReportUrl = () => {
    storage.setReportId(id);
    storage.setDownloadReport(true);
  };
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span
        className="text-xlg ms-3"
        style={{ cursor: 'pointer', color: '#4231B4' }}
        onClick={() => {}}
      >
        {status === 'Completed' ? (
          <span style={{ cursor: 'pointer' }} onClick={getReportUrl}>
            <i className={icon}></i>
          </span>
        ) : (
          <i className={icon} style={{ opacity: statusFilter === 'Error' ? '0.4' : '' }}></i>
        )}
      </span>
    </td>
  );
};
export const CustomCellCollection = [
  {
    name: 'CustomHashColumn',
    Element: CustomHashColumn,
  },
  {
    name: 'CustomStatusColumn',
    Element: CustomStatusColumn,
  },
  {
    name: 'CustomNameColumn',
    Element: CustomNameColumn,
  },
  {
    name: 'CustomFormatColumn',
    Element: CustomFormatColumn,
  },
  {
    name: 'CustomActionColumn',
    Element: CustomActionColumn,
  },
];
export const RepoHistoryColumnsGrid = [
  {
    title: 'Report',
    field: 'created',
    customCell: 'CustomNameColumn',
  },
  {
    title: 'Format',
    field: 'format',
    customCell: 'CustomFormatColumn',
    width: 170,
  },
  {
    title: 'Hash Value',
    field: 'hash',
    customCell: 'CustomHashColumn',
  },
  {
    title: 'Status',
    field: 'status',
    customCell: 'CustomStatusColumn',
  },
  {
    title: 'Download',
    field: '',
    customCell: 'CustomActionColumn',
    width: 190,
  },
];
