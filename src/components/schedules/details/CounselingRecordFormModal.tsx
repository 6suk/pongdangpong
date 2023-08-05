import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { CounselingRequest, Schedules_detail_counseling } from '@apis/schedulesAPIs';
import { Button } from '@components/common/Button';
import { Modal } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import useInput from '@hooks/utils/useInput';
import { useValidation } from '@hooks/utils/useValidation';
import { SC } from '@styles/styles';

const initCounselingRecordContent = {
  counselingRecordContent: '',
};

interface CounselingRecordFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: Schedules_detail_counseling;
  handleModalNotice: (title: string, content: string) => void;
}

export const CounselingRecordFormModal = ({ setIsOpen, data, handleModalNotice }: CounselingRecordFormProps) => {
  const { pathname } = useLocation();
  const [inputValues, onChange, inputReset] = useInput(initCounselingRecordContent);
  const { checkForErrors, validationErrors, isSubmit } = useValidation();
  const { request } = useRequests();

  const { startAt, endAt, memo, counselor, client, counselingRecord } = data || {};

  const handleRecordSubmit = async (type: 'delete' | 'put') => {
    switch (type) {
      case 'delete':
        inputValues.counselingRecordContent = initCounselingRecordContent.counselingRecordContent;
        break;
      case 'put':
        if (inputValues.counselingRecordContent === counselingRecord?.content || checkForErrosByRecord()) break;
        break;
    }

    await requestRecordContent();
    setIsOpen(false);
    handleModalNotice(
      `상담 기록 ${type === 'put' ? '등록' : '삭제'} 완료`,
      `상담 기록이 ${type === 'put' ? '등록' : '삭제'} 되었습니다.`
    );
  };

  const requestRecordContent = async () => {
    const requestValues: CounselingRequest = {
      userId: counselor.id,
      clientName: client.name,
      clientPhone: client.phone,
      memo,
      startAt,
      endAt,
      counselingRecordContent: inputValues.counselingRecordContent,
    };
    await request({
      method: 'put',
      url: pathname,
      body: requestValues,
    });
  };

  const checkForErrosByRecord = useCallback(() => {
    return checkForErrors([{ name: 'counselingRecord', type: 'string' }], inputValues);
  }, [inputValues]);

  useEffect(() => {
    if (isSubmit) checkForErrosByRecord();
  }, [inputValues, isSubmit, checkForErrosByRecord]);

  useEffect(() => {
    if (counselingRecord) inputReset({ counselingRecordContent: counselingRecord?.content || '' });
  }, [counselingRecord, inputReset]);

  return (
    <>
      <Modal closeOnClick={false} maxWidth="43rem" setIsOpen={setIsOpen}>
        <div className="title-left">
          <h3>상담기록</h3>
          <p>회원님과 나눈 내용을 자유롭게 작성해 보세요.</p>
        </div>
        <div>
          <SC.TextareaField
            className={validationErrors.counselingRecordContent ? 'error' : ''}
            maxLength={1000}
            name="counselingRecordContent"
            placeholder="내용을 입력해주세요. (1000자 이내)"
            style={{ height: '250px', marginBottom: '1rem' }}
            value={inputValues.counselingRecordContent}
            onChange={onChange}
          />
        </div>

        <div className="buttonWrapper">
          <Button
            isPri={false}
            size="full"
            onClick={() => {
              handleRecordSubmit('delete');
            }}
          >
            상담기록 삭제
          </Button>
          <Button
            size="full"
            onClick={() => {
              handleRecordSubmit('put');
            }}
          >
            저장
          </Button>
        </div>
      </Modal>
    </>
  );
};
