import { Outlet } from 'react-router-dom';

import { styled } from 'styled-components';

import { GlobalHeader, SubHeader } from '@/index';

export const Layout = () => {
  return (
    <>
      <div className="container max-w-full">
        <GlobalHeader />
        <SubHeader />
        <div className="sm:container sm:mx-auto mt-[4rem] mb-20 2xl:max-w-screen-xl">
          <Container>
            <Outlet />
          </Container>
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
