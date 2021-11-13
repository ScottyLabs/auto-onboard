import express from 'express';
import { submitForm } from '../controllers/Controller';

const router = express.Router();

router.get('/', (_, res) => {
    res.send('hello');
});

router.post('/', (req, res) => {
    submitForm(req, res);
});

export default router;
