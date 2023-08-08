import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  AvailableTicketsOwnerType,
  AvailableTicketsType,
  BookableTicketsRequest,
  PrivateLessonFormInputsType,
  PrivateLessonInitInput,
} from '@apis/schedulesAPIs';
import { SelectField } from '@components/common/SelectField';
import { useSwrData } from '@hooks/apis/useSwrData';

import { RootState } from '@stores/store';
import { LabelNotice, NameButton } from '@styles/common/FormStyle';
import { SC } from '@styles/common/inputsStyles';

interface BookableTicketsListProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  inputValues: PrivateLessonFormInputsType;
  error: boolean;
  inputReset: (data: PrivateLessonFormInputsType) => void;
  disabled?: boolean;
}

export const BookableTicketsList = ({
  onChange,
  inputValues,
  error,
  inputReset,
  disabled = false,
}: BookableTicketsListProps) => {
  const {
    USER: { id: tutorId },
    MEMBER: { id: memberId },
  } = useSelector((state: RootState) => state.findUsers);
  const url = memberId && tutorId ? `/members/${memberId}/bookable-tickets?tutorId=${tutorId}` : null;
  const { data, isLoading } = useSwrData<BookableTicketsRequest>(url);
  const availableTickets = data?.availableTickets;
  const isData = availableTickets !== undefined && availableTickets.length > 0;
  const [optionData, setOptionData] = useState<{ value: number; label: string }[]>([]);
  const [ownerList, setOwnerList] = useState<AvailableTicketsOwnerType[]>();

  useEffect(() => {
    if (isData) {
      const mapOptionData = availableTickets.map((ticket: AvailableTicketsType) => {
        const { id, title, lessonDuration } = ticket;
        return { value: id, label: `${title} (${lessonDuration}분)` };
      });
      setOptionData(mapOptionData);
    }
  }, [data]);

  useEffect(() => {
    if (!memberId || !tutorId) {
      setOwnerList(undefined);
      setOptionData([]);
      inputReset({ ...inputValues, issuedTicketId: PrivateLessonInitInput.issuedTicketId });
    }
  }, [memberId, tutorId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
    const selectedValue = e.target.value;
    const selectedOwners = availableTickets?.find(
      (ticket: AvailableTicketsType) => ticket.id === parseInt(selectedValue)
    )?.owners;

    if (selectedOwners) {
      setOwnerList(selectedOwners);
      onChange(e);
    }
  };
  return (
    <>
      <div>
        <SC.Label>
          수강권 선택 <span></span>
        </SC.Label>

        {!isLoading && memberId && tutorId ? (
          <SelectField
            disabled={!isData || disabled}
            error={error}
            name="issuedTicketId"
            options={optionData}
            placeholder={isData ? '수강권을 선택해주세요.' : '회원에게 부여된 수강권이 없습니다.'}
            value={inputValues.issuedTicketId || ''}
            onChange={handleChange}
          />
        ) : (
          <SelectField
            disabled={true}
            error={error}
            name="issuedTicketId"
            options={[]}
            placeholder={'담당강사와 회원을 먼저 선택해주세요.'}
            value={''}
            onChange={onChange}
          />
        )}
      </div>
      {!disabled && (
        <div>
          <>
            <SC.Label>
              참여회원 <LabelNotice>회원과 수강권 선택 시 자동으로 입력됩니다.</LabelNotice>
            </SC.Label>
            {ownerList !== undefined &&
              ownerList.map(owner => (
                <NameButton key={owner.id} className="info-btn">
                  <span className="user-name">{owner.name}</span>
                </NameButton>
              ))}
          </>
        </div>
      )}
    </>
  );
};
