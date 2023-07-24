import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks/apis/useAuth';
import { RootState } from '@stores/store';

export const LoginButton = () => {
  const accessToken = useSelector((state: RootState) => state.tokens.accessToken);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogOutClick = () => {
    logout();
  };

  return (
    <>
      {!accessToken ? (
        <button
          type="button"
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </button>
      ) : (
        <button type="button" onClick={handleLogOutClick}>
          로그아웃
        </button>
      )}
    </>
  );
};
