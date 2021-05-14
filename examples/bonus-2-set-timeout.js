/* Description:
Run the code with ESM and commonjs (package.json module: commonjs|module).
Run it multiple times! When running the example in commonjs the outcome could be different between runs,
because the code run before the timers so the setTimeout callback could run first (but this can depend on how busy is our process
or simply our event loop decide to wait a bit before executing it)
When running the example in module it has a predictable outcome, because we deferring the run to the poll
phase, and after the poll phase the setImmediate callback runs.
*/


setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
