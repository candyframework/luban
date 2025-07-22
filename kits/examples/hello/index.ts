import type { JSONCompatible } from '../../core/Types.ts';
import Main from '../../mod.ts';
import Application from '../../web/Application.ts';
import View from '../../web/View.ts';

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
const cj = new Main(app);

cj.listen({
    port: 2333,
});
