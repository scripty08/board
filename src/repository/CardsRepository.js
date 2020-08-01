import { BaseRepository } from '../base/BaseRepository';
import { Logger } from '@scripty/logger';

export default class CardsRepository extends BaseRepository {

    constructor(requestSchema, db, collection) {
        super(requestSchema, db, collection);
        this.db = db;
    }

    async find(query) {
        try {
            return await this.model.find({
                '_id': { $in: query._ids}
            });
        } catch (e) {
            Logger.error(e);
        }

    }

    async read(query) {
        try {
            return await this.model.find(query);
        } catch (e) {
            Logger.error(e);
        }
    }

    async update(query) {
        if (!query._id) {
            query._id = new this.db.mongo.ObjectID();
        }
        return await this.model.findOneAndUpdate(
            { _id: query._id},
            { type: query.type, content: query.content },
            { new: true, upsert: true }
        );
    }

    async destroy(query) {
        let { _id } = query;
        return await this.model.findByIdAndRemove(_id);
    }
}
