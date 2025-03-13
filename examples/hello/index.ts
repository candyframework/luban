import type { JSONCompatible } from '../../src/core/Types.ts';
import CandyJs from '../../src/mod.ts';
import Application from '../../src/web/Application.ts';
import View from '../../src/web/View.ts';

class MyView extends View {
    protected override async renderFile<T>(file: string, _parameters: JSONCompatible<T> | null): Promise<string> {
        const html = await Deno.readTextFile(file);
        return html;
    }
}

const app = new Application({
    id: 'hello',
    debug: true,
    appPath: Deno.cwd() + '/app',
    defaultView: new MyView(),
});
const cj = new CandyJs(app);

cj.listen({
    port: 2333,
});
