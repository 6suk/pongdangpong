import { useNavigate } from 'react-router-dom';

import { SearchMemberType, SearchUserType } from '@apis/searchAPIs';
import { MemberIcon } from '@assets/icons/indexIcons';
import { Tag } from '@styles/pages/homeStyle';
import { formatTimestampDot } from '@utils/schedules/formatTimestamp';

export const MemberItem = ({ member }: { member: SearchMemberType }) => {
  const navigate = useNavigate();
  const { id, name, phone, birthDate, sex, createdAt, updatedAt, visitedAt } = member;

  return (
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

export const UserItem = ({ user }: { user: SearchUserType }) => {
  const navigate = useNavigate();
  const { id, type, loginId, name, phone, isActive, createdAt, updatedAt, lastLoginedAt } = user;

  return (
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
