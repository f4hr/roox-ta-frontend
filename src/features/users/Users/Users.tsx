import React from 'react';
import { block } from 'bem-cn';

import './Users.scss';
import type { User } from '../../../types/types';
import List from '../../../common/List/List';
import UserItem from '../UserItem/UserItem';
import Spinner from '../../../common/Spinner/Spinner';
import { loadingStates } from '../../../api';

type UsersProps = {
  users: User[];
  state: string;
};

function Users({ users, state }: UsersProps) {
  if (state === loadingStates.failed) {
    return <p>Не удалось загрузить пользователей</p>;
  }
  if (state === loadingStates.loading) {
    return <Spinner />;
  }

  return (
    <>
      <List renderItem={(item) => <UserItem user={item} />} getKey={({ id }) => id} items={users} />
      <p className={block('users-count')()}>{`Найдено ${users.length} пользователей`}</p>
    </>
  );
}

export default Users;
