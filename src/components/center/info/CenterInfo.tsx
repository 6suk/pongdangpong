import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { MeCenterType } from '@apis/authAPIs';
import { MemberIcon, BackIcon } from '@assets/icons/indexIcons';
import { useSwrData } from '@hooks/apis/useSwrData';
import { BackButton } from '@styles/common/buttonStyle';
import theme from '@styles/theme';

export const CenterInfo = () => {
  const { data, isLoading } = useSwrData(`me/center`);
  const { id, name, centerCode, phone, contactLink } = (data as MeCenterType) ?? {};
  const { staffCount, myMemberCount } = center ?? {};
  const { lessonCount, counselingCount } = mySchedule ?? {};
  const navigate = useNavigate();

  return (
    !isLoading && (
      <>
        <CenterInfoWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>센터 정보</h3>
              </div>
              <BackButton onClick={() => navigate(-1)}>
                <BackIcon />
                <p>뒤로가기</p>
              </BackButton>
            </div>
            <CenterInfoBar>
              <div className="infos">
                <p className="icon-box">
                  <MemberIcon /> {name}
                </p>
              </div>
              <p className="edit-center">센터 정보 수정이 필요하신가요?</p>
            </CenterInfoBar>
          </div>
          <div>
            <CenterInfoBox>
              <div className="table">
                <div className="table-row">
                  <p className="title">센터코드</p> <p className="data">{centerCode || '-'}</p>
                </div>
                <div className="table-row">
                  <p className="title">센터 연락처</p> <p className="data">{phone || '-'}</p>
                </div>
                <div className="table-row">
                  <p className="title">카카오 채널 주소</p> <p className="data">{contactLink || '-'}</p>
                </div>
              </div>
            </CenterInfoBox>
          </div>
          <div></div>
        </CenterInfoWrap>
      </>
    )
  );
};

export const CenterInfoWrap = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1024px;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-inline: 1rem;
    justify-content: space-between;

    .title {
      display: flex;
      align-items: center;
    }

    h3 {
      font-size: ${theme.font.subTitle};
      font-weight: 800;
    }
  }
`;

const CenterInfoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  text-align: left;
  border-radius: 6px;
  font-size: 16px;
  justify-content: space-between;

  .infos {
    display: flex;
    gap: 3rem;
    align-items: center;
  }

  .icon-box {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;

    svg {
      width: 30px;
    }
  }

  .edit-center {
    font-size: 12px;
    color: ${theme.colors.gray[400]};
  }
`;

export const CenterInfoBox = styled.div`
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  border-radius: 6px;
  font-size: 15px;
  margin-top: -1rem;

  .table {
    width: 100%;
  }

  .table-row {
    display: flex;
    align-items: center;
    padding: 0.5rem;

    .title {
      width: 150px;
      text-align: left;
      color: ${theme.colors.gray[400]};
    }

    .data {
      text-align: left;
      color: ${theme.colors.gray[50]};
      font-weight: 600;
    }
  }
`;
