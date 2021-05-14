/* Description:
We can use async in an event handler callback, but be careful, because in this case each error
that throw inside this function can break our app (unhandled promise rejection which is exit the app by default)
This happens because the event handler is not capable to execute this in async way. We can easily solve this
issue to use { captureRejections: true } in the constructor or turn it on globally, with this modification
the event handler runs the callback in async way and automatically catches all the errors and pass it
to the 'error' handler without crashing the app.
 */
import { yellow } from '../config.js';
import events from 'events';
const { captureRejectionSymbol, EventEmitter } = events;

// events.captureRejections = true;
const emitter = new EventEmitter({ captureRejections: true });
emitter.on('something', async () => {
  console.log('before the problem');
  await Promise.resolve().then(() => {
    throw new Error('danger');
  })
});

emitter.on('error', (error) => {
  console.log(yellow, `catched ${error.name}`);
});

// emitter[captureRejectionSymbol] = (error) => {
//   console.log(yellow, `rejection ${error.message}`);
// };

emitter.emit('something');

setInterval(() => {}, 1000);
