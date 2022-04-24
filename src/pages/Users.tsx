import React, { useEffect } from 'react';
import { block } from 'bem-cn';

import PageLayout from '../common/PageLayout';
import Header from '../common/Header/Header';
import UsersContainer from '../features/users/Users/UsersContainer';

function Users() {
  useEffect(() => {
    document.title = 'Список пользователей';
  }, []);

  const header = (
    <Header>
      <h1 className={block('page-title')()}>Список пользователей</h1>
    </Header>
  );

  return <PageLayout header={header} content={<UsersContainer />} />;
}

export default Users;
