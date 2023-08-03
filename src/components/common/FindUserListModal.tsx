import { useDispatch } from 'react-redux';

import { MemberIcon } from '@assets/icons/indexIcons';
import { Modal } from '@components/common/Modal';
import { useSwrData } from '@hooks/apis/useSwrData';

import { setFindMember, setFindUser } from '@stores/findUsersSlice';

import { MemberSearchType, UserType, UsersSearchType } from '../../apis/schedulesAPIs';
import { ModalList } from '../schedules/backup/CreateSchedule';

export interface MemberOrUserSearchModalProps {
  type: 'USER' | 'MEMBER';
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const dataGetKey = {
  MEMBER: 'members',
  USER: 'users',
};

const userTypeEnum: { [key in UserType]: string } = {
  ADMIN: '관리자',
  STAFF: '직원',
};

export const MemberOrUserSearchModal = ({ type, setIsOpen }: MemberOrUserSearchModalProps) => {
  const { data, isLoading } = useSwrData(`search?resource=${type}`);
  const requestData = data?.[dataGetKey[type]];
  const dispatch = useDispatch();

  const setSelectedData = (id?: number, name?: string) => {
    switch (type) {
      case 'USER':
        dispatch(setFindUser({ id, name }));
        break;
      case 'MEMBER':
        dispatch(setFindMember({ id, name }));
        break;
    }

    setIsOpen(false);
  };

  function isUsersSearchType(obj: MemberSearchType | UsersSearchType): obj is UsersSearchType {
    return 'type' in obj;
  }

  return (
    <>
      {!isLoading && (
        <Modal maxWidth="43rem" setIsOpen={setIsOpen}>
          <div className="title-left">
            <h3>{type === 'USER' ? '강사' : '회원'} 선택</h3>
            <p>일정을 진행할 {type === 'USER' ? '강사' : '회원'}를 선택해 주세요.</p>
          </div>
          <ul>
            <ModalList>
              <button className="table-title" type="button">
                <div className="left">
                  <p>목록</p>
                  <p></p>
                  {type === 'USER' ? <p>이름/아이디</p> : <p>이름</p>}
                </div>
                <p>핸드폰 번호</p>
              </button>
            </ModalList>
            {requestData.map((v: MemberSearchType | UsersSearchType) => {
              const userType = isUsersSearchType(v) ? userTypeEnum[v.type] : '회원';

              return (
                <ModalList key={v.id}>
                  <button type="button" onClick={() => setSelectedData(v.id, v.name)}>
                    <div className="left">
                      <MemberIcon />
                      <p className="tag">{userType}</p>
                      <p className="info">
                        {v.name}
                        {isUsersSearchType(v) ? <span> {v.loginId}</span> : ''}
                      </p>
                    </div>
                    <p>{v.phone}</p>
                  </button>
                </ModalList>
              );
            })}
          </ul>
        </Modal>
      )}
    </>
  );
};
