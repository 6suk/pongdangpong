import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { MemberIcon, BackIcon } from '@assets/icons/indexIcons';
import { useSwrData } from '@hooks/apis/useSwrData';
import theme from '@styles/theme';

export const Mypage = () => {
  const { data, isLoading } = useSwrData(`me`);
  const { id, type, loginId, name, phone, pwdChangeRequired, center } = data ?? {};
  const navigate = useNavigate();

  return (
    !isLoading && (
      <>
        <MyInfoWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>내 정보</h3>
              </div>
              <BackButton onClick={() => navigate(-1)}>
                <BackIcon />
                <p>뒤로가기</p>
              </BackButton>
            </div>
            <MyInfoBar>
              <div className="infos">
                <div className="name-and-role">
                  <p className="icon-box">
                    <MemberIcon /> {name}
                  </p>
                  <div className="role-box">
                    {type === 'ADMIN' && <span className="tag">관리자</span>}
                    <p className="center-name">{center.name}</p>
                  </div>
                </div>
              </div>
              <p className="center-code">
                센터코드 <span className="data">{center.code}</span>
              </p>
            </MyInfoBar>
          </div>
          <div>
            <MyInfoBox>
              <div className="table">
                <div className="table-row">
                  <p className="title">이름</p> <p className="data">{name || '-'}</p>
                </div>
                <div className="table-row">
                  <p className="title">휴대폰 번호</p> <p className="data">{phone || '-'}</p>
                </div>
                <div className="table-row">
                  <p className="title">아이디</p> <p className="data">{loginId || '-'}</p>
                </div>
                <div className="table-row">
                  <p className="title">비밀번호</p> <p className="data">{pwdChangeRequired || '*******'}</p>
                </div>
              </div>
            </MyInfoBox>
          </div>
          <div></div>
        </MyInfoWrap>
      </>
    )
  );
};

export const MyInfoWrap = styled.div`
  width: 100%;
  margin-top: 1rem;
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

const MyInfoBar = styled.div`
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

  .name-and-role {
    display: flex;
    gap: 1rem;

    .role-box {
      display: flex;
      gap: 0.2rem;
      align-items: center;

      .tag {
        font-size: ${theme.font.sm};
        padding-inline: 0.5rem;
        padding-block: 0.2rem;
        background-color: ${theme.colors.pri[900]};
        color: ${theme.colors.pri[500]};
        border-radius: 6px;
      }
    }
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
  .center-name {
    font-size: 14px;
    color: ${theme.colors.gray[200]};
    margin-left: 1rem;
  }

  .center-code {
    font-size: 14px;
    color: ${theme.colors.gray[200]};
  }
  .data {
    font-size: 14px;
    color: ${theme.colors.pri[600]};
  }
`;

export const MyInfoBox = styled.div`
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

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    width: 6px;
    fill: ${theme.colors.gray[500]};
  }

  font-size: ${theme.font.sub};
  color: ${theme.colors.gray[500]};
`;

export default Mypage;
