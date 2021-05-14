/* Description:
If we want to execute lot of async stuff in the same time (like Promise.all), it can cause unresponsiveness (for example the event loop
is too busy to resolve and process the promises) and memory issue as well.
A good approach is to use some helper library where we can manage concurrency, so only a limited number of
promises can run in the same time (p-* libraries);
 */

import { createServer } from 'http';
import { setTimeout } from 'timers/promises'; //only in node 15, experimental!!!!!!
import pMap from "p-map";


async function handler() {
  let data = '';
  async function fetch(i) {
    data += `CALL[${i}]\n`;
    const val = Buffer.allocUnsafe(16 * 1024 * 1024);

    await setTimeout(20);

    data += `RES[${i}]\n`;
  }

  const items = Object.keys(Array.from(Array(100)));


  // await Promise.all(items.map(fetch));
  // await pMap(items, fetch, {concurrency: 2});
  // for (let i = 0; i < items.length; i++) {
  //   await fetch(i);
  // }

  return data;
}

const server = createServer((req, res) => {
  handler().then((body) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(body);
  }).catch((err) => {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  })
})

printArrayBufferMemory();
setInterval(printArrayBufferMemory, 1000);

function printArrayBufferMemory () {
  const mem = process.memoryUsage().arrayBuffers
  console.log(`ArrayBuffers memory ${Math.round(mem / 1024 / 1024)} MB`)
}

server.listen(3000);


//npx autocannon -c 100 -d 5 localhost:3000
