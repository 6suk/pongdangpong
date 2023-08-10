import { useNavigate } from 'react-router-dom';

import { MeCenterType } from '@apis/types/authTypes';
import { MemberIcon, BackIcon } from '@assets/icons/indexIcons';
import { useSwrData } from '@hooks/apis/useSwrData';
import { BackButton } from '@styles/common/buttonStyle';
import { CenterInfoBox, CenterInfoWrap, CenterInfoBar } from '@styles/pages/centerInfoStyle';

export const CenterInfo = () => {
  const { data, isLoading } = useSwrData(`me/center`);
  const { id, name, centerCode, phone, contactLink } = (data as MeCenterType) ?? {};
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
