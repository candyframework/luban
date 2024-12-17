import CandyJs from '../../src/mod.ts';
import Application from '../../src/web/Application.ts';

const app = new Application({
    id: 'validator',
    appPath: Deno.cwd() + '/app',
});
const cj = new CandyJs(app);

cj.listen({
    port: 2333,
});
