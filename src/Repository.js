import { BaseRepository } from './BaseRepository';

export class Repository extends BaseRepository {

    constructor(requestSchema, db, collection) {
        super(requestSchema, db, collection);
        this.db = db;
    }

    async read(query) {
        return await this.model.findOne({ assignment: query.assignment });
    }

    async update(query) {
        return await this.model.findOneAndUpdate(
            { assignment: query.assignment },
            { placements: query.placements },
            { new: true }
        );
    }

    async destroy(query) {
        let { _id } = query;
        return await this.model.findByIdAndRemove(_id);
    }
}
