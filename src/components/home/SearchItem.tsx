import { useNavigate } from 'react-router-dom';

import { MemberSearchType, UsersSearchType } from '@apis/types/searchTypes';
import { MemberIcon } from '@assets/icons/indexIcons';
import { Tag } from '@styles/pages/homeStyle';
import { formatTimestampDot } from '@utils/schedules/formatTimestamp';

export const MemberItem = ({ member }: { member: MemberSearchType }) => {
  const navigate = useNavigate();
  const { id, name, phone, birthDate, sex, createdAt, updatedAt, visitedAt } = member;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="table-row"
      onClick={() => {
        navigate(`/members/${id}`);
      }}
    >
      <p className="icon-box">
        <MemberIcon />
        <span>{name}</span>
        <Tag>회원</Tag>
      </p>
      <p>{phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}</p>
      <p>{formatTimestampDot(createdAt)}</p>
    </div>
  );
};

export const UserItem = ({ user }: { user: UsersSearchType }) => {
  const navigate = useNavigate();
  const { id, type, loginId, name, phone, isActive, createdAt, updatedAt, lastLoginedAt } = user;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="table-row"
      onClick={() => {
        navigate(`/center/staffs/${id}`);
      }}
    >
      <p className="icon-box">
        <MemberIcon />
        <span>{name}</span>
        <Tag>직원</Tag>
      </p>
      <p>{phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}</p>
      <p>{formatTimestampDot(createdAt)}</p>
    </div>
  );
};
