import React from 'react';
import { block } from 'bem-cn';

import './List.scss';

type ListProps<T> = {
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string | number;
  items: T[];
};

const b = block('list');

function List<T>({ renderItem, getKey, items }: ListProps<T>) {
  return (
    <ul className={b()}>
      {items.map((item) => (
        <li className={b('item')} key={getKey(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default List;
