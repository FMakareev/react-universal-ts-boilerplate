import * as React from 'react';

export interface IError {
  message: string;
  [propName: string]: any;
}

export interface IErrorComponent {
  error: IError;

  [propName: string]: any;
}

export const ErrorComponent: React.FC<IErrorComponent> = ({ error }) => <div>{error.message}</div>;

export default ErrorComponent;
