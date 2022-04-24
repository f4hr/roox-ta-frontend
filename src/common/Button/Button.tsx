import React from 'react';
import { block } from 'bem-cn';

import './Button.scss';

const b = block('btn');

type ButtonState = 'active' | 'disabled' | '';
type ButtonType = 'button' | 'submit' | 'reset';

type ButtonProps = {
  state?: ButtonState;
  type?: ButtonType;
  mod?: string;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({
  state,
  mod,
  type,
  disabled,
  children,
  onClick,
}: React.PropsWithChildren<ButtonProps>) {
  const cn = b({ [mod]: true });
  return (
    <button
      className={state === '' ? cn : cn.state({ [state]: true })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  state: '',
  type: 'button',
  mod: 'main',
  disabled: false,
  onClick: null,
};

export default Button;
