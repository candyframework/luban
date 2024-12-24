import type HttpRequest from '../../src/http/HttpRequest.ts';
import Application from '../../src/rest/Application.ts';
import Main from '../../src/mod.ts';
import HttpResponse from '../../src/http/HttpResponse.ts';

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
