## An object-oriented efficient MVC and RESTful framework

This project is rewritten based on the architecture of Project [CandyJs](https://github.com/candyframework)

## Quick start

CandyJs application start with an entry file

```typescript
import type HttpRequest from '../../http/HttpRequest.ts';
import Application from '../../rest/Application.ts';
import Main from '../../mod.ts';

const app = new Application({
    id: 'rest',
    debug: true,
});

app.get('/', async (_request: HttpRequest) => {
    return new Response('Hello, world!');
});

app.get('/user/{id}', async (_request: HttpRequest, parameters: any) => {
    return new Response('User ' + parameters.id);
});

const main = new Main(app);
main.listen({
    port: 2333,
});
```
