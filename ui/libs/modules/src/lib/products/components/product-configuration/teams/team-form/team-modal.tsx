import { ModalForm } from '@tauruseer/core';
import { ITeamMember } from '@tauruseer/module';
import { useState } from 'react';
import { AddExistingTeamUser } from './existing-user-account-form';
import { AddNewTeamMember } from './new-team-member-forms';
import { TeamMemberOption } from './team-options-forms';

interface IProps {
  onClose: React.EventHandler<any>;
  teamMembers: ITeamMember[];
}

const AddTeamMember = ({ onClose, teamMembers }: IProps) => {
  const [modalTitle, setModalTitle] = useState<string>('Add Team Member');
  const [modalTitleFontsize, setModalTitleFontsize] = useState<'xlg' | 'xl' | 'xxlg' | null>();
  const [modalIconTitle, setModalIconTitle] = useState<string>();
  const [activeTeamForm, setActiveTeamForm] = useState<string>();
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const mapTeamUserInfo = () => {
    return teamMembers.map((u) => {
      return {
        id: u.id,
        text: `${u.name} - ${u.primaryEmail}`,
        gravatarUrl: u.imgUrl,
      };
    });
  };

  const setSelected = (option: string) => {
    setActiveTeamForm(option);
    setModalTitleFontsize('xl');
    setModalTitle(option === 'New' ? 'New Team Member' : 'Map to Existing User(s)');
    setModalIconTitle(option === 'New' ? 'ts-brands ts-add-teammembers' : ' ts-brands ts-add-user');
    setShowOptions(false);
  };
  const backToOptions = () => {
    setModalTitle('Add Team Member');
    setModalTitleFontsize('xlg');
    setModalIconTitle('');
    setActiveTeamForm('');
    setShowOptions(true);
  };
  return (
    <ModalForm
      title={modalTitle}
      onClose={onClose}
      fontSize={modalTitleFontsize}
      icon={modalIconTitle}
    >
      {showOptions && (
        <div className="d-flex h-100">
          <div className="d-flex team-option-container">
            <TeamMemberOption type="New" onClick={setSelected} />
            <TeamMemberOption type="Existing" onClick={setSelected} />
          </div>
        </div>
      )}
      {!showOptions && (
        <div className="d-block" style={{ width: '535px', padding: '0px', overflow: 'hidden' }}>
          <span
            className="text-ml ff-ubuntu"
            style={{ color: '#7A6CD7', cursor: 'pointer', margin: '24px 0px' }}
            onClick={backToOptions}
          >
            <i className="fa-solid fa-chevron-left text-ml"></i> Back{' '}
          </span>
          {activeTeamForm === 'New' ? (
            <AddNewTeamMember onCancel={onClose} />
          ) : (
            <AddExistingTeamUser teamMembers={mapTeamUserInfo()} onCancel={onClose} />
          )}
        </div>
      )}
    </ModalForm>
  );
};

export default AddTeamMember;
