import { BaseRepository } from './BaseRepository';

export default class BoardsRepository extends BaseRepository {

    constructor(requestSchema, db, collection) {
        super(requestSchema, db, collection);
        this.db = db;
    }

    async read(query) {
        return await this.model.findOne({ assignment: query.assignment });
    }

    async update(query) {
        return await this.model.findOneAndUpdate(
            { assignment: query.assignment},
            { columns: query.columns, columnOrder: query.columnOrder },
            { new: true, upsert: true }
        );
    }

    async destroy(query) {
        let { _id } = query;
        return await this.model.findByIdAndRemove(_id);
    }
}
