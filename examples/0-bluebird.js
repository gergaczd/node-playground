import Bluebird from 'bluebird';

//Bluebird is a pre Promise "polyfill" by default setImmediate
Bluebird.setScheduler(process.nextTick);
setImmediate(() => console.log('immediate'));
Bluebird.resolve('hello from bluebird').then(console.log)
process.nextTick(console.log, 'hello from nextTick')
Promise.resolve('native promise').then(console.log)
