import React from 'react';
import { block } from 'bem-cn';

import './Sidebar.scss';

const b = block('sidebar');

type SidebarProps = {
  title?: string;
};

function Sidebar({ title, children }: React.PropsWithChildren<SidebarProps>) {
  return (
    <div className={b()}>
      {title ? <p className={b('heading')}>{title}</p> : null}
      {children}
    </div>
  );
}

Sidebar.defaultProps = {
  title: '',
};

export default Sidebar;
