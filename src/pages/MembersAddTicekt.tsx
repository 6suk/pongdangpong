import React, { useEffect, useState, useCallback } from 'react';
import { Modal } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';

import { useSwrData } from '@hooks/apis/useSwrData';
import { Button } from '@components/common/Button';

export const MembersAddTicekt = ({ id, members,tickets }) => {

  const { data, isLoading } = useSwrData('staffs');

  const {datas : staffData} = data ?? {}

  const [memberModalIsOpen, setMemberModalIsOpen] = useState(false);
  const [staffModalIsOpen, setStaffModalIsOpen] = useState(false);

  const [submitTicketData, setSubmitTicketData] = useState({
    memberIds: [id],
    serviceCount: 0,
    privateTutorId: 0,
    startAt: '',
    endAt: '',
  });

  // console.log(id);
  

  const [ticketId, setTicketId] = useState(0);
 
  const {request} = useRequests();

  const addTicket = useCallback(async ()=>{
    try {
      await request({
        url:`tickets/${ticketId}/issue`,
        method: 'post',
        body:submitTicketData,
      });

      alert('부여완료')
      
    } catch (error) {
      console.error(error)
    }
  },[ticketId,submitTicketData])

  useEffect(() => {
    console.log(submitTicketData);
    console.log(ticketId,"ticketId");
    
  }, [submitTicketData,ticketId]);

  return (
    <>
      <h2># 수강권 부여</h2>

      <h2>## 티켓 생성</h2>
      <select name="ticketId" id="ticketId" onChange={(e)=>{setTicketId(+e.target.value)}}>
        {
          tickets?.map(({id, title})=>{
            return <option key={id} value={id}>{`${title}`}</option>
          })
        }
      </select>

      {/* <button
        type="button"
        onClick={() => {
          setMemberModalIsOpen(true);
        }}
      >
        회원 선택하기
      </button>
      {memberModalIsOpen && (
        <Modal setIsOpen={setMemberModalIsOpen}>
          {
            <>
              {members?.map((el, i) => {
                const { id, name, phone, sex, birthDate } = el;
                return (
                  <div key={id}>
                    <input
                      checked={submitTicketData['memberIds']?.includes(members[i].id) ? true : false}
                      id={id}
                      name="memberIds"
                      type="checkbox"
                      onChange={e => {
                        e.stopPropagation();

                        setSubmitTicketData({
                          ...submitTicketData,
                          [e.target.name]: [...new Set([...submitTicketData[e.target.name], +e.target.id])],
                        });
                      }}
                    />
                    <label
                      htmlFor={id}
                    >{`id :${id} 이름: ${name} 전화번호:${phone} 성별: ${sex} 생년월일${birthDate}`}</label>
                  </div>
                );
              })}
            </>
          }
        </Modal>
      )} */}
      <br />

      <p>선택한 회원 : </p>
      

      {/* 담당강사 선택 */}
      {staffModalIsOpen && <Modal setIsOpen={setStaffModalIsOpen}>
                {staffData?.map(({id, memberCount, memo, name, phone, rating}, i) => {
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
      }</Modal>}
      <button
        type="button"
        onClick={() => {
          setStaffModalIsOpen(true);
        }}
      >
        담당강사 선택
      </button>

      <label htmlFor="startAt">시작일</label>
      <input type="date" id="startAt"name='startAt' onChange={({target})=>{
        setSubmitTicketData({...submitTicketData, [target.name]: target.value})
        
      }}/>
      <label htmlFor="endAt">종료일</label>
      <input type="date" id="endAt" name='endAt' onChange={({target})=>{
                setSubmitTicketData({...submitTicketData, [target.name]: target.value})
      }}/>

      <Button onClick={()=>{
        addTicket()
      }}>전송</Button>
    </>
  );
};
