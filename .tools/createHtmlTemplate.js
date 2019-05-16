import fs from 'fs';
import path from 'path';

import template from '../src/server/template.tsx';

export const createHtmlTemplate = () => {

  fs.appendFileSync(path.resolve(__dirname, `../src/client/index.html`), template({}));
};

export default createHtmlTemplate;
