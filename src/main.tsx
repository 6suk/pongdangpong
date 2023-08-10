import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from '@app/App';
import { store } from '@stores/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

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
