import { BaseRepository } from './BaseRepository';

export default class CardsRepository extends BaseRepository {

    constructor(requestSchema, db, collection) {
        super(requestSchema, db, collection);
        this.db = db;
    }

    async read(ids) {
        try {
            let data = await this.model.find({
                '_id': { $in: ids}
            });
            return data;
        } catch (e) {
            console.log(e, '  e---------------------- ');
        }

    }

    async update(query) {
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