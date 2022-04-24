import React from 'react';

import { useAppDispatch } from '../../../app/store';
import { disableReadonly } from '../profileSlice';
import Button from '../../../common/Button/Button';

function FormReadonlyButton() {
  const dispatch = useAppDispatch();

  return <Button onClick={() => dispatch(disableReadonly())}>Редактировать</Button>;
}

export default FormReadonlyButton;
