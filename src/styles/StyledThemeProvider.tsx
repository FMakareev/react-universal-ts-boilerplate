import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import index$4 from 'code-artel-ui-lib';
const { ThemeCreate } = index$4['code-artel-ui-lib'];

export const StyledThemeProvider: React.FC<any> = ({ children }) => (
  <ThemeProvider theme={ThemeCreate()}>{children}</ThemeProvider>
);

export default StyledThemeProvider;
