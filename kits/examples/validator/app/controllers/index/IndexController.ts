import type HttpRequest from '../../../../../http/HttpRequest.ts';
import type { Rule } from '../../../../../model/IModel.ts';
import HttpResponse from '../../../../../http/HttpResponse.ts';
import Model from '../../../../../model/Model.ts';
import Controller from '../../../../../web/Controller.ts';
import StringValidator from '../../../../../model/validators/StringValidator.ts';
import RequiredValidator from '../../../../../model/validators/RequiredValidator.ts';

class UserModel extends Model {
    public override attributes = {
        'name': '',
        'age': 0,
    };

    public override rules(): Rule[] {
        return [
            {
                validator: {
                    classType: StringValidator,
                    minLength: 1,
                    maxLength: 5,
                },
                attributes: ['name'],
                messages: ['name length should be between 1 and 5'],
            },
            {
                validator: {
                    classType: RequiredValidator,
                },
                attributes: ['address'],
                messages: ['address is required'],
            },
        ];
    }
}

export default class IndexController extends Controller {
    public override async run(request: HttpRequest): Promise<HttpResponse> {
        const address = request.getQueryString('address');

        const model = new UserModel();
        model.setAttributes({
            name: 'zhangsan',
            age: 18,
            address: address,
        });

        model.validate();
        const msg = model.getErrors();

        return HttpResponse.fromJson(msg);
    }
}
