import { useSelector } from 'react-redux';

import { RootState } from '@stores/store';
import { NameButton } from '@styles/common/FormStyle';
import { SC } from '@styles/common/inputsStyles';

interface DisabledFindUserButtonProps {
  type: 'MEMBER' | 'USER';
}

export const displayNames = { USER: '담당 강사', MEMBER: '참여 회원' };

export const DisabledFindUserButton = ({ type }: DisabledFindUserButtonProps) => {
  const name = useSelector((state: RootState) => state.findUsers[type].name);

  return (
    <>
      <SC.Label>{displayNames[type]}</SC.Label>
      <div className="button-container">
        <NameButton disabled>
          <span className="user-name">{name}</span>
        </NameButton>
      </div>
    </>
  );
};
