import React, { useEffect } from 'react';
import { block } from 'bem-cn';

import PageLayout from '../common/PageLayout';
import Header from '../common/Header/Header';
import UserForm from '../features/profile/UserForm/UserForm';
import FormReadonlyButton from '../features/profile/FormReadonlyButton/FormReadonlyButton';

function Profile() {
  useEffect(() => {
    document.title = 'Профиль';
  }, []);

  const header = (
    <Header>
      <h1 className={block('page-title')()}>Профиль пользователя</h1>
      <FormReadonlyButton />
    </Header>
  );

  return <PageLayout header={header} content={<UserForm />} />;
}

export default Profile;
