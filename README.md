## An object-oriented efficient MVC and RESTful framework

This project is rewritten based on the architecture of Project [CandyJs](https://github.com/candyframework)

## Quick start

CandyJs application start with an entry file

```typescript
import Main from '@candy/framework';
import Application from '@candy/framework/web/Application.ts';

const app = new Application({
    id: 'hello',
    appPath: Deno.cwd() + '/app',
});
const main = new Main(app);

main.listen({
    port: 2333,
});
```
