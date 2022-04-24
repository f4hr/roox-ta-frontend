import React, { ReactChild } from 'react';
import { block } from 'bem-cn';

import Sidebar from './Sidebar/Sidebar';
import Filter from '../features/filter/Filter/Filter';

type PageLayoutProps = {
  header: ReactChild;
  content: ReactChild;
};

function PageLayout({ header, content }: PageLayoutProps) {
  return (
    <>
      <Sidebar title="Сортировка">
        <Filter />
      </Sidebar>
      <div className={block('content')()}>
        {header}
        {content}
      </div>
    </>
  );
}

export default PageLayout;
