import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import { store } from './store';
import routes from '../routes';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import Error from '../pages/Error';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.homePath()}>
            <Route index element={<Users />} />
            <Route path={routes.usersPath()}>
              <Route path=":userId" element={<Profile />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
