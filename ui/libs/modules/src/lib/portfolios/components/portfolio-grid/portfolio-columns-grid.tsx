import { Button } from '@progress/kendo-react-buttons';
import { GridCellProps } from '@progress/kendo-react-grid';
import { Avatar } from '@progress/kendo-react-layout';
import { Link } from '@remix-run/react';
import { PORTFOLIO_ACTIONS } from '@tauruseer/module';
import { PortfolioStore } from '../../state/portfolio-storage';

export const PortfolioNameColumn = (props: GridCellProps) => {
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span className="font-underline font-bold">
        <Link to={`/portfolios/${props.dataItem.portfolioId}/detail`}>
          {props.dataItem[`${props.field}`]}
        </Link>
      </span>
    </td>
  );
};

export const PortfolioOwnerColumn = (props: GridCellProps) => {
  const avatar = props.dataItem.portfolioOwnerGravatarUrl;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {' '}
      <div className="d-flex align-items-center p-1">
        <span className="d-flex  ms-2 align-items-center">
          <Avatar type={avatar ? 'image' : 'icon'} size="medium">
            {avatar ? (
              <img src={avatar} alt="team-member-avatar" />
            ) : (
              <span className="k-icon k-i-user" />
            )}
          </Avatar>
        </span>
        <div className="ms-2">
          <div className="ff-montserrat">{props.dataItem.portfolioOwnerName}</div>
          <div className="ff-montserrat font-light text-muted">
            {props.dataItem.portfolioOwnerEmail}
          </div>
        </div>
      </div>
    </td>
  );
};

export const PortfolioOptionsColumn = (props: GridCellProps) => {
  const store = PortfolioStore((state) => state);
  const setPortfolio = (action: string) => {
    store.setPortfolioId(props.dataItem);
    if (action === PORTFOLIO_ACTIONS.EDIT_PORTFOLIO) store.setPortfolioFormOpen(true);
    if (action === PORTFOLIO_ACTIONS.DELETE_PORTFOLIO) store.setDeletePortfolioOpen(true);
    if (action === PORTFOLIO_ACTIONS.ARCHIVE_PORTFOLIO) store.setArchivePortfolioOpen(true);
  };
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
      style={{ color: '#4231B4' }}
    >
      <Button fillMode="flat" onClick={() => setPortfolio(PORTFOLIO_ACTIONS.EDIT_PORTFOLIO)}>
        <i className="fa-solid fa-pencil"></i>
      </Button>
      <Button fillMode="flat" onClick={() => setPortfolio(PORTFOLIO_ACTIONS.DELETE_PORTFOLIO)}>
        <i className="fa-regular fa-trash-can"></i>
      </Button>
      {!props.dataItem.isArchived && (
        <Button fillMode="flat" onClick={() => setPortfolio(PORTFOLIO_ACTIONS.ARCHIVE_PORTFOLIO)}>
          <i className="fa-regular fa-folder"></i>
        </Button>
      )}
    </td>
  );
};

export const CustomCellCollection = [
  {
    name: 'PortfolioNameColumn',
    Element: PortfolioNameColumn,
  },
  {
    name: 'PortfolioOwnerColumn',
    Element: PortfolioOwnerColumn,
  },
  {
    name: 'PortfolioOptionsColumn',
    Element: PortfolioOptionsColumn,
  },
];
