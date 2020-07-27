import {
    READ_RESPONSE,
    UPDATE_RESPONSE,
    DESTROY_RESPONSE,
    ERROR_RESPONSE,
} from './Constants';

export class Interactor {
    constructor(request, presenter, repository) {
        this.request = request;
        this.presenter = presenter;
        this.repository = repository;
    }

    async run(command) {

        switch (command) {
            case 'read':
                const read = await this.repository.read(this.request.query);
                try {
                    return await this.presenter.present({ code: READ_RESPONSE, response: read });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }

            case 'update':
                try {
                    const update = await this.repository.update(this.request.body);
                    return await this.presenter.present({ code: UPDATE_RESPONSE, response: update });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }

            case 'destroy':
                try {
                    const destroy = await this.repository.destroy(this.request.body);
                    return await this.presenter.present({ code: DESTROY_RESPONSE, response: destroy });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }
        }
    };
}
