import * as React from 'react';
import codeArtelUiLib from 'code-artel-ui-lib';
import { Form, Field } from 'react-final-form';

import Input from '../Input/Input';
// @ts-ignore
const { Box, Flex, Button } = codeArtelUiLib['code-artel-ui-lib'];

export class FormPasswordRecovery extends React.Component<React.FC<any>> {
  onSubmit = (value: any) => {
    alert('На почту отправлено письмо');
    console.log(value);
  };

  validate = ({ email }: any) => {
    const errors: any = {};

    !email ? (errors.email = 'Обязательно для заполнения') : null;

    return errors;
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        render={({ handleSubmit, pristine, invalid }): any => (
          <form onSubmit={handleSubmit}>
            <Box pb={5}>
              <Field render={Input} type={'text'} name={'email'} placeholder={'Почта'} />
            </Box>

            <Flex justifyContent={'space-around'}>
              <Button variant={'secondary'} type={'submit'} disabled={pristine || invalid}>
                Сменить пароль
              </Button>
            </Flex>
          </form>
        )}
      />
    );
  }
}

export default FormPasswordRecovery;
