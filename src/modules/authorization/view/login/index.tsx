import * as React from 'react';
import { hot } from 'react-hot-loader';
import codeArtelUiLib from 'code-artel-ui-lib';

import FormLogin from '../../component/FormLogin/FormLogin';

// @ts-ignore
const { Box, Text } = codeArtelUiLib['code-artel-ui-lib'];

export const LoginPage: React.FC<any> = () => {
  return (
    <Box py={6} px={5}>
      <Text mb={6}>Вход</Text>
      <FormLogin />
    </Box>
  );
};
export default hot(module)(LoginPage);
