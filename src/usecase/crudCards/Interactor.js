import {
    READ_RESPONSE,
    UPDATE_RESPONSE,
    DESTROY_RESPONSE,
    ERROR_RESPONSE,
} from '../../base/BaseConstants';

export class Interactor {
    constructor(request, presenter, cardsRepository) {
        this.request = request;
        this.presenter = presenter;
        this.cardsRepository = cardsRepository;
    }

    async run(command) {

        switch (command) {
            case 'find':
                try {
                    const cards = await this.cardsRepository.find(this.request.body);
                    return await this.presenter.present({ code: READ_RESPONSE, response: cards });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }
            case 'read':
                try {
                const cards = await this.cardsRepository.read(this.request.query);
                return await this.presenter.present({ code: READ_RESPONSE, response: cards });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }

            case 'update':
                try {

                    const updatedCards = this.request.body.cards.map(async (card) => {
                         return await this.cardsRepository.update(card);
                    })

                    return await this.presenter.present({ code: UPDATE_RESPONSE, response: Promise.all(updatedCards) });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }

            case 'destroy':
                try {
                    const destroyedCards = await this.cardsRepository.destroy(this.request.body);
                    return await this.presenter.present({ code: DESTROY_RESPONSE, response: destroyedCards });
                } catch (e) {
                    return await this.presenter.present({ code: ERROR_RESPONSE, message: e });
                }
        }
    };
}
