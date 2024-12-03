import Controller from '../../../../../web/Controller.ts';

export default class IndexController extends Controller {
    public override async run(_request: Request): Promise<Response> {
        return new Response('hello index');
    }
}
