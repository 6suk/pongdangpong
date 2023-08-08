import { useNavigate } from 'react-router-dom';

import { MemberListDatasType } from '@apis/membersAPIs';
import { MemberIcon } from '@assets/icons/indexIcons';
import { DetailButton } from '@styles/common/buttonStyle';
import { formatTimestampDot } from '@utils/schedules/formatTimestamp';

export const MemberListitem = ({ member }: { member: MemberListDatasType }) => {
  const navigate = useNavigate();
  const { id, birthDate, sex, createdAt, phone, name } = member;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="table-row"
      onClick={() => {
        navigate(`${id}`);
      }}
    >
      <p className="icon-box">
        <MemberIcon /> <span>{name}</span>
      </p>
      <p>{phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}</p>
      <p>{formatTimestampDot(birthDate)}</p>
      <p>{sex === 'MALE' ? '남' : '여'}</p>
      <p>{formatTimestampDot(createdAt)}</p>
      <DetailButton
        onClick={() => {
          navigate(`${id}`);
        }}
        onMouseOver={e => {
          e.stopPropagation();
        }}
      >
        수강권 관리
      </DetailButton>
    </div>
  );
};
