import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Profile from '@/assets/icons/common/Profile.svg';
import { MemberIcon, UserIcon } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { Modal } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';
import { FormButtonGroup, FormGridContainer, LabelNotice } from '@styles/common/FormStyle';
import { SC } from '@styles/common/inputsStyles';
import { FormContentWrap, TopTitleWrap } from '@styles/common/wrapStyle';
import { ModalList } from '@styles/modal/modalStyle';
import theme from '@styles/theme';

type FormInputs = {
  userId: number;
  issuedTicketId: number;
  memberId: number;
  memo: string;
  date: string;
  startTime: string;
  endTime: string;
  startAt: string;
  endAt: string;
};

export const initialInputs: FormInputs = {
  userId: 0,
  issuedTicketId: 0,
  memberId: 0,
  memo: '',
  date: '',
  startTime: '',
  endTime: '',
  startAt: '',
  endAt: '',
};

interface UserData {
  id: number;
  type: string;
  loginId: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginedAt: string;
}

interface MemberData {
  id: number;
  name: string;
  phone: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

type AvailableTicket = {
  id: number;
  title: string;
  lessonType: string;
  privateTutorId: number;
  remainingCount: number;
  availableReservationCount: number;
  lessonDuration: number;
  owners: Array<{
    id: number;
    name: string;
    phone: string;
  }>;
};

export const CreateSchedule = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>(initialInputs);

  const { data: userData, isLoading: userLoading, isError: userError } = useSwrData('search?resource=USER');
  const { data: memberData, isLoading: memberLoading, isError: memberError } = useSwrData('search?resource=MEMBER');

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    isError: ticketsError,
  } = useSwrData(`members/${selectedMemberId}/bookable-tickets`);

  const navigate = useNavigate();
  const { request } = useRequests();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [selectedMemberName, setSelectedMemberName] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'USER' | 'MEMBER' | null>(null);
  const [availableTickets, setAvailableTickets] = useState<AvailableTicket[] | null>(null);
  const [selectedOwnerId, setSelectedOwnerId] = useState<number | null>(null);
  const [selectedOwnerName, setSelectedOwnerName] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<AvailableTicket | null>(null);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    switch (target.name) {
      case 'clientPhone':
        target.value = target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        break;
    }
    setFormInputs({ ...formInputs, [target.name]: target.value });
  };

  const handleSearchClick = (type: 'USER' | 'MEMBER') => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type === 'MEMBER' && !selectedUserName) {
      alert('담당 강사를 먼저 선택해주세요.');
      return;
    }
    setModalType(type);
    setIsOpen(true);
  };

  const handleUserSelect = (userId: number, userName: string) => {
    setFormInputs({ ...formInputs, userId });
    setSelectedUserName(userName);
    setIsOpen(false);
  };

  const handleMemberSelect = (memberId: number, memberName: string) => {
    setFormInputs({ ...formInputs, memberId });
    setSelectedMemberName(memberName);
    setSelectedMemberId(memberId);
    setIsOpen(false);
  };

  const handleOwnerSelect = (id: number, name: string) => {
    // 여기에 원하는 동작 구현
    setSelectedOwnerId(id);
    setSelectedOwnerName(name);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const date = formInputs['date'].replace(/\./g, '-');
    const startTime = formInputs['startTime'];
    const endTime = formInputs['endTime'];

    const startAt = new Date(`${date}T${startTime}:00`).toISOString();
    const endAt = new Date(`${date}T${endTime}:00`).toISOString();

    const payload = {
      userId: formInputs.userId,
      issuedTicketId: formInputs.issuedTicketId,
      startAt,
      endAt,
    };

    try {
      await request({
        url: 'schedules/private-lesson',
        method: 'post',
        body: payload,
      });
      console.log('등록 완료');
      navigate('/schedule');
      setFormInputs(initialInputs);
    } catch (error) {
      console.error(error);
    }
  };

  const isValid = () => {
    const { userId, memberId, issuedTicketId, date, startTime, endTime } = formInputs;
    return userId && memberId && issuedTicketId && date && startTime && endTime;
  };

  useEffect(() => {
    console.log(formInputs);
  }, [formInputs]);

  useEffect(() => {
    if (ticketsData) {
      setAvailableTickets(ticketsData.availableTickets);
    }
  }, [ticketsData]);
  useEffect(() => {
    if (!selectedMemberName) {
      clearMemberSelection();
    }
  }, [selectedMemberName]);
  const clearSelection = () => {
    setSelectedUserName(null);
    setSelectedMemberName(null);
    setSelectedTicket(null);
  };

  const clearMemberSelection = () => {
    setSelectedMemberName(null);
    setSelectedTicket(null);
    // 참여회원 등 다른 관련 상태값도 초기화
  };

  return (
    <FormContentWrap>
      <TopTitleWrap>
        <h3>개인 수업 일정 생성</h3>
        <p>개인 수업 일정을 생성합니다.</p>
      </TopTitleWrap>
      <FormGridContainer>
        <div>
          <SC.Label>
            담당 강사 선택 <span></span>
          </SC.Label>
          <div className="button-container">
            <SelectButton disabled={!!selectedUserName} onClick={handleSearchClick('USER')}>
              선택하기 +
            </SelectButton>
            {selectedUserName && (
              <NameButton onClick={() => setSelectedUserName('')}>
                <span className="user-name">{selectedUserName}</span>
                <span
                  className="close-button"
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && clearSelection()}
                  onClick={e => {
                    clearSelection();
                    e.stopPropagation();
                  }}
                >
                  x
                </span>
              </NameButton>
            )}
          </div>
        </div>
        <div>
          <SC.Label>
            회원 선택 <span></span>
          </SC.Label>
          <div className="button-container">
            <SelectButton disabled={!!selectedMemberName} onClick={handleSearchClick('MEMBER')}>
              선택하기 +
            </SelectButton>
            {selectedMemberName && (
              <NameButton onClick={() => setSelectedMemberName('')}>
                <span className="user-name">{selectedMemberName}</span>
                <span
                  className="close-button"
                  role="button"
                  tabIndex={0}
                  onClick={() => clearMemberSelection()}
                  onKeyDown={e => e.key === 'Enter' && setSelectedMemberName(null)}
                >
                  x
                </span>
              </NameButton>
            )}
          </div>
        </div>
        {isOpen && (
          <Modal maxWidth="43rem" setIsOpen={setIsOpen}>
            {modalType === 'USER' ? (
              userLoading ? (
                <div>데이터를 불러오는 중...</div>
              ) : userError ? (
                <div>오류가 발생했습니다.</div>
              ) : (
                <ul>
                  <ModalList>
                    <button className="table-title" type="button">
                      <p className="left">
                        <p>목록</p>
                        <p></p>
                        <p>이름/아이디</p>
                      </p>
                      <p>핸드폰 번호</p>
                    </button>
                  </ModalList>
                  {userData?.users.map((user: UserData, index: number) => (
                    <ModalList key={index}>
                      <button type="button" onClick={() => handleUserSelect(user.id, user.name)}>
                        <p className="left">
                          <MemberIcon />
                          <p className="tag">{user.type === 'ADMIN' ? '관리자' : '직원'}</p>
                          <p className="info">
                            {user.name} <span>{user.loginId}</span>
                          </p>
                        </p>
                        <p>{user.phone}</p>
                      </button>
                    </ModalList>
                  ))}
                </ul>
              )
            ) : memberLoading ? (
              <div>데이터를 불러오는 중...</div>
            ) : memberError ? (
              <div>오류가 발생했습니다.</div>
            ) : (
              <ul>
                <ModalList>
                  <button className="table-title" type="button">
                    <p className="left">
                      <p>목록</p>
                      <p></p>
                      <p>이름/아이디</p>
                    </p>
                    <p>핸드폰 번호</p>
                  </button>
                </ModalList>
                {memberData?.members.map((member: MemberData, index: number) => (
                  <ModalList key={index}>
                    <button type="button" onClick={() => handleMemberSelect(member.id, member.name)}>
                      <p className="left">
                        <MemberIcon />
                        <p className="tag">회원</p>
                        <p className="info">{member.name}</p>
                      </p>
                      <p>{member.phone}</p>
                    </button>
                  </ModalList>
                ))}
              </ul>
            )}
          </Modal>
        )}
        <div>
          <SC.Label>
            수강권 선택 <span></span>
          </SC.Label>
          <SC.Select
            disabled={!selectedMemberName}
            name="lessonTicket"
            value={selectedTicket ? selectedTicket.id : ''}
            onChange={e => {
              const selectedTicketId = Number(e.target.value);
              const foundTicket = availableTickets?.find(ticket => ticket.id === selectedTicketId);
              setSelectedTicket(foundTicket || null);
              setFormInputs({ ...formInputs, issuedTicketId: selectedTicketId });
            }}
          >
            <option className="option-title" defaultValue="">
              수강권을 선택해주세요.
            </option>
            {ticketsLoading ? (
              <option>데이터 불러오는 중...</option>
            ) : ticketsError ? (
              <option>데이터를 불러올 수 없습니다.</option>
            ) : (
              availableTickets
                ?.filter(ticket => ticket.privateTutorId === formInputs.userId)
                .map(ticket => (
                  <option key={ticket.id} value={ticket.id}>
                    {ticket.title} ({ticket.lessonDuration}분)
                  </option>
                ))
            )}
          </SC.Select>
        </div>
        <div>
          <SC.Label>
            참여회원 <LabelNotice>회원과 수강권 선택 시 자동으로 입력됩니다.</LabelNotice>
          </SC.Label>
          {selectedTicket &&
            selectedTicket.owners.map((owner, ownerIndex) => (
              <NameButton key={ownerIndex} className="info-btn" onClick={() => handleOwnerSelect(owner.id, owner.name)}>
                <span className="user-name">{owner.name}</span>
              </NameButton>
            ))}
        </div>

        <div>
          <SC.Label>
            일자 선택 <span></span>
          </SC.Label>
          <SC.InputField
            maxLength={10}
            name="date"
            type="date"
            onChange={e => {
              handleInputChange(e);
            }}
          />
        </div>
        <div>
          <SC.Label>
            시간 선택 <span></span>
          </SC.Label>
          <div className="time-inputs">
            <SC.InputField
              maxLength={5}
              name="startTime"
              type="time"
              onChange={e => {
                handleInputChange(e);
              }}
            />
            ~
            <SC.InputField
              maxLength={5}
              name="endTime"
              type="time"
              onChange={e => {
                handleInputChange(e);
              }}
            />
          </div>
        </div>
        <div>
          <SC.Label>일정 메모</SC.Label>
          <SC.InputField
            maxLength={500}
            name="memo"
            placeholder="내용을 입력해주세요. (500자 이내)"
            type="text"
            onChange={e => {
              handleInputChange(e);
            }}
          />
        </div>
      </FormGridContainer>
      <FormButtonGroup>
        <Button isPri={false} size="full" onClick={() => navigate(-1)}>
          돌아가기
        </Button>
        <Button
          disabled={!isValid()}
          size="full"
          type="submit"
          onClick={e => {
            handleSubmit(e);
          }}
        >
          완료
        </Button>
      </FormButtonGroup>
    </FormContentWrap>
  );
};

export const NameButton = styled.button`
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.White};
  border: 1px solid ${({ theme }) => theme.colors.gray[600]};
  border-radius: 8px;
  padding: 1px 2px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &.info-btn {
    cursor: default;
    padding-right: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray[600]};
  }

  .user-name {
    color: ${({ theme }) => theme.colors.gray[300]};
    display: flex;
    align-items: center;
  }

  .user-name::before {
    content: url(${Profile});
    margin-right: 8px;
    margin-top: 5px;
    margin-left: 8px;
  }

  .close-button {
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-left: 8px;
    margin-right: 8px;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 16px;
  }
`;
const SelectButton = styled.button`
  font-size: 14px;
  padding: 8px 16px;
  background-color: ${theme.colors.White};
  color: ${theme.colors.pri[500]};
  border: 1px solid ${theme.colors.pri[500]};
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.pri[900]};
    color: ${theme.colors.pri[400]};
  }

  &:disabled {
    background-color: ${theme.colors.gray[800]};
    cursor: not-allowed;
    color: ${theme.colors.gray[500]};
    border: 1px solid ${theme.colors.gray[500]};
  }
`;

const S = {
  Container: styled.div`
    grid-template-rows: repeat(4, minmax(100px, 1fr));
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    grid-auto-flow: column;
    row-gap: 0.5rem;
    column-gap: 3rem;

    h2 {
      text-align: center;
      font-weight: 600;
      font-size: ${({ theme: { font } }) => font['main']};
    }
    p {
      margin-bottom: 62px;
      text-align: center;
    }

    .info-text {
      text-align: left;
      color: ${theme.colors.gray[700]};
      font-size: 14px;
    }

    .first-column,
    .second-column {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5rem;
      height: 100%;
    }
  `,
  wrap: styled.div`
    display: flex;
    max-width: 1024px;
    width: 100%;
    margin-top: 1rem;
    padding-inline: 1rem;
    gap: 3rem;

    span {
      color: ${({ theme: { colors } }) => colors['Pri-400']};
    }

    .button-wrap {
      margin-bottom: 30px;

      button[type='button'] {
        width: 70px;
        height: 36px;
        border: 1px solid #cfcfcf;
        border-radius: 4px;
        margin-right: 6px;

        &.on {
          background-color: blue;
        }
      }
    }
  }

    .button-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .time-inputs {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .time-inputs > input {
      width: 45%
    }
    

  `,

  BtnWrap: styled.div`
    margin-top: 2rem;
    display: flex;
    gap: 3rem;
    padding-inline: 1rem;
  `,
};

export default CreateSchedule;
