import axios from 'axios';
import '../App.css';
import {
    Button,
    Checkbox,
    FormControl,
    Grid,
    ListItemText,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';

const pref = {
    tech: 'Tech',
    design: 'Design',
    general: 'General Planning',
};

const BACKEND = 'http://localhost:3000';

function Form() {
    const [name, setName] = React.useState();
    const [nameError, setNameError] = React.useState(false);

    const [andrew, setAndrew] = React.useState();
    const [andrewError, setAndrewError] = React.useState(false);

    const [committeePref, setCommitteePref] = React.useState([]);
    const [prefError, setPrefError] = React.useState(false);

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
                const response = await axios.post(`${BACKEND}/submit`, {
                    name,
                    andrew: (andrew || '').toLowerCase(),
                    committeePref,
                });
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <FormControl component="form" fullWidth>
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">ScottyLabs Onboarding</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Name"
                        fullWidth
                        required
                        value={name}
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
                        value={andrew}
                        onChange={onAndrewChange}
                        error={andrewError}
                        helperText={
                            andrewError ? 'Andrew ID must be valid.' : undefined
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
                                    checked={committeePref.indexOf(key) > -1}
                                />
                                <ListItemText primary={val} />
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        By submitting this form, you will be added to the
                        ScottyLabs mailing list.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </FormControl>
    );
}

export default Form;
