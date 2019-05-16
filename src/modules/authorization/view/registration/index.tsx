import * as React from 'react';
import codeArtelUiLib from 'code-artel-ui-lib';

import FormRegistration from '../../component/FormRegistration/FormRegistration';

// @ts-ignore
const { Box, Text } = codeArtelUiLib['code-artel-ui-lib'];

export class RegistrationPage extends React.Component {
  render() {
    return (
      <Box p={6}>
        <Text mb={6}>Регистрация</Text>
        <FormRegistration />
      </Box>
    );
  }
}

export default RegistrationPage;
