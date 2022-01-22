import express from 'express';
import { submitForm } from '../controllers/Controller';

const router = express.Router();

router.post('/', (req, res) => {
    submitForm(req, res);
});

export default router;
