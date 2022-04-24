import React from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import './UserItem.scss';
import type { User } from '../../../types/types';
import routes from '../../../routes';

type UserItemProps = {
  user: User;
};

const b = block('user-item');

function UserItem({ user }: UserItemProps) {
  const { id, name } = user;

  return (
    <div className={b()}>
      <ul className={b('info')}>
        <li className={b('info-item')}>
          <span className={b('info-heading')}>ФИО:</span> {name}
        </li>
        <li className={b('info-item')}>
          <span className={b('info-heading')}>город:</span> {user.address.city}
        </li>
        <li className={b('info-item')}>
          <span className={b('info-heading')}>компания:</span> {user.company.name}
        </li>
      </ul>
      <Link className={b('link')} to={routes.userPath(id)}>
        Подробнее
      </Link>
    </div>
  );
}

export default UserItem;
