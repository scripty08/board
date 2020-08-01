import { Logger } from '@scripty/logger/src/Logger';
import {
    READ_RESPONSE,
    UPDATE_RESPONSE,
    DESTROY_RESPONSE,
    ERROR_RESPONSE,
} from '../../base/BaseConstants';

export class Presenter {
    constructor(response) {
        this.response = response;
    }

    async present(interactorResponse) {
        const { code, response, message } = interactorResponse;

        switch (code) {
            case READ_RESPONSE:
                this.response.send({
                    entries: response
                });
                break;
            case UPDATE_RESPONSE:
                this.response.send({
                    entries: [response]
                });
                break;
            case DESTROY_RESPONSE:
                this.response.send({
                    destroyed: [response]
                });
                break;
            case ERROR_RESPONSE:
                Logger.error(message);
                this.response.send({ message: message});
                break;
        }
    };
}
