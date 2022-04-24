import React, { HTMLInputTypeAttribute } from 'react';
import { Field } from 'formik';
import { block } from 'bem-cn';

import './Input.scss';

export type InputProps = {
  type?: HTMLInputTypeAttribute;
  as?: 'input' | 'textarea';
  name: string;
  label: React.ReactNode;
  isInvalid?: boolean;
  readonly?: boolean;
};

const b = block('input');

function Input({
  label,
  name,
  type = 'text',
  as = 'input',
  isInvalid = true,
  readonly = false,
}: React.PropsWithChildren<InputProps>) {
  return (
    <>
      {label}
      <Field
        id={name}
        className={b.state({
          invalid: isInvalid,
        })}
        name={name}
        type={type}
        as={as}
        readOnly={readonly}
        autoComplete="off"
      />
    </>
  );
}

Input.defaultProps = {
  type: 'text',
  as: 'input',
  isInvalid: true,
  readonly: false,
};

export default Input;
