import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { MemberIcon } from '@assets/icons/indexIcons';
import theme from '@styles/theme';
import { formatTimestampDot } from '@utils/schedules/formatTimestamp';

export type SearchMemberType = {
  id: number;
  name: string;
  phone: string;
  sex: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
};

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

export type SearchUserType = {
  id: number;
  type: string;
  loginId: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginedAt: string;
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

export const Tag = styled.span`
  font-size: ${theme.font.sm};
  text-align: center;
  width: 50px !important;
  padding-inline: 0.5rem;
  padding-block: 0.2rem;
  background-color: ${theme.colors.pri[900]};
  color: ${theme.colors.pri[500]};
  border-radius: 6px;
`;
