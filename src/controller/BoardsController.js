import { BoardsSchema } from '../schemas/BoardsSchema';
import { Presenter } from '../usecase/crudBoards/Presenter';
import { Interactor } from '../usecase/crudBoards/Interactor';
import BoardsRepository from '../repository/BoardsRepository';

export class BoardsController {

    init(server, router) {
        this.boardsRepository = new BoardsRepository(BoardsSchema, server.db, 'boards');

        router.get('/boards/read', this.readAction.bind(this));
        router.post('/boards/update', this.updateAction.bind(this));
        router.get('/boards/destroy', this.destroyAction.bind(this));
        server.use(router);
    }

    readAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.boardsRepository);
        return interactor.run('read');
    }

    updateAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.boardsRepository);
        return interactor.run('update');
    }

    destroyAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.boardsRepository);
        return interactor.run('destroy');
    }
}
