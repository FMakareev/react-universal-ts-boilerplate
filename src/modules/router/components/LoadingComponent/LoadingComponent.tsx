import * as React from 'react';

interface ILoadingComponent {
  [propName: string]: any;
}

export const LoadingComponent: React.FC<ILoadingComponent> = () => <div>Загрузка...</div>;

export default LoadingComponent;
