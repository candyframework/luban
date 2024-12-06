import type HttpRequest from '../../../../../http/HttpRequest.ts';
import HttpResponse from '../../../../../http/HttpResponse.ts';
import Controller from '../../../../../web/Controller.ts';

export default class IndexController extends Controller {
    public override async run(_request: HttpRequest): Promise<Response> {
        const result = await this.getView().render('index');

        return HttpResponse.fromHTML(result);
    }
}
