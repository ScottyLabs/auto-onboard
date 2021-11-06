import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, Grid, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';

const theme = createTheme();

const pref = {
    tech: 'Tech',
    design: 'Design',
    general: 'General Planning',
}

function App() {
    const [name, setName] = React.useState();
    const [nameError, setNameError] = React.useState(false);

    const [andrew, setAndrew] = React.useState();
    const [andrewError, setAndrewError] = React.useState(false);

    const [committeePref, setCommitteePref] = React.useState([]);
    const [prefError, setPrefError] = React.useState(false);

    const [mailingList, setMailingList] = React.useState(true);

    const validateName = (name) => {
        const hasError = (name || "").length === 0;
        setNameError(hasError);
        return !hasError;
    }

    const validateAndrew = (andrew) => {
        const hasError = !(andrew || "").match(/^[a-z0-9]{3,8}$/gi);
        setAndrewError(hasError);
        return !hasError;
    }

    const onNameChange = (event) => {
        setName(event.target.value);
        validateName(event.target.value);
    }

    const onAndrewChange = (event) => {
        setAndrew(event.target.value);
        validateAndrew(event.target.value);
    }

    const onCommitteeChange = (event) => {
        const value = event.target.value;
        const newPref = typeof value === 'string' ? value.split(', ') : value
        setCommitteePref(newPref);
        validateCommittee(newPref);
    }

    const validateCommittee = (committee) => {
        const hasError = committee.length === 0;
        setPrefError(hasError);
        return !hasError;
    }

    const onMailingListChange = (event) => {
        setMailingList(event.target.checked);
    }

    const onSubmit = (event) => {
        if (validateName(name) && validateAndrew(andrew) && validateCommittee(committeePref)) {
            console.log({name, andrew: (andrew || "").toLowerCase(), committeePref, mailingList});
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container componknt="main" maxWidth="md">
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
                                helperText={nameError ? 'Name cannot be blank.' : undefined}
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
                                helperText={andrewError ? 'Andrew ID must be valid.' : undefined}
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
                                helperText={prefError ? 'You must select a committee' : 'You may select multiple committees'}
                                inputProps={{ multiple: true, renderValue: (s) => s.map(x => pref[x]).join(', ') }}
                            >
                                {Object.entries(pref).map(([key, val]) => (
                                    <MenuItem key={key} value={key}>
                                        <Checkbox checked={committeePref.indexOf(key) > -1} />
                                        <ListItemText primary={val} />
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}> 
                            <Typography variant="body2">By submitting this form, you will be added to the ScottyLabs mailing list.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={onSubmit}>Submit</Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </Container>
        </ThemeProvider>
    );
}

export default App;
