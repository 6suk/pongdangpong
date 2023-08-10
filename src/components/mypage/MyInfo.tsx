import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MeType } from '@apis/authAPIs';
import { BackIcon, MemberIcon } from '@assets/icons/indexIcons';
import { RootState } from '@stores/store';
import { BackButton } from '@styles/common/buttonStyle';
import { DetailWrap } from '@styles/common/wrapStyle';
import { MyInfoBar, MyInfoBox } from '@styles/pages/mypageStyle';

export const MyInfo = () => {
  const data = useSelector((state: RootState) => state.tokens.user) as MeType;
  const { id, type, loginId, name, phone, pwdChangeRequired, center } = data;
  const navigate = useNavigate();

  return (
    <>
      <DetailWrap $marginTop="0">
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
      </DetailWrap>
    </>
  );
};

export default MyInfo;
