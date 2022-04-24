import React from 'react';
import { block } from 'bem-cn';

import './Spinner.scss';

const b = block('spinner');

type SpinnerProps = {
  className?: string | null;
  size?: 'sm' | 'md';
};

function Spinner({ className, size }: SpinnerProps) {
  const cn = [className, size === 'md' ? b() : b({ [size]: true })].join(' ');
  return (
    <div className={cn} role="status">
      <span className="visually-hidden">Загрузка...</span>
    </div>
  );
}

Spinner.defaultProps = {
  className: null,
  size: 'sm',
};

export default Spinner;
