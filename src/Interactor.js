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
                    const update = await this.request.body.map(async (rec) => {
                        return await this.repository.update(rec);
                    });
                    return await this.presenter.present({ code: UPDATE_RESPONSE, response: await Promise.all(update) });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }

            case 'destroy':
                try {
                    const destroy = await this.request.body.map(async (rec) => {
                        return await this.repository.destroy(rec);
                    });
                    return await this.presenter.present({ code: DESTROY_RESPONSE, response: await Promise.all(destroy) });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }
        }
    };
}
