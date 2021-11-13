import { Request, Response } from 'express';
import Respondent, { IRespondent, Committee } from '../models/Respondent';

export const submitForm = async (
    req: Request,
    res: Response
): Promise<void> => {
    console.log('post received');
    console.log(req.body);
    try {
        const respondent = new Respondent(validateBody(req.body));
        await respondent.save();
        res.send(await Respondent.find());
    } catch (e) {
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
    };
};
