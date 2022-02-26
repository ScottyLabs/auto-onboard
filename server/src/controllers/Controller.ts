import { Request, Response } from 'express';
import Respondent, { IRespondent, Committee } from '../models/Respondent';
import axios from 'axios';
import fsPromises from 'fs/promises';
import FormData from 'form-data';

const EMAIL_TEMPLATE = 'src/email/shell.html';

const MAILGUN_ENDPOINT =`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;

const SENDER = process.env.MAILGUN_SENDER;
const API_KEY = process.env.MAILGUN_API_KEY;

export const submitForm = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const respondent = validateBody(req.body);
        await (new Respondent(respondent)).save();
        await sendEmail(respondent);
        res.send('Success!');
    } catch (e) {
        // console.error(e);
        res.status(400).send(e);
    }
};

const validateBody = (body: any): IRespondent => {
    if (typeof body.name !== 'string' || body.name.length === 0)
        throw 'Name length needs to be a string with positive length';

    if (
        typeof body.andrew !== 'string' ||
        !body.andrew.match(/^[a-z0-9]{3,8}$/gi)
    )
        throw 'Andrew ID is not valid';

    if (
        !Array.isArray(body.committeePref) ||
        body.committeePref.length === 0 ||
        body.committeePref.filter(
            (pref: any) => !Object.values(Committee).includes(pref)
        ).length > 0
    )
        throw 'Committee preference is not valid';

    return {
        name: body.name,
        andrewId: body.andrew.toLowerCase(),
        preference: body.committeePref,
        submissionTime: Date.now(),
    };
};

const sendEmail = async (respondent: IRespondent) => {  
    const template = await fsPromises.readFile(EMAIL_TEMPLATE, 'utf8');
    const html = template.replace('{name}', respondent.name);

    const data = new FormData();
    // because postman doesn't take JSON for some reason!!!
    data.append('from', SENDER);
    data.append('to', `${respondent.andrewId}@andrew.cmu.edu`);
    data.append('subject', 'Welcome to ScottyLabs!');
    data.append('html', html);

    return axios({
        method: 'POST',
        url: MAILGUN_ENDPOINT,
        data,
        headers: data.getHeaders(),
        auth:{
            username: 'api',
            password: API_KEY,
        } 
    });
}

