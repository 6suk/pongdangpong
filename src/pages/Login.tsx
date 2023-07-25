import { Modal, ModalButton } from '@components/common/Modal';
import { useAuth } from '@hooks/apis/useAuth';
import useInput from '@hooks/utils/useInput';
import { useState } from 'react';

const initForm = {
  loginId: '',
  password: '',
};

export const Login = () => {
  const { login, isLoading, authError } = useAuth();
  const [inputValues, handleInputChange, inputReset] = useInput(initForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { loginId, password } = inputValues;
    await login(loginId, password);
    inputReset(true);
  };

  return (
    <>
      <h1>로그인</h1>
      {!isLoading ? (
        <form onSubmit={handleSubmit}>
          <input name="loginId" placeholder="id" type="text" value={inputValues.loginId} onChange={handleInputChange} />
          <input
            autoComplete="off"
            name="password"
            placeholder="password"
            type="password"
            value={inputValues.password}
            onChange={handleInputChange}
          />
          <input
            type="submit"
            value="로그인"
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded mr-2"
          />
        </form>
      ) : (
        <div>Loading...</div>
      )}
      {authError && <p>{String(authError)}</p>}
      {/* ========================== 모달 테스트 ========================== */}
      <button onClick={() => setIsModalOpen(true)} className="mt-3 mr-3">
        첫번째 모달 열기
      </button>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <h3>일정 확인 필요</h3>
          <p>{`취소를 진행하시겠습니까?\n취소는 차감된 횟수가 복구됩니다.\n주의 : 일정 내용 복구 불가`}</p>
          <div className="buttonWrapper">
            <ModalButton onClick={() => setIsModalOpen(false)}>아니요</ModalButton>
            <ModalButton $isPrimary={true} onClick={() => setIsModalOpen(false)}>
              확인
            </ModalButton>
          </div>
        </Modal>
      )}
      <button onClick={() => setIsSecondModalOpen(true)} className="mt-3 mr-3">
        두번째 모달 열기
      </button>
      {isSecondModalOpen && (
        <Modal setIsOpen={setIsSecondModalOpen}>
          <h3>권한 없음</h3>
          <p>{`삭제 권한이 없습니다.\n센터관리 > 직원관리에서 권한 설정을 변경해 주세요.`}</p>
          <div className="buttonWrapper">
            <ModalButton onClick={() => setIsSecondModalOpen(false)}>확인</ModalButton>
          </div>
        </Modal>
      )}
      {/* ========================== 모달 테스트 ========================== */}
    </>
  );
};

export default Login;