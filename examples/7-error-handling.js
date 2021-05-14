/* Description:
errorMonitor only monitors the emitted error and does not catches it,
so does not prevent app crash. This is added in: v13.6.0, v12.17.0
*/

import { EventEmitter, errorMonitor } from 'events';

const emitter = new EventEmitter();

emitter.on('error', (error) => {
  console.log('error handling', error.message);
});

emitter.on(errorMonitor, (error) => {
  console.log('only monitoring', error.message);
});

emitter.emit('error', new Error('failure'));
