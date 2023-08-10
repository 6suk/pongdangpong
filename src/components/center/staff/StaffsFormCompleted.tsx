import { useNavigate, useParams } from 'react-router-dom';

import { RegisteredStaff } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { CompletionWrap } from '@styles/pages/staffFormStyle';

export const StaffsFormCompleted = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();

  return (
    <>
      <CompletionWrap>
        <RegisteredStaff />
        <div className="staff-info">
          <dl>
            <dt>직원명</dt>
            <dd>{name}</dd>
          </dl>
          <dl>
            <dt>로그인 아이디</dt>
            <dd>{id}</dd>
          </dl>
        </div>
        <p>
          직원 등록이 완료되었습니다.
          <br />
          로그인 아이디를 직원에게 전달해주세요.
        </p>
      </CompletionWrap>
      <Button
        size="main"
        onClick={() => {
          navigate('/center/staffs');
        }}
      >
        돌아가기
      </Button>
    </>
  );
};
