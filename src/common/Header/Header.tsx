import React from 'react';
import { block } from 'bem-cn';

import './Header.scss';

const b = block('header');

function Header({ children }: React.PropsWithChildren<any>) {
  return <div className={b()}>{children}</div>;
}

export default Header;
