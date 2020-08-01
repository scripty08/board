import {
    READ_RESPONSE,
    UPDATE_RESPONSE,
    DESTROY_RESPONSE,
    ERROR_RESPONSE,
} from '../../base/BaseConstants';

export class Interactor {
    constructor(request, presenter, boardsRepository) {
        this.request = request;
        this.presenter = presenter;
        this.boardsRepository = boardsRepository;
    }

    async run(command) {

        switch (command) {
            case 'read':

                try {
                const boards = await this.boardsRepository.read(this.request.query);
                return await this.presenter.present({ code: READ_RESPONSE, response: boards });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }

            case 'update':
                try {
                    const updatedBoards = await this.boardsRepository.update(this.request.body);
                    return await this.presenter.present({ code: UPDATE_RESPONSE, response: updatedBoards });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }

            case 'destroy':
                try {
                    const destroyedBoards = await this.boardsRepository.destroy(this.request.body);
                    return await this.presenter.present({ code: DESTROY_RESPONSE, response: destroyedBoards });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }
        }
    };
}
