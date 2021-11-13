import express from 'express';
import mongoose from 'mongoose';

import router from './src/routes';

const PORT = 3000;

const MONGODB_URI =
    process.env.MONGO || 'mongodb://localhost:27017/auto-onboard';

const ENV = process.env.NODE_ENV || 'development';

async function main() {
    await mongoose.connect(MONGODB_URI, {
        autoIndex: ENV == 'development',
    });

    const app = express();
    app.use(express.json());

    app.use('/', router);

    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    });
}

main().catch((err) => console.log(err));
