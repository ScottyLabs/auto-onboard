import express from 'express';
import submitRouter from './submit';

const router = express.Router();

router.use('/submit', submitRouter);

export default router;
