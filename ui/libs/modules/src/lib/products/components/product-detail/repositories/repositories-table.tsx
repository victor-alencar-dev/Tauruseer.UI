import { CustomLink, FaIcon } from '@tauruseer/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export interface IRepositoriesTableProps {
  repositories: any;
}
interface IRepositoriesTableRowProps {
  repositories: any;
}

enum EScanStatuses {
  Unavailable = 0,
  NotScanned = 1,
  InProgress = 2,
  Success = 3,
  Failed = 4,
}

const RepositoriesTableRow = ({ repositories }: IRepositoriesTableRowProps) => {
  const getStatus = (scanStatus: number) => {
    switch (scanStatus) {
      case EScanStatuses.NotScanned:
        return { icon: 'clock', color: '#acacac' };
      case EScanStatuses.InProgress:
        return { icon: 'loader', color: '#437bd2' };
      case EScanStatuses.Success:
        return { icon: 'circle-check', color: '#378632' };
      case EScanStatuses.Failed:
        return { icon: 'circle-xmark', color: '#DC2626' };
      default:
        return { icon: 'clock', color: '#acacac' };
    }
  };

  dayjs.extend(utc);

  return (
    <tbody>
      {repositories.map((repo: any, i: any) => (
        <tr key={i}>
          <td>
            <CustomLink to={`/asset-discovery/detail/${repo.sourceRepoId}`}>
              <div className="repositories-table__column--highlight">{repo.name}</div>
            </CustomLink>
          </td>
          <td>{repo.scanStatus >= 1 ? dayjs.utc(repo.lastScanDate).fromNow() : ''}</td>
          <td>
            <div
              className="repositories-table__column--icon"
              style={{ color: getStatus(repo.scanStatus).color }}
            >
              {<FaIcon icon={getStatus(repo.scanStatus).icon} size={23} />}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const RepositoriesTable = ({ repositories }: IRepositoriesTableProps) => {
  const hasData = repositories?.length > 0;

  return (
    <div className="repositories-table__wrapper">
      <table className="repositories-table">
        <thead className="repositories-table__head">
          <tr>
            <th>
              <span>Repo Name</span>
            </th>
            <th>
              <span>Last Scan</span>
            </th>
            <th>
              <span>Status</span>
            </th>
          </tr>
        </thead>

        {hasData ? (
          <RepositoriesTableRow repositories={repositories} />
        ) : (
          <tbody>
            <tr>
              <td colSpan={3}>
                <div className="repositories-table__column--empty-state">
                  <span className="k-icon k-i-grid-layout mb-4" style={{ color: '#4231B4' }}></span>
                  <div style={{ width: '220px' }}>
                    There are no repositories mapped at the moment
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default RepositoriesTable;
