import { Ticket } from '../components/Ticket';
import { Registration } from '../components/Registration';
import { Box, Grid, Button, Typography, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteRegistration } from '../services/api';

export const MyTickets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const metadata = location.state;

  const registrationsData = metadata.registrations;
  const ticketData = metadata.tickets;
  //const eventData = metadata.event;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);

  useEffect(() => {
    // Any necessary side effects can be handled here
  }, [metadata]);

  const handleDeleteRegistration = (registrationId) => {
    deleteRegistration(registrationId)
      .then(response => {
        if (response.status === 204) {
          setSnackbarMessage('Registración eliminada.');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          // Optionally, you can update the state to remove the deleted registration from the list
          //setRegistrationsData(prevRegistrations => prevRegistrations.filter(reg => reg.registration_id !== registrationId));
          setTimeout(() => {
            navigate('/my-events');
          }, 3000);
        }
      })
      .catch(error => {
        console.log(error)
        setSnackbarMessage('Error al eliminar la registración.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleDialogOpen = (registrationId) => {
    setSelectedRegistrationId(registrationId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    handleDeleteRegistration(selectedRegistrationId);
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className='fade-in'>
      {registrationsData && registrationsData.map((registration, index) => (
        <Fragment key={`registration-${index}`}>
          <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5 }}>
            Registraciones para {metadata.event.name}
          </Typography>
          <Registration 
            id={index}
            registrationId={registration.registration_id}
            status={registration.status}
            type='Atleta'
            price={Number(registration.price)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleDialogOpen(registration.registration_id)}
            sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 2 }}
          >
            Eliminar registración
          </Button>
        </Fragment>
      ))}

      <Grid container spacing={3}>
        {ticketData.map((ticket, index) => (
          <Fragment key={`ticket-${index}`}>
            <Typography key={index} variant="h4" sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5 }}>
              Tickets públicos para {metadata.event.name}
            </Typography>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
              <Ticket 
                id={index}
                ticketId={ticket.ticket_id}
                status={ticket.status}
                price={Number(ticket.price)}
                type={ticket.type}
              />
            </Grid>
          </Fragment>
        ))}
        <Button 
          sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5, marginBottom: 10 }} 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/my-events')}
        >
          Go to My Events
        </Button>

        <Box>
          {/* Additional content can go here */}
        </Box>
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estas seguro de eliminar la registración?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </div>
    </>
  );
};