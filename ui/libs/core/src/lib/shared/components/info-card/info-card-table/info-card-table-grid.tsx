import { GridCellProps } from '@progress/kendo-react-grid';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Chip, CopyTextToClipboard, CustomLink, FaIcon } from '@tauruseer/core';

export const GeneralCell = (props: GridCellProps) => {
  const { dataItem, field } = props;
  const value = field ? dataItem[field] : '-';
  const titleType = value.referenceLink ? 'link' : value.copyToClipboard ? 'copy' : 'text';

  const getTitle = () => {
    switch (titleType) {
      case 'link':
        return (
          <CustomLink
            to={value.referenceLink}
            className="typography-body1 text-primary-main text-md font-regular mb-2"
            style={{ textDecoration: 'underline' }}
            showExternalIcon
          >
            {value.title}
          </CustomLink>
        );
      case 'text':
        return <div className="typography-body1 text-md font-regular mb-1">{value.title}</div>;
      case 'copy':
        return (
          <CopyTextToClipboard
            copyText={value.copyToClipboard}
            alertMessage={'Copied to clipboard'}
          >
            <div className="typography-body1 text-md font-regular mb-1">
              {value.title}
              <FaIcon icon="copy" classes="ms-2" style={{ color: '#4231B4' }} />
            </div>
          </CopyTextToClipboard>
        );
    }
  };

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
      style={{ padding: '1rem' }}
    >
      {value.title && getTitle()}
      {value.description && (
        <div className="typography-body1 text-md font-light text-muted">{value.description}</div>
      )}
      {value.badge && (
        <Chip copy={value.badge.copy} type={value.badge.type} modifier={value.badge.modifier} />
      )}
      {value.buttons && (
        <div className="d-flex gap-3">
          {value.buttons.map(
            (
              btn: {
                icon: string;
                color: string;
                tooltip: string;
                callback?: () => void;
                referenceLink?: string;
                disabled?: boolean;
              },
              i: number,
            ) =>
              btn.callback ? (
                <button
                  key={i}
                  onClick={btn.callback}
                  type="button"
                  disabled={btn.disabled}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0',
                    margin: '0',
                  }}
                >
                  <Tooltip position="top" anchorElement="target">
                    <FaIcon
                      title={btn.tooltip}
                      icon={btn.icon}
                      style={{ color: btn.color }}
                      size={17}
                    />
                  </Tooltip>
                </button>
              ) : btn.referenceLink ? (
                <CustomLink key={i} to={btn.referenceLink}>
                  <Tooltip position="top" anchorElement="target">
                    <FaIcon
                      title={btn.tooltip}
                      icon={btn.icon}
                      style={{ color: btn.color }}
                      size={17}
                    />
                  </Tooltip>
                </CustomLink>
              ) : (
                <Tooltip position="top" anchorElement="target">
                  <FaIcon
                    title={btn.tooltip}
                    icon={btn.icon}
                    style={{ color: btn.color }}
                    size={17}
                  />
                </Tooltip>
              ),
          )}
        </div>
      )}
    </td>
  );
};

export const CustomCellCollection = [
  {
    name: 'GeneralCell',
    Element: GeneralCell,
  },
];

export const columnsWidth = {
  sm: { laptop: 70, fullHD: 70, '2k': 70 },
  md: { laptop: 50, fullHD: 50, '2k': 50 },
  lg: { laptop: 300, fullHD: 400, '2k': 600 },
};
