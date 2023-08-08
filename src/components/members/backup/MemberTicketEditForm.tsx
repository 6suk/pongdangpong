/**
 * 백업용 기존 위치 (memvbersDetail)
 */

import { Modal } from '@components/common/Modal';

export const MemberTicketEditForm = () => {
  return (
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
  );
};
