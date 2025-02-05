import type HttpRequest from '../../src/http/HttpRequest.ts';
import Application from '../../src/rest/Application.ts';
import Main from '../../src/mod.ts';
import HttpResponse from '../../src/http/HttpResponse.ts';
import Hook from '../../src/core/Hook.ts';

import AbstractInterceptor from '../../src/core/AbstractInterceptor.ts';
class MyInterceptor extends AbstractInterceptor {
    public async run(_request: HttpRequest) {
        return HttpResponse.fromText('123The system is under maintenance.');
    }
}

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
    // interceptor: MyInterceptor,
});

app.get('/', async (_request: HttpRequest) => {
    return HttpResponse.fromText('Hello, world!');
});
app.get('/post', async (_request: HttpRequest) => {
    return HttpResponse.fromText('Post list');
});
app.get('/post/{id}', async (_request: HttpRequest, parameters: any) => {
    return HttpResponse.fromText('Post id is: ' + parameters.id);
});

const main = new Main(app);
main.listen({
    port: 2333,
});
