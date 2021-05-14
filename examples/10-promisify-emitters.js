/* Description:
`on` and `once` is relatively new API, with this API you can write more cleaner code, but be careful because it has some
disadvantage as well! In the example the

 */
import { EventEmitter, on, once } from 'events';
import { setTimeout } from 'timers/promises';
import { yellow } from '../config.js';

const emitter = new EventEmitter({ captureRejections: true });

const subscribeOnce = async () => {
  const [arg] = await once(emitter, 'something');
  console.log(arg);
};

const subscribeFor = async () => {
  for await (const [arg] of on(emitter, 'something')) {
    console.log('fancy processing', arg);
    await setTimeout(100).then(() => {
      console.log('waited in fancy', arg);
    });
  }
}

emitter.on('something', (arg) => {
  console.log(yellow, `- traditional ${arg}`);
})

// subscribeOnce();
subscribeFor();
emitter.emit('something', 'first');
console.log(yellow, 'between emit 1');
emitter.emit('something', 'second');
console.log(yellow, 'between emit 2');
emitter.emit('something', 'third');
