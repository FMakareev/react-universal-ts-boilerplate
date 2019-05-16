import * as React from 'react';
import codeArtelUiLib from 'code-artel-ui-lib';
import { Form, Field } from 'react-final-form';
import { Redirect } from 'react-router-dom';
import Input from '../Input/Input';
// @ts-ignore
const { Box, Flex, Button, Text } = codeArtelUiLib['code-artel-ui-lib'];

export class FormRegistration extends React.Component {
  state = { redirect: null, error: false };

  onSubmit = (value: any) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve(value);
      }, 3000);
    });
  };

  validate = ({ firstName, lastName, email, password, retryPassword }: any) => {
    const errors: any = {};

    !firstName ? (errors.firstName = 'Обязательно для заполнения') : null;
    !lastName ? (errors.lastName = 'Обязательно для заполнения') : null;
    !email ? (errors.email = 'Обязательно для заполнения') : null;
    !password ? (errors.password = 'Обязательно для заполнения') : null;
    !retryPassword ? (errors.retryPassword = 'Обязательно для заполнения') : null;

    password !== retryPassword ? (errors.retryPassword = 'Обязательно для заполнения') : null;

    return errors;
  };

  render() {
    const { redirect, error } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        render={({ handleSubmit, pristine, invalid }): any => (
          <form onSubmit={handleSubmit}>
            <Box pb={5}>
              <Field type={'text'} name={'firstName'} placeholder={'Имя'} render={Input} />
            </Box>

            <Box pb={5}>
              <Field name={'lastName'} type={'text'} placeholder={'Фамилия'} render={Input} />
            </Box>

            <Box pb={5}>
              <Field name={'email'} type={'text'} placeholder={'Почта'} render={Input} />
            </Box>

            <Box pb={5}>
              <Field name={'phone'} type={'text'} placeholder={'Телефон'} render={Input} />
            </Box>

            <Box pb={5}>
              <Field name={'password'} type={'password'} placeholder={'Пароль'} render={Input} />
            </Box>

            <Box pb={5}>
              <Field
                name={'retryPassword'}
                type={'password'}
                placeholder={'Повторите пароль'}
                render={Input}
              />
            </Box>

            <Flex justifyContent={'center'}>
              <Button variant={'secondary'} type={'submit'} disabled={pristine || invalid}>
                Регистрация
              </Button>
            </Flex>

            {error && (
              <Flex alignItems={'center'} color={'tomato'} fontSize={7} p={3}>
                Произошла ошибка при регистрации
              </Flex>
            )}
          </form>
        )}
      />
    );
  }
}

export default FormRegistration;
