import {
    READ_RESPONSE,
    UPDATE_RESPONSE,
    DESTROY_RESPONSE,
    ERROR_RESPONSE,
} from './Constants';

export class Interactor {
    constructor(request, presenter, boardsRepository, cardsRepository) {
        this.request = request;
        this.presenter = presenter;
        this.boardsRepository = boardsRepository;
        this.cardsRepository = cardsRepository;
    }

    async run(command) {

        switch (command) {
            case 'read':

                try {
                const boards = await this.boardsRepository.read(this.request.query);
                const columns = boards.columns;
                let ids = [];

                Object.keys(columns).forEach((key) => {
                    columns[key].taskIds.map((rec) => {
                        ids.push(rec);
                    });
                });

                const cards = await this.cardsRepository.read(ids);

                let result = {};

                cards.forEach((rec) => {
                    result[rec._id] = rec
                });

                boards.tasks = result;

                return await this.presenter.present({ code: READ_RESPONSE, response: boards });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }

            case 'update':
                try {

                    const updatedBoards = await this.boardsRepository.update(this.request.body);

                    const tasks = this.request.body.tasks;
                    let bla = [];
                    let query;

                    Object.keys(tasks).forEach(async (key) => {
                        query = {
                            _id: key,
                            ...tasks[key]
                        };

                        console.log(query, ' query ---------------------- ');
                        await this.cardsRepository.update(query);
                    });






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
