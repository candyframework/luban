import type HttpRequest from '../../../../../http/HttpRequest.ts';
import HttpResponse from '../../../../../http/HttpResponse.ts';
import Controller from '../../../../../web/Controller.ts';

export default class IndexController extends Controller {
    public override async run(_request: HttpRequest): Promise<HttpResponse> {
        const html = await this.render('index');

        return HttpResponse.fromHTML(html);
    }
}
