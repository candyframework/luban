## An object-oriented efficient MVC and RESTful framework

This project is rewritten based on the architecture of Project [CandyJs](https://github.com/candyframework)

## Quick start

CandyJs application start with an entry file

```typescript
import type HttpRequest from '@candy/framework/http/HttpRequest';
import Main from '@candy/framework';
import Application from '@candy/framework/rest/Application';
import HttpResponse from '@candy/framework/http/HttpResponse';
import Hook from '@candy/framework/core/Hook';

Hook.use(async (_req: Request, hook: Hook) => {
    console.log('hook1 run');
    return await hook.next();
});
Hook.use(async (_req: Request, hook: Hook) => {
    console.log('hook2 run');
    return await hook.next();
});

const app = new Application({
    id: 'rest',
    debug: true,
});

app.get('/', async (_request: HttpRequest) => {
    return HttpResponse.fromText('Hello, world!');
});

app.get('/user/{id}', async (_request: HttpRequest, parameters: any) => {
    return HttpResponse.fromText('User ' + parameters.id);
});

const main = new Main(app);
main.listen({
    port: 2333,
});
```
