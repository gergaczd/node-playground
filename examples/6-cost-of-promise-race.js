/* Description:
When we are using Promise.race, we often forget about handling the not yet fulfilled part of the array.
In this example the badRacing method mimics a common "pattern" where we want to give the other parts a maximum time
while it is ok to finish. This can consume more memory and time in execution when these are not handled properly, more specifically
in our case here the process will not finish, so with such cases we can easily fail when handling graceful shutdowns.
The goodRacing method covers this scenario, it uses AbortController which can be familiar from the Browser API (a relatively new API in node.js),
so using this approach we can meet the need when it comes for graceful shutdown for example.

Currently you can abort these APIs:
- child_process.exec
- child_process.execFile
- child_process.fork
- child_process.spawn
- dgram.createSocket
- events.on
- events.once
- fs.readFile
- fs.watch
- fs.writeFile
- http.request
- https.request
- http2Session.request
- The promisified variants of setImmediate and setTimeout
 */

import { setTimeout } from 'timers/promises';
import { yellow } from '../config.js';

const badRacing = async () => {
  return Promise.race([
    setTimeout(20000),
    setTimeout(10).then(() => 'simulate request')
  ]);
};

const goodRacing = async () => {
  const ac = new AbortController();
  return Promise.race([
    setTimeout(20000, '', { signal: ac.signal }),
    setTimeout(10).then(() => {
      ac.abort();
      return 'simulate request';
    })
  ]);
};

for(const x of new Array(100)) {
  await badRacing();
  // await goodRacing();
}

console.log(yellow, 'finished work');

setInterval(() => console.log('running'), 2000).unref();
