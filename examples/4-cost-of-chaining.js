/* Description:
Using unnecessary then chains can slow your application. There is not
a big difference, but if it exists in a critical path in your application
it can be painful. For example using this pattern in a service middleware
which handles lot of requests in the same time.
This pattern actually used such location:
https://github.com/villadora/express-http-proxy/blob/master/index.js
 */
import { yellow } from '../config.js';

const toMB = (bytes) => bytes/1024/1024;
const measure = () => {
  const now = Date.now();
  const { heapUsed } = process.memoryUsage();
  return { now, heapUsed };
};

const execute = async () => {
  return Promise.resolve()
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    // .then(() => {})
    .then(() => 2);
}


const start = measure();
for(const x of Array.from(Array(1_000_000))) {
  await execute();
}
const end = measure();

console.log(yellow, `Time: ${end.now - start.now} ms`);
console.log(yellow, `Memory: ${toMB(end.heapUsed - start.heapUsed)} MB`);
