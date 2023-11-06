import { Button } from '@progress/kendo-react-buttons';

interface IOptionsTeams {
  onClick: React.EventHandler<any>;
  type: 'New' | 'Existing';
}
export const TeamMemberOption = ({ onClick, type }: IOptionsTeams) => {
  const icon = type === 'New' ? 'ts-add-teammembers' : ' ts-add-user';
  const titleLine1 = type === 'New' ? 'New Team Member' : 'Existing User';
  const btnText = type === 'New' ? 'Create new team member' : 'Map existing user';
  return (
    <div className="d-flex flex-column justify-content-center align-items-center team-option-form">
      <span style={{ fontSize: '32px', color: '#4231B4' }}>
        <i className={`ts-brands ${icon}`}></i>
      </span>
      <span className="ff-ubuntu text-lg font-bold" style={{ marginBottom: '16px' }}>
        {titleLine1}
      </span>
      <Button
        size="large"
        themeColor={'dark'}
        fillMode="solid"
        rounded="medium"
        className="button button-primary"
        style={{ padding: '16px', width: '196px', fontSize: '13px' }}
        onClick={() => onClick(type)}
      >
        {btnText}
      </Button>
    </div>
  );
};
