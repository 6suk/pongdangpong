import { AttendanceHistoriesType, SchedulesIssuedTicketType, StatusEnum } from '@apis/schedulesAPIs';
import { MemberIcon } from '@assets/icons/indexIcons';
import { PrivateLessonCardItem, SchedulesTypeInfo } from '@styles/pages/SchedulesStyle';

import { StatusButton } from './StatusButton';

export interface MemberCardItemProps {
  attendanceHistories: AttendanceHistoriesType[];
  issuedTicket: SchedulesIssuedTicketType;
}

export const MemberCardItem = ({ attendanceHistories, issuedTicket }: MemberCardItemProps) => {
  const { title, remainingCount, availableReservationCount, defaultCount } = issuedTicket;

  return (
    <>
      {attendanceHistories.map((v: AttendanceHistoriesType) => {
        const {
          id,
          member: { id: memberId, name: memberName, phone: memberPhone },
          status,
        } = v;
        return (
          <PrivateLessonCardItem key={memberId}>
            <div className="card-top">
              <div className="top-left">
                <MemberIcon />
                <div className="name-box">
                  <p className="name">{memberName}</p>
                  <p>{memberPhone}</p>
                </div>
              </div>
              <div className="top-btns">
                <StatusButton attendanceHistoryId={id} buttonType="attendance" status={status}>
                  출석
                </StatusButton>
                <StatusButton attendanceHistoryId={id} buttonType="absence" status={status}>
                  결석
                </StatusButton>
              </div>
            </div>
            <div className="card-bottom">
              <div className="infos">
                <dl>
                  <dt>출결상태</dt>
                  <dd className="type-box">
                    <SchedulesTypeInfo type={status} />
                    <p>{StatusEnum[status]}</p>
                  </dd>
                </dl>
                <dl>
                  <dt>수강권명</dt>
                  <dd>{title}</dd>
                </dl>
                <dl>
                  <dt>잔여</dt>
                  <dd>{defaultCount ? `${remainingCount}회 (총${defaultCount}회)` : '무제한'}</dd>
                </dl>
                <dl>
                  <dt>예약 가능</dt>
                  <dd>{defaultCount ? `${availableReservationCount}회 (총${defaultCount}회)` : '무제한'}</dd>
                </dl>
              </div>
            </div>
          </PrivateLessonCardItem>
        );
      })}
    </>
  );
};
