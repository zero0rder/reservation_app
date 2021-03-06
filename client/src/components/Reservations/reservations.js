import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Reservation from './Reservation/reservation';

const Reservations = ({setCurrentId}) => { 
    const reservations = useSelector((state) => state.reservations);
    
    return (
    !reservations.length ? <CircularProgress /> : (
            <Grid container alignItems='stretch' spacing={3}>
                { reservations.map(reservation => (
                    <Grid key={reservation._id} item xs={12} sm={10} md={6}>
                        <Reservation reservation={reservation} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Reservations;