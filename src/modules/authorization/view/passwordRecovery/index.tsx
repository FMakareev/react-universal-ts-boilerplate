import * as React from 'react';
import codeArtelUiLib from 'code-artel-ui-lib';

import FormPasswordRecovery from '../../component/FormPasswordRecovery/FormPasswordRecovery';

// @ts-ignore
const { Box, Text } = codeArtelUiLib['code-artel-ui-lib'];

export class PasswordRecovery extends React.Component {
  render() {
    return (
      <Box p={6}>
        <Text mb={6}>Восстановление пароля</Text>
        <FormPasswordRecovery />
      </Box>
    );
  }
}

export default PasswordRecovery;
