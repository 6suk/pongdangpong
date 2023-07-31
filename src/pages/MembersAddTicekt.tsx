import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { styled } from 'styled-components';

import { Button } from '@components/common/Button';
import { Modal, ModalButton } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';

import { useSwrData } from '@hooks/apis/useSwrData';
import { SC } from '@styles/styles';

export const MembersAddTicekt = ({ id, members, tickets }) => {
  const { data, isLoading } = useSwrData('staffs');

  console.log(id);

  const { datas: staffData } = data ?? {};

  const [staffModalIsOpen, setStaffModalIsOpen] = useState(false);

  const [submitTicketData, setSubmitTicketData] = useState({
    memberIds: [id],
    serviceCount: 0,
    privateTutorId: 0,
    startAt: '',
    endAt: '',
  });

  const [ticketId, setTicketId] = useState(0);

  const { request } = useRequests();

  useEffect(() => {
    console.log(ticketId);
  }, [ticketId]);

  const addTicket = useCallback(async () => {
    try {
      await request({
        url: `tickets/${ticketId}/issue`,
        method: 'post',
        body: submitTicketData,
      });

      alert('부여완료');
    } catch (error) {
      console.error(error);
    }
  }, [ticketId, submitTicketData]);

  return (
    <S.addTicketContainer>
      <h2 className="main-title">수강권 부여</h2>
      <p className="add-ticket-username">
        부여할 회원 <span> {members?.filter(el => el.id === id)[0]?.name}</span>
      </p>
      <h3>수강권 선택</h3>
      <SC.Select
        id="ticketId"
        name="ticketId"
        onChange={e => {
          setTicketId(+e.target.value);
        }}
      >
        {tickets?.map(({ id, title }) => {
          return <option key={id} value={id}>{`${title}`}</option>;
        })}
      </SC.Select>
      {staffModalIsOpen && (
        <Modal setIsOpen={setStaffModalIsOpen}>
          {staffData?.map(({ id, memberCount, memo, name, phone, rating }) => {
            return (
              <div key={id}>
                <input
                  id={id}
                  name="privateTutorId"
                  type="radio"
                  onChange={e => {
                    e.stopPropagation();

                    setSubmitTicketData({
                      ...submitTicketData,
                      [e.target.name]: +e.target.id,
                    });
                  }}
                />
                <label
                  htmlFor={id}
                >{`id :${id} 이름: ${name} 전화번호:${phone} 회원 수:${memberCount} 메모:${memo} 평가: ${rating}`}</label>
              </div>
            );
          })}
          <ModalButton>취소</ModalButton>
          <ModalButton
            $isPrimary={true}
            onClick={() => {
              setStaffModalIsOpen(false);
            }}
          >
            확인
          </ModalButton>
        </Modal>
      )}
      <Button
        type="button"
        onClick={() => {
          setStaffModalIsOpen(true);
        }}
      >
        담당강사 선택
      </Button>
      담당 강사명 : {staffData?.filter(el => el.id === submitTicketData['privateTutorId'])[0]?.name}
      <br></br>
      <label htmlFor="startAt">
        <strong>시작일</strong>
      </label>
      <input
        id="startAt"
        name="startAt"
        type="date"
        onChange={({ target }) => {
          setSubmitTicketData({ ...submitTicketData, [target.name]: target.value });
        }}
      />
      <label htmlFor="endAt">
        {' '}
        <strong>종료일</strong>
      </label>
      <input
        id="endAt"
        name="endAt"
        type="date"
        onChange={({ target }) => {
          setSubmitTicketData({ ...submitTicketData, [target.name]: target.value });
        }}
      />
      {/* 수강권 부여완료 : 선택하신 수강권의 부여가 완료되었습니다. */}
      <Button
        onClick={() => {
          addTicket();
        }}
      >
        저장
      </Button>
    </S.addTicketContainer>
  );
};

const S = {
  addTicketContainer: styled.div`
    .main-title {
      font-size: 32px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 14px;
    }
    .add-ticket-username {
      text-align: center;

      & > span {
        font-weight: 700;
      }
    }
  `,
};
