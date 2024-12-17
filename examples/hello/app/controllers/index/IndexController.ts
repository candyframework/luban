import type HttpRequest from '../../../../../src/http/HttpRequest.ts';
import HttpResponse from '../../../../../src/http/HttpResponse.ts';
import Controller from '../../../../../src/web/Controller.ts';

export default class IndexController extends Controller {
    public override async run(_request: HttpRequest): Promise<Response> {
        const html = await this.render('index');

        return HttpResponse.fromHTML(html);
    }
}
