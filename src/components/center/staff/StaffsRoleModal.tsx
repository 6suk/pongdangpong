import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { mutate } from 'swr';

import { RolesRoleType } from '@apis/types/staffsTypes';
import { Button } from '@components/common/Button';
import { Modal } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';
import { ErrorMessage } from '@styles/common/errorMessageStyle';
import { ModalButton } from '@styles/modal/modalStyle';
import { RolesModalWrap } from '@styles/pages/staffDetailStyle';

interface StaffsRoleModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsSaveModalOpen: Dispatch<SetStateAction<boolean>>;
  id: string | number;
}

interface StaffRoleConfirmModalProps {
  setIsSaveModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const StaffsRoleModal: React.FC<StaffsRoleModalProps> = ({ setIsOpen, setIsSaveModalOpen, id }) => {
  const { request, isLoading } = useRequests();
  const { data, isLoading: rolesIsLoading } = useSwrData(`staffs/${id}/change-role`);
  const currentRoleIds = data?.currentRoleIds || [];
  const roles = data?.roles || [];
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  useEffect(() => {
    setCheckedValues(currentRoleIds.map((id: number) => id.toString()));
  }, [currentRoleIds]);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setCheckedValues(prev => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  };

  const RoleUpdate = async () => {
    if (checkedValues.length < 1) {
      return;
    }

    const newRole = { roleIds: checkedValues.map(Number) };

    try {
      const response = await request({
        url: `staffs/${id}/change-role`,
        method: 'post',
        body: newRole,
      });

      if (response) {
        setIsOpen(false);
        setIsSaveModalOpen(true);
      }
      mutate(`staffs/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    !isLoading && (
      <Modal maxWidth="32rem" setIsOpen={setIsOpen}>
        <RolesModalWrap>
          <h3>역할 설정</h3>
          <div className={`checkBox-wrap ${checkedValues.length < 1 && 'error'}`}>
            {!rolesIsLoading &&
              roles.map((v: RolesRoleType) => {
                const { id, name, description } = v;
                return (
                  <div key={id} className="chekBox-item">
                    <input
                      checked={checkedValues.includes(id.toString())}
                      id={name}
                      name="roles"
                      type="checkbox"
                      value={id.toString()}
                      onChange={onCheckboxChange}
                    />
                    <label className="checkbox-label" htmlFor={name}>
                      <p>{name}</p>
                      <p>{description}</p>
                    </label>
                  </div>
                );
              })}
          </div>
          {checkedValues.length < 1 && <ErrorMessage>역할을 1개 이상 선택해 주세요.</ErrorMessage>}
        </RolesModalWrap>
        <div className="buttonWrapper">
          <Button
            isPri={false}
            size="full"
            onClick={() => {
              setIsOpen(false);
              console.log({ id });
            }}
          >
            뒤로
          </Button>
          <Button size="full" onClick={RoleUpdate}>
            완료
          </Button>
        </div>
      </Modal>
    )
  );
};

export const StaffRoleConfirmModal: React.FC<StaffRoleConfirmModalProps> = ({ setIsSaveModalOpen }) => {
  return (
    <Modal setIsOpen={setIsSaveModalOpen}>
      <p>저장 완료</p>
      <ModalButton
        onClick={() => {
          setIsSaveModalOpen(false);
        }}
      >
        확인
      </ModalButton>
    </Modal>
  );
};
