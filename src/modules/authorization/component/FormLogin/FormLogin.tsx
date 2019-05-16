import * as React from 'react';
import codeArtelUiLib from 'code-artel-ui-lib';
import { Form, Field } from 'react-final-form';

import Input from '../Input/Input';
// @ts-ignore
const { Box, Flex, Button } = codeArtelUiLib['code-artel-ui-lib'];

export class FormLogin extends React.Component<React.FC<any>> {
  state = { error: false };

  onSubmit = (value: any) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve(value);
      }, 3000);
    });
  };

  validate = ({ login, password }: any) => {
    const errors: any = {};
    !login ? (errors.login = 'Обязательно для заполнения') : null;
    !password ? (errors.password = 'Обязательно для заполнения') : null;
    return errors;
  };

  render() {
    const { error } = this.state;

    return (
      <Box>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, pristine, invalid }): any => (
            <form onSubmit={handleSubmit}>
              <Box pb={5}>
                <Field type={'text'} name={'login'} placeholder={'Логин'} render={Input} />
              </Box>

              <Box pb={5}>
                <Field render={Input} name={'password'} type={'password'} placeholder={'Пароль'} />
              </Box>

              <Flex justifyContent={'space-around'}>
                <Button variant={'secondary'} type={'submit'} disabled={pristine || invalid}>
                  Вход
                </Button>
                <Button href={'/registration'} as={'a'}>
                  Регистрация
                </Button>
              </Flex>

              {error && (
                <Flex alignItems={'center'} color={'tomato'} fontSize={7} p={3}>
                  Невеврный логин или пароль
                </Flex>
              )}
            </form>
          )}
        />
      </Box>
    );
  }
}

export default FormLogin;
