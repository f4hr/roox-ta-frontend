import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

import type { User } from '../../../types/types';
import { loadingStates } from '../../../api';
import { useAppDispatch } from '../../../app/store';
import { fetchUsers, usersSelectors } from '../usersSlice';
import { fieldSelector, setStatus } from '../../filter/filterSlice';
import Users from './Users';

function UsersContainer() {
  const dispatch = useAppDispatch();
  const [state, setState] = useState(loadingStates.idle);
  const allUsers = useSelector(usersSelectors.selectAll);
  const field = useSelector(fieldSelector);
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    dispatch(setStatus('enabled'));

    (async () => {
      try {
        setState(loadingStates.loading);
        await dispatch(fetchUsers());
        if (isMountedRef.current) setState(loadingStates.succeeded);
      } catch (err) {
        setState(loadingStates.failed);
      }
    })();

    return () => {
      isMountedRef.current = false;
      dispatch(setStatus('disabled'));
    };
  }, []);

  const orderUsers = (fieldName: string, users: User[]): User[] => {
    switch (fieldName) {
      case '':
        return users;
      case 'city':
        return [...users].sort((a, b) => a.address.city.localeCompare(b.address.city));
      case 'company':
        return [...users].sort((a, b) => a.company.name.localeCompare(b.company.name));
      default:
        throw new Error(`Unknown sort field "${fieldName}"`);
    }
  };

  const orderedUsers = useMemo(() => orderUsers(field, allUsers), [field, allUsers]);

  return <Users users={orderedUsers} state={state} />;
}

export default UsersContainer;
