import { Presenter } from './Presenter';
import { Schema } from './Schema';
import { Interactor } from './Interactor';
import { Repository } from './Repository';

export default class Controller {

    init(server, router) {

        this.repository = new Repository(Schema, server.db, 'boards');

        router.get('/boards/read', this.readAction.bind(this));
        router.post('/boards/update', this.updateAction.bind(this));
        router.get('/boards/destroy', this.destroyAction.bind(this));
        server.use(router);
    }

    readAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.repository);
        return interactor.run('read');
    }

    updateAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.repository);
        return interactor.run('update');
    }

    destroyAction(req, res) {
        const presenter = new Presenter(res);
        const interactor = new Interactor(req, presenter, this.repository);
        return interactor.run('destroy');
    }
}
