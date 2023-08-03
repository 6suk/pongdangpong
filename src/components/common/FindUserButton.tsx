import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { clearAll, clearType } from '@stores/findUsersSlice';
import { RootState } from '@stores/store';
import { NameButton, SC, SelectButton } from '@styles/styles';

import { MemberOrUserSearchModal } from './FindUserListModal';

interface MemberOrUserSearchButtonProps {
  initiateSearch?: () => boolean;
  error?: boolean;
  type: 'MEMBER' | 'USER';
}

const displayNames = { USER: '담당 강사', MEMBER: '회원' };

export const MemberOrUserSearchButton = ({ initiateSearch, error, type }: MemberOrUserSearchButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { id, name } = useSelector((state: RootState) => state.findUsers[type]);

  // 모달 오픈 전 실행해야하는 이벤트가 있다면
  const onClick = () => {
    let openState = true;
    if (initiateSearch !== undefined) openState = initiateSearch();
    setIsOpen(openState);
  };

  const handleDeleteClick = () => {
    // 강사 삭제 시 회원도 삭제 되어야함
    if (type === 'USER') dispatch(clearAll());
    else {
      dispatch(clearType(type));
    }
  };

  return (
    <>
      <SC.Label>
        {displayNames[type]} 선택 <span></span>
      </SC.Label>
      <div className="button-container">
        <SelectButton className={error ? 'error' : ''} disabled={false} name={type} onClick={onClick}>
          선택하기 +
        </SelectButton>
        {id && (
          <NameButton onClick={handleDeleteClick}>
            <span className="user-name">{name}</span>
            <span
              className="close-button"
              role="button"
              tabIndex={0}
              onClick={handleDeleteClick}
              onKeyDown={e => e.key === 'Enter'}
            >
              x
            </span>
          </NameButton>
        )}
      </div>

      {isOpen && <MemberOrUserSearchModal setIsOpen={setIsOpen} type={type} />}
    </>
  );
};
