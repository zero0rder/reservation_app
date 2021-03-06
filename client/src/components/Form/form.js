import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation, updateReservation} from '../../actions/reservations';
import { TextField, Button, Typography, Paper, MenuItem, Grid } from '@material-ui/core';
import useStyles from './styles';
const availLocals  = ['rm01', 'rm02', 'rm03', 'rm04', 'rm05', 'rm06'];
const availTimes  = ['8:30am', '9:15am', '10:00am', '10:30am', '11:45am', '12:30pm'];

const Form = ({currentId, setCurrentId}) => {
    const [reservationData, setReservationData] = useState({firstName: '', lastName: '', email: '', comments: '', reserveTime: '', reserveLocation: ''});
    const reservation = useSelector((state) => (currentId ? state.reservations.find((reservation) => reservation._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (reservation) setReservationData(reservation);
    }, [reservation]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId === 0){
            dispatch(createReservation(reservationData));
            clear();
        } else {
            dispatch(updateReservation(currentId, reservationData));
            clear();
        }
    };

    const clear = () => {
        setCurrentId(0);
        setReservationData({firstName: '', lastName: '', email: '', comments: '', reserveTime: '', reserveLocation: ''});
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? "Editing A Reservation": 'Making A Reservation'}</Typography>
                <TextField name='firstName' variant='outlined' label='First Name' fullWidth value={reservationData.firstName} 
                onChange={(e) => setReservationData({ ...reservationData, firstName: e.target.value })}/>
                <TextField name='lastName' variant='outlined' label='Last Name' fullWidth value={reservationData.lastName} 
                onChange={(e) => setReservationData({ ...reservationData, lastName: e.target.value })}/>
                <TextField name='email' variant='outlined' label='Email' fullWidth value={reservationData.email} 
                onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}/>
                <TextField select value={reservationData.reserveTime} className={classes.timeSelect} label='Times' onChange={(e) => setReservationData({...reservationData, reserveTime: e.target.value})}>
                    { availTimes.map((l, i) => ( 
                        <MenuItem key={i} id={`timeOpt-${i}`} value={l}>{l.toUpperCase()}</MenuItem> 
                    ))}
                </TextField>
                <TextField select value={reservationData.reserveLocation} className={classes.localSelect} label='Locations' onChange={(e) => setReservationData({...reservationData, reserveLocation: e.target.value})}>
                    { availLocals.map((l, i) => ( 
                        <MenuItem key={i} id={`localeOpt-${i}`} value={l}>{l.toUpperCase()}</MenuItem> 
                    ))}
                </TextField>
                <TextField name='comments' variant='outlined' label='Comments' fullWidth multiline rows={4} value={reservationData.comments} 
                onChange={(e) => setReservationData({ ...reservationData, comments: e.target.value })}/>
                <Grid container className={classes.buttonGrid} justify="space-between" alignItems="center" spacing={0}>
                    <Button className={classes.buttonSubmit} variant='contained' color='primary' size="large" type='submit' fullWidth>Submit</Button>
                    <Button variant='contained' color='secondary' size='large' onClick={clear} fullWidth>Clear</Button>
                </Grid>
            </form>
        </Paper>
    )
}

export default Form;