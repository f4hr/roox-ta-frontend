import React from 'react';
import { useSelector } from 'react-redux';
import { block } from 'bem-cn';

import './Filter.scss';
import { useAppDispatch } from '../../../app/store';
import { fieldSelector, statusSelector, setField } from '../filterSlice';
import Button from '../../../common/Button/Button';

const b = block('filter');

export default function Filter() {
  const dispatch = useAppDispatch();
  const field = useSelector(fieldSelector);
  const status = useSelector(statusSelector);

  const changeField = (fieldName: string) => {
    dispatch(setField(fieldName === field ? '' : fieldName));
  };

  return (
    <div className={b()}>
      <ul className={b('list')}>
        <li className={b('item')}>
          <Button
            state={field === 'city' ? 'active' : ''}
            mod="main"
            onClick={() => changeField('city')}
            disabled={status === 'disabled'}
          >
            по городу
          </Button>
        </li>
        <li className={b('item')}>
          <Button
            state={field === 'company' ? 'active' : ''}
            mod="main"
            onClick={() => changeField('company')}
            disabled={status === 'disabled'}
          >
            по компании
          </Button>
        </li>
      </ul>
    </div>
  );
}
