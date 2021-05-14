const asyncResolve = async () => {
  return Promise.resolve('async resolve');
};

const asyncAwaitResolve = async () => {
  return await Promise.resolve('async/await with resolve');
};

const asyncSimple = async () => {
  return 'async without resolve';
};

const resolve = () => {
  return Promise.resolve('resolve');
};

const syncTest5 = () => {
  return 'sync';
};

asyncResolve().then(console.log);
asyncAwaitResolve().then(console.log);

resolve().then(console.log);
asyncSimple().then(console.log);

console.log(syncTest5());

