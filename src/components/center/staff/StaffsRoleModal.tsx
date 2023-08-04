import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import styled from 'styled-components';
import { mutate } from 'swr';

import { Roles } from '@apis/staffsAPIs';
import { Modal, ModalButton } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';
import theme from '@styles/theme';

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
      <Modal setIsOpen={setIsOpen}>
        <RolesWrap>
          <h3>역할 설정</h3>
          <p className="roles-title">역할 선택 (중복선택 가능)</p>
          <p className="roles-desc">센터에서 설정한 역할을 등록하려는 직원에게 부여합니다.</p>
          <div className={`checkBox-wrap ${checkedValues.length < 1 && 'error'}`}>
            {!rolesIsLoading &&
              roles.map((v: Roles) => {
                const { id, name, description } = v;
                return (
                  <div key={id}>
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
        </RolesWrap>
        <div className="buttonWrapper">
          <ModalButton
            onClick={() => {
              setIsOpen(false);
              console.log({ id });
            }}
          >
            뒤로
          </ModalButton>
          <ModalButton onClick={RoleUpdate} $isPrimary>
            완료
          </ModalButton>
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

const RolesWrap = styled.div`
  width: 100%;

  p.roles-title {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${theme.colors.gray[50]};
    text-align: left;
  }

  .roles-desc {
    text-align: left;
    font-size: 14px;
    color: ${theme.colors.gray[300]};
    margin-bottom: 1rem;
  }

  .checkBox-wrap {
    &.error {
      border: 1px solid rgba(223, 41, 29, 0.7);
      transition: all 0.3s;
      border-radius: 6px;
    }

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type='checkbox'] {
      display: none;
    }
    input[type='checkbox']:checked + label {
      background-color: ${theme.colors.pri[900]};
      border: 1.5px solid ${theme.colors.pri[500]};
    }

    label {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      border: 1px solid ${theme.colors.gray[600]};
      border-radius: 6px;
      transition: all 0.4s;

      & :first-child {
        font-weight: 600;
        font-size: 16px;
      }
      & :last-child {
        font-size: 14px;
      }
    }
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: ${theme.font.sm} !important;
  color: ${theme.colors.Error} !important;
`;
