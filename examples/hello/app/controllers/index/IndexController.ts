import type HttpRequest from '../../../../../http/HttpRequest.ts';
import HttpResponse from '../../../../../http/HttpResponse.ts';
import Controller from '../../../../../web/Controller.ts';

export default class IndexController extends Controller {
    public override async run(_request: HttpRequest): Promise<Response> {
        const view = await this.getView();
        const result = await view.render('index');

        return HttpResponse.fromHTML(result);
    }
}
