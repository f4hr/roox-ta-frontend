import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { block } from 'bem-cn';

import './UserForm.scss';
import type { Address, User } from '../../../types/types';
import { RootState } from '../../../app/store';
import { loadingStates, getUser } from '../../../api';
import { readonlySelector } from '../profileSlice';
import { selectUserForForm } from '../../users/usersSlice';
import Button from '../../../common/Button/Button';
import Spinner from '../../../common/Spinner/Spinner';
import Input, { InputProps } from '../Input/Input';
import routes from '../../../routes';

type FormValues = {
  name: User['name'];
  username: User['username'];
  email: User['email'];
  street: Address['street'];
  city: Address['city'];
  zipcode: Address['zipcode'];
  phone: User['phone'];
  website: User['website'];
  comment: string;
};

const schema = Yup.object({
  name: Yup.string().min(3, 'Must be at least 3 characters').required('Required').trim(),
  username: Yup.string().min(3, 'Must be at least 3 characters').required('Required').trim(),
  email: Yup.string().email('Invalid email address').required('Required'),
  street: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zipcode: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  website: Yup.string().url('Invalid URL').required('Required'),
});

const b = block('form');

const defaultValues = {
  name: '',
  username: '',
  email: '',
  street: '',
  city: '',
  zipcode: '',
  phone: '',
  website: '',
};

const formFields: InputProps[] = [
  { name: 'name', label: 'Name' },
  { name: 'username', label: 'User Name' },
  { name: 'email', label: 'E-mail', type: 'email' },
  { name: 'street', label: 'Street' },
  { name: 'city', label: 'City' },
  { name: 'zipcode', label: 'Zipcode' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'website', label: 'Website', type: 'url' },
  { name: 'comment', label: 'Comment', as: 'textarea' },
];

function UserForm() {
  const { userId } = useParams();
  const readonly = useSelector(readonlySelector);
  const selectedUser = useSelector((state: RootState) => selectUserForForm(state, userId));
  const [status, setStatus] = useState(loadingStates.idle);
  const [user, setUser] = useState(selectedUser);
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    if (user) return undefined;

    setStatus(loadingStates.loading);

    (async () => {
      getUser<User>(userId)
        .then((response) => ({
          name: response.name,
          username: response.username,
          email: response.email,
          street: response.address.street,
          city: response.address.city,
          zipcode: response.address.zipcode,
          phone: response.phone,
          website: response.website,
        }))
        .then((userData) => {
          if (!isMountedRef.current) return;
          setUser(userData);
          setStatus(loadingStates.succeeded);
        })
        .catch(() => setStatus(loadingStates.failed));
    })();

    return () => {
      isMountedRef.current = false;
    };
  }, [user, userId]);

  if (status === loadingStates.failed) {
    return (
      <>
        <p>Не удалось загрузить профиль пользователя</p>
        <p>
          <Link to={routes.homePath()}>На главную</Link>
        </p>
      </>
    );
  }

  if (!user || status === loadingStates.loading) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={{
        ...(user ?? defaultValues),
        comment: '',
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={schema}
      onSubmit={(values: FormValues) =>
        new Promise((resolve) => {
          // TODO: remove setTimeout and console.log
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            resolve(null);
          }, 500);
        })
      }
    >
      {({ isSubmitting, errors }) => (
        <Form className={b.mix('user-form')}>
          <ul className={b('input-list')}>
            {formFields.map(({ name, label, type, as = null }: InputProps) => (
              <li key={name} className={b('input-item')}>
                <Input
                  label={
                    <label className={b('label')} htmlFor={name}>
                      {label}
                    </label>
                  }
                  name={name}
                  type={type}
                  as={as}
                  isInvalid={!!errors[name as keyof typeof errors]}
                  readonly={readonly}
                />
              </li>
            ))}
          </ul>
          <div className={block('btn-wrapper')()}>
            <Button type="submit" mod="success" disabled={readonly || isSubmitting}>
              Отправить
              {isSubmitting ? <Spinner className="ms-2" size="sm" /> : null}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;
