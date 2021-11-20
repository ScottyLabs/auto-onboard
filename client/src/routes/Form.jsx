import axios from 'axios';
import '../App.css';
import { Helmet } from 'react-helmet';
import EmailLink from '../components/EmailLink';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    ListItemText,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';

const pref = {
    tech: 'Tech',
    design: 'Design',
    general: 'General Planning',
};

const responseStates = {
    NONE: 0,
    LOADING: 1,
    ERROR: -1,
    SUCCESS: 2,
};

const BACKEND = 'http://localhost:3000';
const EMAIL = 'tech@scottylabs.org';

function Form() {
    const [name, setName] = React.useState();
    const [nameError, setNameError] = React.useState(false);

    const [andrew, setAndrew] = React.useState();
    const [andrewError, setAndrewError] = React.useState(false);

    const [committeePref, setCommitteePref] = React.useState([]);
    const [prefError, setPrefError] = React.useState(false);

    const [responseStatus, setResponseStatus] = React.useState(
        responseStates.NONE
    );

    const validateName = (name) => {
        const hasError = (name || '').length === 0;
        setNameError(hasError);
        return !hasError;
    };

    const validateAndrew = (andrew) => {
        const hasError = !(andrew || '').match(/^[a-z0-9]{3,8}$/gi);
        setAndrewError(hasError);
        return !hasError;
    };

    const onNameChange = (event) => {
        setName(event.target.value);
        validateName(event.target.value);
    };

    const onAndrewChange = (event) => {
        setAndrew(event.target.value);
        validateAndrew(event.target.value);
    };

    const onCommitteeChange = (event) => {
        const value = event.target.value;
        const newPref = typeof value === 'string' ? value.split(', ') : value;
        setCommitteePref(newPref);
        validateCommittee(newPref);
    };

    const validateCommittee = (committee) => {
        const hasError = committee.length === 0;
        setPrefError(hasError);
        return !hasError;
    };

    const onSubmit = async () => {
        if (
            validateName(name) &&
            validateAndrew(andrew) &&
            validateCommittee(committeePref)
        ) {
            try {
                setResponseStatus(responseStates.LOADING);
                await axios.post(`${BACKEND}/submit`, {
                    name,
                    andrew: (andrew || '').toLowerCase(),
                    committeePref,
                });
                setResponseStatus(responseStates.SUCCESS);
            } catch (e) {
                setResponseStatus(responseStates.ERROR);
            }
        }
    };

    const handleDialogClose = () => {
        setResponseStatus(responseStates.NONE);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>ScottyLabs Auto-Onboard</title>
            </Helmet>
            <FormControl component="form" fullWidth>
                <Grid container spacing={2} marginTop={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            ScottyLabs Onboarding
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="Name"
                            fullWidth
                            required
                            value={name || ''}
                            onChange={onNameChange}
                            error={nameError}
                            helperText={
                                nameError ? 'Name cannot be blank.' : undefined
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="Andrew ID"
                            fullWidth
                            required
                            value={andrew || ''}
                            onChange={onAndrewChange}
                            error={andrewError}
                            helperText={
                                andrewError
                                    ? 'Andrew ID must be valid.'
                                    : undefined
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            variant="outlined"
                            label="Committee Preferences"
                            value={committeePref}
                            onChange={onCommitteeChange}
                            fullWidth
                            required
                            error={prefError}
                            helperText={
                                prefError
                                    ? 'You must select a committee'
                                    : 'You may select multiple committees'
                            }
                            inputProps={{
                                multiple: true,
                                renderValue: (s) =>
                                    s.map((x) => pref[x]).join(', '),
                            }}
                        >
                            {Object.entries(pref).map(([key, val]) => (
                                <MenuItem key={key} value={key}>
                                    <Checkbox
                                        checked={
                                            committeePref.indexOf(key) > -1
                                        }
                                    />
                                    <ListItemText primary={val} />
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            By submitting this form, you consent to be added to
                            the ScottyLabs mailing list.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton
                            loading={responseStatus === responseStates.LOADING}
                            variant="contained"
                            onClick={onSubmit}
                            fullWidth
                            style={{
                                borderRadius: '2.5rem',
                                marginTop: '2rem',
                                background:
                                    'linear-gradient(89.03deg, #1437A8 0%, #C8315B 100%)',
                            }}
                        >
                            Submit
                        </LoadingButton>
                    </Grid>
                </Grid>
            </FormControl>
            <Dialog
                open={responseStatus === responseStates.ERROR}
                onClose={handleDialogClose}
            >
                <DialogTitle>Error!</DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2}>
                        We could not connect the ScottyLabs server. Check your
                        internet connection, and try again.
                    </DialogContentText>
                    <DialogContentText>
                        If problems persist, please let us know at{' '}
                        <EmailLink>{EMAIL}</EmailLink>.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={responseStatus === responseStates.SUCCESS}
                onClose={handleDialogClose}
            >
                <DialogTitle>Success!</DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2}>
                        We've received your application. You will receive a
                        confirmation email shortly, together with a link to our
                        Slack channel. You will also be added to our mailing
                        list.
                    </DialogContentText>
                    <DialogContentText>
                        In the meantime, if you have any questions, please let
                        us know on Slack, or contact us at{' '}
                        <EmailLink>{EMAIL}</EmailLink>.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Continue</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default Form;
