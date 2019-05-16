import * as faker from 'faker';

export const getRandomMongoID = () =>
  faker.random
    .uuid()
    .replace(/-/g, '')
    .substring(0, 24);

export default getRandomMongoID;
