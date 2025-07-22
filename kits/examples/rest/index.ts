import type HttpRequest from '../../http/HttpRequest.ts';
import Application from '../../rest/Application.ts';
import Main from '../../mod.ts';
import HttpResponse from '../../http/HttpResponse.ts';
import Hook from '../../core/Hook.ts';

import AbstractInterceptor from '../../core/AbstractInterceptor.ts';
class MyInterceptor extends AbstractInterceptor {
    public async intercept(_request: HttpRequest) {
        return HttpResponse.fromText('The system is under maintenance.');
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
    // interceptor: new MyInterceptor(),
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
