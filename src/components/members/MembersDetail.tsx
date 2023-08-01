import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { InputField } from '@components/center/ticket/Form/InputField';
import { TicketItem } from '@components/center/ticket/TicketItem';
import { Button } from '@components/common/Button';
import { Modal, ModalButton } from '@components/common/Modal';

import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';

import { TicketContainer, TicketWrap, Top } from '@styles/center/ticketsStyle';
import { SC } from '@styles/styles';
import theme from '@styles/theme';

interface UserListProps {
  [key: string]: string;
}

const MembersDetail = ({ id, tickets, staffsDatas }) => {
  // console.log(id);
  // console.log(staffsDatas);
  // console.log(tickets);

  const { data, isLoading } = useSwrData(`members/${id}`);
  const { data: memberTicketData, isLoading: memberTicketDataIsLoading } = useSwrData(`members/${id}/issued-tickets`);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [editTicketModalState, setEditTicketModalState] = useState(false);

  const { name, birthDate, phone, sex }: UserListProps = data ?? {};

  const { dataArr, dataStr, dataStrKor } = useMemo(() => {
    return {
      dataArr: [name, birthDate, phone, sex],
      dataStr: ['name', 'birthDate', 'phone', 'sex'],
      dataStrKor: ['이름', '생일', '전화번호', '성별'],
    };
  }, [data]);

  const [userData, setUserData] = useState({ ...data });

  const { request } = useRequests();
  const [ticketId, setTicketId] = useState(0);

  const submitRequest = useCallback(
    async ({ url, method, body }) => {
      try {
        await request({
          url: url,
          method: method,
          body: body,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [userData]
  );

  const dataChange = useCallback((type: string, value: string) => {
    switch (type) {
      case 'birthDate':
        value = value.replace(/-/gi, '.');
        break;
      case 'createdAt':
        value = value.split('T')[0].replace(/-/gi, '.');
        break;
      case 'sex':
        value = value === 'MALE' ? '남' : value === 'FEMALE' ? '여' : value;
        break;
      case 'phone':
        value = value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        break;
    }
    return value;
  }, []);

  const [editTicketData, setEditTicketData] = useState({});
  const [submitTicketData, setSubmitTicketData] = useState({
    endAt: '',
    tutorId: 0,
  });

  const setTicketData = i => () => {
    const targetTicket = memberTicketData?.issuedTickets[i];
    setTicketId(targetTicket.id);

    setEditTicketData(targetTicket);
    setEditTicketModalState(true);
  };

  useEffect(() => {}, [editTicketData, submitTicketData]);

  return !isLoading && id ? (
    <div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {
            <>
              <S.EditMemberInfo>
                {dataArr.map((el, i) => {
                  return (
                    <li key={dataStr[i]}>
                      <span style={{ color: 'gray ' }}>{dataStrKor[i]}</span>
                      <SC.InputField
                        defaultValue={dataArr[i]}
                        id={dataArr[i]}
                        name={dataStr[i]}
                        type="text"
                        onChange={({ target }) => {
                          setUserData({
                            ...data,
                            [dataStr[i]]: target.value,
                          });
                        }}
                      />
                    </li>
                  );
                })}
              </S.EditMemberInfo>
              <div className="btn-wrap">
                <ModalButton $isPrimary={false} onClick={() => setIsOpen(false)}>
                  취소
                </ModalButton>
                <ModalButton
                  $isPrimary={true}
                  onClick={() => {
                    setIsOpen(false);

                    const edmitMemberData = {
                      url: `members/${id}`,
                      method: 'put',
                      body: userData,
                    };

                    submitRequest(edmitMemberData);
                  }}
                >
                  확인
                </ModalButton>
              </div>
            </>
          }
        </Modal>
      )}
      <S.list key={data.id}>
        <li>
          <div className="pic">
            <img alt="profile" src="/imgs/profile.png" />
          </div>
          <p>
            <span>이름</span>
            {data.name}
          </p>
          <p>
            <span>생년월일</span>
            {dataChange('birthDate', data.birthDate)}
          </p>
          <p>
            <span>등록일</span>
            {dataChange('createdAt', data.createdAt)}
          </p>
          <p>
            <span>성별</span>
            {dataChange('sex', data.sex)}
          </p>
          <p>
            <span>전화번호</span>
            {dataChange('phone', data.phone)}
          </p>
        </li>
        <li className="btn-wrap">
          <Button
            size="md"
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            수정
          </Button>
        </li>
      </S.list>

      {/* 수강권 수정 */}
      {editTicketModalState && (
        <Modal maxWidth="36rem" setIsOpen={setEditTicketModalState}>
          <S.ModalInfoTop>
            <h3 className="modal-info-title">{editTicketData['title']}</h3>
            <p className="modal-tag">{editTicketData['lessonType'] === 'SINGLE' && '1:1 개인수업'}</p>
          </S.ModalInfoTop>
          <S.ModalInfoStyle>
            <dl>
              <dt>기본 횟수</dt>
              <dd>{editTicketData['defaultCount'] ? editTicketData['defaultCount'] + '회' : '무제한'}</dd>
            </dl>
            <dl>
              <dt>서비스 횟수</dt>
              <dd>{editTicketData['serviceCount']}회</dd>
            </dl>
            <dl>
              <dt>잔여 횟수</dt>
              <dd>{editTicketData['remainingCount']}회</dd>
            </dl>
            <dl>
              <dt>예약 가능 잔여 횟수</dt>
              <dd>{editTicketData['availableReservationCount']}회</dd>
            </dl>
            <dl>
              <dt>수강권 기간</dt>
              <dd>
                {editTicketData['defaultTerm'] && editTicketData['defaultTermUnit']
                  ? editTicketData['defaultTerm'] + editTicketData['defaultTermUnit']
                  : '소진시까지'}
              </dd>
            </dl>
            <dl>
              <dt>유효 기간</dt>
              <div>
                <SC.InputField disabled defaultValue={editTicketData['startAt']} type="date" />
                <SC.InputField
                  defaultValue={editTicketData['endAt']}
                  name="endAt"
                  type="date"
                  onChange={({ target }) => {
                    setSubmitTicketData({ ...submitTicketData, [target.name]: target.value });
                  }}
                />
              </div>
            </dl>
            <dl>
              <dt>담당 강사</dt>
              <dd>
                <SC.Select
                  name="tutorId"
                  onChange={({ target }) => {
                    setSubmitTicketData({ ...submitTicketData, [target.name]: parseInt(target.value) });
                  }}
                >
                  {/* <option value="" selected ></option> */}
                  {staffsDatas.map(el => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </SC.Select>
              </dd>
            </dl>
          </S.ModalInfoStyle>
          <ModalButton>취소</ModalButton>
          <ModalButton
            $isPrimary={true}
            onClick={async () => {
              try {
                const submitEditTicket = {
                  url: `issued-tickets/${ticketId}`,
                  method: 'put',
                  body: submitTicketData,
                };
                await submitRequest(submitEditTicket);

                alert('수강권이 수정되었습니다.');
              } catch (error) {
                console.error(error);
              }
            }}
          >
            수강권 수정
          </ModalButton>
        </Modal>
      )}

      <Top>
        <div className="ticket-active">
          {/* 미완 */}
          <Link className={'on'} to="?isActive=true">{`판매중`}</Link>
          <Link className={''} to="?isActive=false">{`판매종료`}</Link>
        </div>
        <Button
          size="md"
          onClick={() => {
            navigate('addTicket');
          }}
        >
          + 수강권 부여
        </Button>
      </Top>
      <TicketContainer>
        <TicketWrap style={{ gridTemplateColumns: 'repeat(2, minmax(430px, 1fr))' }}>
          {!memberTicketDataIsLoading &&
            memberTicketData.issuedTickets
              .sort((a, b) => a.id - b.id)
              .reverse()
              .map((el, i) => {
                return (
                  <TicketItem
                    key={el.id}
                    btnTexts={{ btnDetail: '상세보기', btnSuspens: '수강권 일시중단', btnEdit: '수정' }}
                    setTicketData={setTicketData(i)}
                    ticket={el}
                  />
                );
              })}
        </TicketWrap>
      </TicketContainer>
    </div>
  ) : (
    <h2 style={{ textAlign: 'center' }}>
      선택된 회원이 없습니다 <br></br> <strong>회원관리 페이지</strong>에서 회원을 선택해주세요!
    </h2>
  );
};

const S = {
  list: styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 6px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;

    & > li {
      display: flex;
      align-items: center;

      & > .pic {
        margin-right: 10px;
      }

      & > p {
        & > span {
          color: gray;
          margin-right: 10px;
        }
      }

      & > p:nth-of-type(1) {
        width: 140px;
      }
      & > p:nth-of-type(2) {
        width: 180px;
      }
      & > p:nth-of-type(3) {
        width: 170px;
      }
      & > p:nth-of-type(4) {
        width: 80px;
      }
      & > p:nth-of-type(5) {
        width: 200px;
      }
    }
  `,

  EditMemberInfo: styled.ul`
    text-align: left;

    & > li {
      margin-bottom: 14px;
    }
  `,

  ModalInfoTop: styled.div`
    margin-top: 1.5rem;
    margin-inline: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .modal-tag {
      font-size: ${theme.font.sub};
      color: ${theme.colors.pri[500]};
      background-color: ${theme.colors.pri[900]};
      padding-inline: 0.6rem;
      padding-block: 0.3rem;
      border-radius: 6px;
      width: fit-content;
      margin-bottom: 0;
    }

    .modal-info-title {
      text-align: left;
      font-size: ${theme.font.subTitle};
      margin-bottom: 0;
    }
  `,
  ModalInfoStyle: styled.div`
    display: grid;
    gap: 10px;
    margin-bottom: 2rem;
    margin-top: 2rem;
    text-align: left;

    dt {
      color: ${theme.colors.gray[500]};
    }

    dl {
      display: grid;
      grid-template-columns: 3fr 7fr;
      padding: 1rem;
      border-bottom: 1px solid ${theme.colors.gray[800]};
      column-gap: 2.5rem;
      font-size: 15px;
    }
    dl:first-child {
      border-top: 1px solid ${theme.colors.gray[800]};
    }

    dd {
      display: flex;
      gap: 0.5rem;

      svg {
        width: 24px;
        height: auto;
      }
    }
  `,
};

export const MembersDetailComponent = memo(MembersDetail);
