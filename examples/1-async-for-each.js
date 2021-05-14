/* Description:
  In case of an callback API that does not support
  the async callback function will throw an unhandledRejection
  error which will cause the process to exit
  (in recent node.js versions by default).
 */

process.on('unhandledRejection', (error) => {
  console.log('unhandled rejection: ', error.message);
});

try {
  [1,2,3].forEach(async () => {
    throw new Error('from forEach');
  });
} catch(error) {
  console.log('caught', error.message);
}
