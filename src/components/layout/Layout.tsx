import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

import { styled } from 'styled-components';

import { GlobalHeader, SubHeader } from '@/index';
import { RootState } from '@stores/store';

export const Layout = () => {
  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);

  return (
    <>
      <div className="container max-w-full">
        <GlobalHeader isLogin={isLogin} />
        <SubHeader isLogin={isLogin} />
        <div className="sm:container sm:mx-auto mt-[4rem] mb-40 2xl:max-w-screen-xl">
          {/* <section className="mx-auto"> */}
          <Container>
            <Outlet />
          </Container>
          {/* </section> */}
        </div>
      </div>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export default Layout;
