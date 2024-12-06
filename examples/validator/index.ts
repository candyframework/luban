import CandyJs from '../../mod.ts';
import Application from '../../web/Application.ts';

const app = new Application({
    id: 'validator',
    appPath: Deno.cwd() + '/app',
});
const cj = new CandyJs(app);

cj.listen({
    port: 2333,
});
