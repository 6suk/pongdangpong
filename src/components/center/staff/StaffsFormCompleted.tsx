import { useNavigate, useParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { RegisteredStaff } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import theme from '@styles/theme';

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

const CompletionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  h1 {
    font-size: ${theme.font.title};
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  svg {
    width: 450px;
    height: auto;
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
  }

  .staff-info {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    dl {
      font-size: 14px;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      padding-inline: 1rem;
      padding-block: 0.2rem;
      background-color: ${theme.colors.pri[900]};
      border-radius: 6px;

      dt {
        font-weight: 600;
        color: ${theme.colors.pri[500]};
      }
    }
  }
`;
