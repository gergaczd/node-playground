/* Description:
When you use `for await` and `on` for event processing make sure that inside the loop
you are not waiting with await because your service can handle only one request at a time in this case

Note: the setTimeout as a Promise is relatively new API, so make sure that you are using the correct node.js version (since v15)
 */
import { createServer } from 'http';
import { on } from 'events';
import { setTimeout } from 'timers/promises';

const bonusServer = createServer().listen(8888);

/*warning!
  do not use this pattern for service -> it handles only 1 request at a time
*/
for await (const [request, response] of on(bonusServer, 'request')) {
  console.log('request got');
  await setTimeout(1000)
    .then(() => console.log('after timer'));
  response.end('test');
}

//npx autocannon --connections 2 --amount 10 http://localhost:8888
