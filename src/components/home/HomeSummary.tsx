import { useNavigate } from 'react-router-dom';

import { MeSummaryType } from '@apis/authAPIs';
import ad01 from '@assets/icons/home/ad01.svg';
import ad02 from '@assets/icons/home/ad02.svg';
import ad03 from '@assets/icons/home/ad03.svg';
import { UserColorIcon, SearchIcon } from '@assets/icons/indexIcons';
import { useSwrData } from '@hooks/apis/useSwrData';
import useInput from '@hooks/utils/useInput';
import { SC } from '@styles/common/inputsStyles';
import { Searchbar } from '@styles/common/SearchBarStyle';
import { HomeSummaryWrap, SearchContainer } from '@styles/pages/homeStyle';

export const HomeSummary = () => {
  const { data, isLoading } = useSwrData(`me/summary`);
  const { center, mySchedule, message } = (data as MeSummaryType) ?? {};
  const { staffCount, myMemberCount } = center ?? {};
  const { lessonCount, counselingCount } = mySchedule ?? {};
  const navigate = useNavigate();
  const [inputValues, onChange] = useInput({ query: '' });
  const { query } = inputValues;

  const searchPath = (query: string) => {
    return `search?query=${query}`;
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPath = searchPath(query);
    navigate(newPath);
  };

  return (
    <>
      <HomeSummaryWrap>
        <SearchContainer>
          <Searchbar>
            <form className="search-bar" onSubmit={handleSearchSubmit}>
              <SC.InputField
                className="input-field"
                name="query"
                placeholder="회원/멤버 이름, 연락처로 검색하세요"
                type="text"
                value={query}
                width={'320px !important '}
                onChange={onChange}
              />
              <button className="search-submit" type="submit">
                <SearchIcon />
              </button>
            </form>
          </Searchbar>
        </SearchContainer>
        <div className="ad-wrapper">
          <button
            className="ad-btn"
            type="button"
            onClick={() => {
              window.open('https://piehealthcare.notion.site/b9c6e60b1b7b4162a1669cf6efb424c8', '_blank');
            }}
            style={{ backgroundImage: `url(${ad01})` }}
          ></button>
          <button
            className="ad-btn"
            type="button"
            onClick={() => {
              window.open('https://cirius.or.kr/index.html', '_blank');
            }}
            style={{ backgroundImage: `url(${ad02})` }}
          ></button>
          <button
            className="ad-btn"
            type="button"
            onClick={() => {
              window.open('https://bbedashop.com/', '_blank');
            }}
            style={{ backgroundImage: `url(${ad03})` }}
          ></button>
        </div>
        <div className="btn-wrapper">
          <div className="btn-container">
            <span className="top-left-text">나의 오늘 일정</span>
            <button
              className="home-btn"
              type="button"
              onClick={() => {
                navigate('/schedules');
              }}
            >
              <h4>총 {(lessonCount || 0) + (counselingCount || 0)}건의 일정</h4>
              <h6>
                수업 {lessonCount || 0}건, 상담 {counselingCount || 0}건
              </h6>
              <span className="count">{(lessonCount || 0) + (counselingCount || 0)}</span>
              <p className="icon-box">
                <UserColorIcon />
              </p>
            </button>
          </div>
          <div className="btn-container">
            <div className="top-left-text">나의 회원</div>
            <button
              className="home-btn"
              type="button"
              onClick={() => {
                navigate('/members');
              }}
            >
              <h4>나의 회원 수</h4>
              <span className="count">{myMemberCount || 0}</span>
              <p className="icon-box">
                <UserColorIcon />
              </p>
            </button>
          </div>

          <div className="btn-container">
            <span className="top-left-text">전체 직원</span>

            <button
              className="home-btn"
              type="button"
              onClick={() => {
                navigate('/center/staffs');
              }}
            >
              <h4>전체 직원 수</h4>
              <span className="count">{staffCount || 0}</span>
              <p className="icon-box">
                <UserColorIcon />
              </p>
            </button>
          </div>
        </div>
      </HomeSummaryWrap>
    </>
  );
};
