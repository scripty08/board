import { Server, IndexController } from '@scripty/server';
import { Logger } from '@scripty/logger';
import { mongo } from '@scripty/mongo';
import { BoardsController }  from '../src';
import { CardsController }  from '../src';
import dotenv from 'dotenv'

const init = async () => {
    Logger.info('server is initializing');
    dotenv.config();

    const server = new Server();

    const mongoConfig = {
        server: process.env.server,
        db: process.env.db,
        user: process.env.user,
        password: process.env.password,
        port: process.env.port || 27017,
        options: {
            "encrypt": true
        }
    }

    const mongoose = await mongo(mongoConfig);

    await server.setDatabase(mongoose);
    await server.addController(new BoardsController());
    await server.addController(new CardsController());
    await server.addController(new IndexController({ title: 'board' }));


    server.start(3011);
    Logger.info('Server startet: : http://localhost:3011')
};

init().catch((err) => {
    console.error(err.message);
});
