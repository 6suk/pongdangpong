import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { styled } from 'styled-components';

import { GlobalStyle, Header, Home, Login, Me, PrivateRoute, PublicRoute, Ticket } from '@/index';
import { RootState } from '@stores/store';

function App() {
  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);

  return (
    <>
      <GlobalStyle />
      {isLogin && <Header />}
      <AppStyle>
        <Routes>
          <Route element={<PublicRoute isLogin={isLogin} />}>
            <Route element={<Login />} path="login" />
          </Route>
          <Route element={<PrivateRoute isLogin={isLogin} />}>
            <Route element={<Home />} path="/" />
            <Route element={<Ticket />} path="tickets/*" />
            <Route element={<Me />} path="me" />
          </Route>
        </Routes>
      </AppStyle>
    </>
  );
}

export interface PropsState {
  isLogin: boolean;
}

const AppStyle = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
      animation: logo-spin infinite 20s linear;
    }
  }

  .card {
    padding: 2em;
  }

  .read-the-docs {
    color: #888;
  }
`;

export default App;
