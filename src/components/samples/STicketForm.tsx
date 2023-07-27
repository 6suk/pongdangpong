import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { tickets_create } from '@apis/ticketsAPIs';
import { useRequests } from '@hooks/apis/useRequests';
import useInput from '@hooks/utils/useInput';

export const STicketForm = () => {
  const { request, isLoading, error } = useRequests();
  const [inputValues, onChange, inputReset] = useInput({ ...tickets_create.body });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { url, method } = tickets_create;

    try {
      await request({
        url,
        method,
        body: inputValues,
      });
      navigate('/tickets/list');
      inputReset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && (
        <p>
          다시 시도 해주세요!
          <br />
          {error instanceof AxiosError && error.response?.data.message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          required
          id="lessonType"
          name="lessonType"
          placeholder="수업유형"
          type="text"
          value={inputValues.lessonType}
          onChange={onChange}
        />
        <input required name="title" placeholder="수강권명" type="text" value={inputValues.title} onChange={onChange} />
        <input
          required
          name="defaultTerm"
          placeholder="수강권 기간"
          type="number"
          value={inputValues.defaultTerm}
          onChange={onChange}
        />
        <input required name="defaultTerm" type="text" value={inputValues.defaultTermUnit} onChange={onChange} />
        <input
          required
          name="dailyCountLimit"
          placeholder="시간"
          type="number"
          value={inputValues.dailyCountLimit}
          onChange={onChange}
        />
        <input
          required
          name="defaultCount"
          placeholder="기본횟수"
          type="number"
          value={inputValues.defaultCount}
          onChange={onChange}
        />
        <input type="submit" value="등록" />
      </form>
      {isLoading && <div>Loading...</div>}
    </>
  );
};
