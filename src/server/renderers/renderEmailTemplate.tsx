import { Request } from 'express';
import renderApp from './renderApp';
import juice from 'juice';

/** Метод рендерит статику из jsx и преобразует css стили в инлайновые стили */
export const RenderEmailTemplate = async (request: Request) => {
  const html: string = await renderApp(request);
  console.log('html: ', html.length);
  if (!html || html === '') return '';

  return juice(html, {
    insertPreservedExtraCss: true,
    preserveMediaQueries: true,
    removeStyleTags: false,
  });
};

export default RenderEmailTemplate;
