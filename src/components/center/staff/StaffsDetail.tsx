import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { StaffsDetailResponse } from '@apis/types/staffsTypes';
import { MemberIcon, UserIcon } from '@assets/icons/indexIcons';
import { StaffsConfirmModal, StaffsResignModal } from '@components/center/staff/StaffResignModal';
import { StaffsEditModal } from '@components/center/staff/StaffsEditModal';
import { StaffRoleConfirmModal, StaffsRoleModal } from '@components/center/staff/StaffsRoleModal';
import { useSwrData } from '@hooks/apis/useSwrData';
import { DetailButton } from '@styles/common/buttonStyle';
import { DetailWrap } from '@styles/common/wrapStyle';
import { StaffInfoBar, StaffListWrap } from '@styles/pages/staffDetailStyle';

export const StaffsDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useSwrData<StaffsDetailResponse>(`staffs/${id}`);
  const { name, roles, phone, loginId, active, createdAt, members, updatedAt, memo } = data ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const [isResignModalOpen, setIsResignModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(active || false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    !isLoading && (
      <>
        <DetailWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>직원 정보</h3>
                <p className="createdAt">{createdAt?.split('T')[0].replace(/-/g, '.')} 등록</p>
              </div>
              <div className="btns">
                <button
                  type="button"
                  onClick={() => {
                    setIsRoleModalOpen(true);
                  }}
                >
                  역할 설정
                </button>
                <button type="button">비밀번호 초기화</button>
                <button
                  type="button"
                  onClick={() => {
                    setIsResignModalOpen(true);
                  }}
                >
                  직원 퇴사 처리
                </button>
              </div>
            </div>
            <StaffInfoBar>
              <div className="infos">
                <div className="name-and-role">
                  <p className="icon-box">
                    <MemberIcon /> {name}
                  </p>
                  <p className="role-box">
                    {roles?.map((v: { id: number; name: string }) => {
                      return (
                        <span key={v.id} className="tag">
                          {v.name}
                        </span>
                      );
                    })}
                  </p>
                </div>
                <p>{phone}</p>
                <p>{loginId}</p>
                <p className={active ? '' : 'inactive'}>{active ? '재직중' : '퇴사'}</p>
              </div>
              <DetailButton
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                편집
              </DetailButton>
            </StaffInfoBar>
          </div>
          <div>
            <div className="header">
              <div className="title">
                <h3>개인 수업 회원</h3>
                <h3 className="number">{members?.length}</h3>
              </div>
            </div>
            <StaffListWrap>
              <div className="table">
                <div className="table-row title">
                  <p>회원명</p>
                  <p>성별</p>
                  <p></p>
                  <p>최근 방문일</p>
                </div>
                {members && members.length > 0 ? (
                  members.map((v: { id: number; name: string; phone: string; sex: string; visitedAt: string }) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                      <div key={v.id} className="table-row" onClick={() => navigate(`/members/${v.id}`)}>
                        <p className="icon-box">
                          <MemberIcon /> {v.name}
                        </p>
                        <p>{v.sex === 'MALE' ? '남' : '여'}</p>
                        <p></p>
                        <p>{v.visitedAt.split('T')[0]}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty">
                    <UserIcon />
                    <p>배정된 회원이 없습니다.</p>
                  </div>
                )}
              </div>
            </StaffListWrap>
          </div>
          {/* <div>
            <div className="header">
              <div className="title">
                <h3>만족도 및 후기</h3>
                <h3 className="number">{prescriptionReviews.length}</h3>
                <p className="createdAt">(최근 일주일간의 후기만 하단에 노출됩니다.)</p>
              </div>
            </div>
            <ListWrap>
              <div className="table">
                <div className="table-row-two title">
                  <p>회원명</p>
                  <p>연락처</p>
                  <p>만족도</p>
                  <p></p>
                  <p>최근 작성일</p>
                </div>
                {prescriptionReviews.map(
                  (v: { id: number; name: string; phone: string; sex: string; visitedAt: string }) => {
                    return (
                      <div key={v.id} className="table-row">
                        <p className="icon-box">
                          <MemberIcon /> {v.name}
                        </p>
                        <p>{v.sex === 'MALE' ? '남' : '여'}</p>
                        <p></p>
                        <p>{v.visitedAt.split('T')[0]}</p>
                      </div>
                    );
                  }
                )}
              </div>
            </ListWrap>
          </div> */}

          <div>
            <div className="header">
              <div className="title">
                <h3>메모</h3>
                <p className="createdAt">{updatedAt?.split('T')[0].replace(/-/g, '.')} 업데이트</p>
              </div>
            </div>
            <div className="memo">{memo}</div>
          </div>
        </DetailWrap>
        {/* 직원 수정 모달 */}
        {isOpen && id && <StaffsEditModal id={id} setIsOpen={setIsOpen} />}

        {/* 직원 퇴사 처리 모달 - 안내 */}
        {isResignModalOpen && id && name && (
          <StaffsResignModal
            id={id}
            name={name}
            setActive={setIsActive}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
            setIsOpen={setIsResignModalOpen}
          />
        )}
        {/* 직원 퇴사 처리 모달 - 완료 */}
        {isConfirmModalOpen && name && <StaffsConfirmModal name={name} setIsConfirmModalOpen={setIsConfirmModalOpen} />}

        {/* 역할 설정 모달 - 역할 선택 */}
        {isRoleModalOpen && id && (
          <StaffsRoleModal id={id} setIsOpen={setIsRoleModalOpen} setIsSaveModalOpen={setIsSaveModalOpen} />
        )}
        {/* 역할 설정 모달 - 완료 */}
        {isSaveModalOpen && <StaffRoleConfirmModal setIsSaveModalOpen={setIsSaveModalOpen} />}
      </>
    )
  );
};
