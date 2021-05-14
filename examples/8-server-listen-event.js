/* Description:
  EventEmitters emits the event in sync way, but we can make it async when called in
  process.nextTick callback, this way the user has time to subscribe to the event and even
  run any sync code after calling the method that emits the event.
  In our case here this method is `listenAsync`. The event loop runs the process.nextTick callbacks
  after the call stack is empty, you can check this after running the code.
  This way makes it possible to emit events from the constructor as well.
  Scheduling these emits with setImmediate risk the possibility that our app
  already receiving events.
 */
import { createServer } from 'net';
import { EventEmitter } from 'events';
import { yellow } from '../config.js';

class Server extends EventEmitter {
  constructor() {
    super();
    this.emit('created');
  }

  listen(port) {
    this.emit('listening', 'sync emit');
    console.log('');
    console.trace('sync emit');
    return this;
  }

  listenImmediate(port) {//can cause request dropping
    setImmediate(() => {
      this.emit('listening', 'immediate');
    })
    return this;
  }

  listenAsync(port) {
    process.nextTick(() => {
      this.emit('listening', 'async emit')
      console.log('');
      console.trace('async emit');
    });
    return this;
  }
}

const createServerBad = () => new Server();

// const server = createServer(() => {}).listen(3333);
const server = createServerBad(() => {})
  .listen(3333)
  .listenAsync(3333);

server.on('listening', (from) => {
  console.log('');
  console.log(yellow, `listening event from ${from}`);
});
