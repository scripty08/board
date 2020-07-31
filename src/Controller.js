import { Presenter } from './Presenter';
import { BoardsSchema, CardsSchema } from './Schema';
import { Interactor } from './Interactor';
import BoardsRepository from './BoardsRepository';
import CardsRepository from './CardsRepository';

export default class Controller {

    init(server, router) {

        this.boardsRepository = new BoardsRepository(BoardsSchema, server.db, 'boards');
        this.cardsRepository = new CardsRepository(CardsSchema, server.db, 'cards');

        router.get('/boards/read', this.readAction.bind(this));
        router.post('/boards/update', this.updateAction.bind(this));
        router.get('/boards/destroy', this.destroyAction.bind(this));
        server.use(router);
    }

    readAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.boardsRepository, this.cardsRepository);
        return interactor.run('read');
    }

    updateAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.boardsRepository, this.cardsRepository);
        return interactor.run('update');
    }

    destroyAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.boardsRepository, this.cardsRepository);
        return interactor.run('destroy');
    }
}
