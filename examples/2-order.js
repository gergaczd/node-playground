/* Description:
Try execute the example with package.json set to `type: commonjs` and
`type: module`. These two runs will produce different results, because
in the later one runs in a different phase in the event loop and also
with a different call-stack. process.nextTick only runs when the call-stack
is empty. In the ESM version, it is not empty, because in the back it runs
similarly when the whole file is inside an fs.readFile(...).

Promises are executed sync and resolved async before any other I/O events
*/

new Promise(function (resolve) {
  console.log('new promise')
  resolve()
}).then(() => console.log('then 1'))
  .then(() => console.log('then 2'));

process.nextTick(() => {
  console.log('nextTick')
})

console.log('--------------');
console.trace();
console.log('--------------');
