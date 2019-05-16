export const compilerPromise = compiler =>
  new Promise(resolve => {
    compiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      console.log('Compiler promise error.');
      return Promise.reject(new Error(stats));
    });
  });

export default compilerPromise;
