import RepositoriesTable from './repositories-table';

interface IRepositoriesProps {
  repositories: any;
}

const RepositoriesCard = ({ repositories }: IRepositoriesProps) => {
  return (
    <>
      <div
        className="typography-h1 align-self-baseline pt-0 mt-0 "
        style={{ marginBottom: '24px' }}
      >
        Scan History
      </div>
      <div
        className="card"
        style={{
          height: '274px',
          padding: '12px',
          overflowX: 'hidden',
          margin: 0,
        }}
      >
        <RepositoriesTable repositories={repositories} />
      </div>
    </>
  );
};

export default RepositoriesCard;
