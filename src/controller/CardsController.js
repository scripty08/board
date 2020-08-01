import { CardsSchema } from '../schemas/CardsSchema';
import { Presenter } from '../usecase/crudCards/Presenter';
import { Interactor } from '../usecase/crudCards/Interactor';
import CardsRepository from '../repository/CardsRepository';

export class CardsController {

    init(server, router) {
        console.log('asdf', '  ---------------------- ');
        this.cardsRepository = new CardsRepository(CardsSchema, server.db, 'cards');

        router.get('/cards/read', this.readAction.bind(this));
        router.post('/cards/update', this.updateAction.bind(this));
        router.get('/cards/destroy', this.destroyAction.bind(this));
        server.use(router);
    }

    readAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.cardsRepository);
        return interactor.run('read');
    }

    updateAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.cardsRepository);
        return interactor.run('update');
    }

    destroyAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.cardsRepository);
        return interactor.run('destroy');
    }
}
