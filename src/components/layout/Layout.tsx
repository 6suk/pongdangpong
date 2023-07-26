import { GlobalHeader, GlobalNavigation, SubHeader } from '@/index';
import { RootState } from '@stores/store';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);

  return (
    <>
      <div className="container max-w-full">
        <GlobalHeader isLogin={isLogin} />
        <SubHeader isLogin={isLogin} />
        <div className="sm:container sm:mx-auto mt-10 mb-40 2xl:max-w-screen-xl">
          <section className="mx-auto w-fit">
            <Outlet />
          </section>
        </div>
        <GlobalNavigation />
      </div>
    </>
  );
};

export default Layout;
