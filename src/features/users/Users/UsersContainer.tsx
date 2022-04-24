import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { loadingStates } from '../../../api';
import { useAppDispatch } from '../../../app/store';
import { fetchUsers, usersSelectors } from '../usersSlice';
import Users from './Users';

function UsersContainer() {
  const dispatch = useAppDispatch();
  const [state, setState] = useState(loadingStates.idle);
  const allUsers = useSelector(usersSelectors.selectAll);
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

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
    };
  }, []);

  return <Users users={allUsers} state={state} />;
}

export default UsersContainer;
