import mongoose from 'mongoose';

export enum Committee {
    GENERAL = 'general',
    TECH = 'tech',
    DESIGN = 'design',
}

export interface IRespondent {
    name: string;
    andrewId: string;
    preference: string[];
}

const respondentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    andrewId: {
        type: String,
        required: true,
    },
    preference: {
        type: [String],
        enum: Committee,
        required: true,
    },
});

const Respondent = mongoose.model('Respondent', respondentSchema);

export default Respondent;
