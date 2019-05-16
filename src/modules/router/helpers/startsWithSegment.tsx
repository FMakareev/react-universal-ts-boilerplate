const dotOrEnd = '(\\/.+$|$)';

export interface State {
  name: string;
  params?: {
    [key: string]: any;
  };
  [key: string]: any;
}

const getName = (route: State | string): string => {
  return typeof route === 'string' ? route : route.name || '';
};

const test = (route: string, regex: RegExp): boolean => {
  return regex.test(getName(route));
};

const normaliseSegment = (name: string): string => {
  return name.replace('/', '\\/');
};

const testRouteWithSegment = (start: string, end: string) => {
  return (...args: string[]) => {
    const route = args[0];

    const applySegment = (segment: string) => {
      return test(route, new RegExp(start + normaliseSegment(segment) + end));
    };

    if (args.length === 2) {
      return applySegment(args[1]);
    }

    return applySegment;
  };
};

export const startsWithSegment = testRouteWithSegment('^/', dotOrEnd);

export default startsWithSegment;
