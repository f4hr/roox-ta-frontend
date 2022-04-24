import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import routes from '../routes';
import PageLayout from '../common/PageLayout';
import Header from '../common/Header/Header';

function Error() {
  useEffect(() => {
    document.title = 'Страница не найдена';
  }, []);

  const header = (
    <Header>
      <h1 className={block('page-title')()}>Страница не найдена</h1>
    </Header>
  );

  const content = <Link to={routes.homePath()}>На главную</Link>;

  return <PageLayout header={header} content={content} />;
}

export default Error;
