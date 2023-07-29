import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { SC } from '@/styles/styles';
import { Button } from '@components/common/Button';
import { Modal, ModalButton } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import { theme } from '@styles/theme';

interface FormState {
  name: string;
  birthDate: number | string;
  phone: number | string;
  sex: string;
  job: number | string;
  acqusitionFunnel: string;
  acquisitionFunnel: string;
  toss: [];
}

export const MembersEdit: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    birthDate: '',
    phone: '',
    sex: '',
    job: '',
    acqusitionFunnel: '',
    acquisitionFunnel: '',
    toss: [],
  });

  const navigate = useNavigate();
  const { request } = useRequests();

  const [isOpen, setIsOpen] = useState(false);

  const inputData = ({ target }: React.ChangeEvent<HTMLInpuphoneement>) => {
    switch (target.name) {
      case 'phone':
        target.value = target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        break;
      case 'birthDate':
        target.value = target.value.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
        break;
      case 'sex':
        target.value = target.className.toUpperCase();
        break;
    }

    setFormState({ ...formState, [target.name]: target.value });
  };

  const submitData = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    formState['phone'] = (formState['phone'] + '').replace(/-/g, '');
    formState['birthDate'] = (formState['birthDate'] + '').replace(/\./g, '-');

    try {
      await request({
        url: 'members',
        method: 'post',
        body: formState,
      });
      console.log('등록 완료');

      setIsOpen(true);

      setFormState({
        name: '',
        birthDate: '',
        phone: '',
        sex: '',
        job: '',
        acqusitionFunnel: '',
        acquisitionFunnel: '',
        toss: [],
      });
    } catch (error) {
      console.error(error);
      // input 빨간색으로 어디부분 잘못되었는지 출력
    }
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  return (
    <>
      <S.modalContainer>
        {isOpen && (
          <Modal setIsOpen={setIsOpen}>
            <h2>등록완료</h2>
            <p>{''}님의 회원 정보가 생성되었습니다. 문진을 바로 시작하시겠어요? </p>
            <img alt="" src="/imgs/Graphic_Member_registered.png" />
            <ModalButton $isPrimary={false}>닫기</ModalButton>
            <ModalButton $isPrimary={true}>문진 시작</ModalButton>
          </Modal>
        )}
      </S.modalContainer>

      <S.MembersEditContainer theme={theme}>
        <h2>회원 등록</h2>
        <p>회원 정보를 등록합니다.</p>

        <S.wrap theme={theme}>
          <div className="first-column">
            <SC.Label>
              이름 <span>*</span>
            </SC.Label>
            <SC.InputField
              maxLength={10}
              name="name"
              placeholder="이름을 입력하세요"
              type="text"
              onChange={e => {
                inputData(e);
              }}
            />

            <SC.Label>
              성별<span>*</span>
            </SC.Label>
            <div className="button-wrap">
              {Array(2)
                .fill(null)
                .map((_, idx) => {
                  return (
                    <button
                      key={idx}
                      className={!idx ? 'female' : 'male'}
                      name="sex"
                      type="button"
                      onClick={e => {
                        inputData(e);
                      }}
                    >
                      {!idx ? '여' : '남'}
                    </button>
                  );
                })}
            </div>

            {/*  화면상 . 으로 구분, 데이터 보낼때 - 추가  */}
            <SC.Label>
              생년월일 <span>*</span>
            </SC.Label>
            <SC.InputField
              maxLength={10}
              name="birthDate"
              placeholder="0000.00.00"
              type="text"
              onChange={e => {
                inputData(e);
              }}
            />

            <SC.Label>
              휴대폰 번호 <span>*</span>
            </SC.Label>

            <SC.InputField
              maxLength={13}
              name="phone"
              placeholder="000-0000-0000"
              type="phone"
              onChange={e => {
                inputData(e);
              }}
            />
          </div>

          <div className="second-column">
            <SC.Label>직업</SC.Label>
            <SC.Select name="job" onChange={e => inputData(e)}>
              <option className="opion-title" defaultValue="">
                선택해주세요
              </option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </SC.Select>

            <SC.Label>방문경로</SC.Label>
            <SC.Select name="visitRoute" onChange={e => inputData(e)}>
              <option className="opion-title" defaultValue="">
                선택해주세요
              </option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </SC.Select>
          </div>
        </S.wrap>

        <S.BtnWrap>
          <Button
            size={'full'}
            onClick={e => {
              submitData(e);
            }}
          >
            확인
          </Button>
          <Button isPri={false} size={'full'}>
            취소
          </Button>
        </S.BtnWrap>
      </S.MembersEditContainer>
    </>
  );
};

const S = {
  modalContainer: styled.div`
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,

  MembersEditContainer: styled.div`
    width: 780px;
    h2 {
      text-align: center;
      font-weight: 600;
      font-size: ${({ theme: { font } }) => font['main']};
    }
    p {
      margin-bottom: 62px;
      text-align: center;
    }
  `,
  wrap: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    span {
      color: ${({ theme: { colors } }) => colors['Pri-400']};
    }

    .first-column {
      width: 50%;
      margin-right: 40px;
      input {
        margin-bottom: 26px;
      }

      .button-wrap {
        margin-bottom: 30px;

        button[type='button'] {
          width: 70px;
          height: 36px;
          border: 1px solid #cfcfcf;
          border-radius: 4px;
          margin-right: 6px;

          &.on {
            background-color: blue;
          }
        }
      }
    }
    .second-column {
      width: 50%;

      select {
        margin-bottom: 26px;
      }
    }
  `,

  BtnWrap: styled.div`
    display: flex;

    & > button:nth-of-type(1) {
      margin-right: 40px;
    }
  `,
};
