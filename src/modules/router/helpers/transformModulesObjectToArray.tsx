import { IModule } from './CreateRouterConfig';

export const transformModulesObjectToArray = (modules: any): IModule[] =>
  Object.entries(modules).map(([moduleName, value]) => {
    return {
      moduleName: moduleName,
      ...value,
    };
  });

export default transformModulesObjectToArray;
