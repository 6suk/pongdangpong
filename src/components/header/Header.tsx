import { useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks/apis/useAuth';

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogOutClick = () => {
    logout();
  };

  return (
    <>
      <button type="button" onClick={handleLogOutClick}>
        로그아웃
      </button>
      <button
        type="button"
        onClick={() => {
          navigate('/tickets/list');
        }}
      >
        티켓 리스트
      </button>
      <button
        type="button"
        onClick={() => {
          navigate('/tickets/create');
        }}
      >
        티켓 생성
      </button>
      <button
        type="button"
        onClick={() => {
          navigate('/me');
        }}
      >
        내 정보 보기
      </button>
    </>
  );
};
