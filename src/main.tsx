import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

import App from '@app/App';

import { store } from '@stores/store';

import '@styles/main.css';

export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
);
