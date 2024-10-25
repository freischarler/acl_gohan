import { Box, Button, Container, Grid, Card, CardContent,ListItem, List, Typography, ListItemText } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getParametersByEventByUser } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';

export const Event = () => {
    const location = useLocation();
    const event = location.state;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    //get weights and categories from event
    useEffect(() => {
        if(user != null){
            getParametersByEventByUser(event.event_id, user.user_id)
            .then(response => {
                    //console.log(response.data)
        
                    // Assign the aggregated unique values to the event object
                    event.parameters = [response.data]; // Wrap the result object in an array
                    //console.log(event)
            });
        }
       
    }, [event, user]);



    const handleParticipate = () => {
      if (user === null) {
        navigate("/login");
      } else {
        navigate("/participate", { state: event });
      }
    }


      
    const handleBack = () => {
        navigate(-1);
    }

        /*const handleBuyGeneralTicket = () => {
      if (localStorage.getItem("user") === null) {
        navigate("/login");
      } else {
        //convert event to object

        navigate(`/buy-ticket`,  { state: event })
      }
    };*/

    /*const handleRegisteredAthletes = () => {
        navigate("/registered-athletes", { state: event });
    }*/

    /*const handleMatches = () => {
        navigate(`/events/${event.event_id}/matches`, { state: event });
    }*/

    return (
      <Box sx={{ mt: 4 }}>
      <Container  className='fade-in'>
          <Grid  >
             <Grid item xs={12} sm={6} md={4} lg={12} justifyContent="center">
                  <Card>
                      <CardContent>
                        <List>
                          <ListItem>
                            <Typography variant="h2" align="center">{event.name}</Typography>
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="" secondary={`${event.type}, ${event.style}`} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Ubicación" secondary={`${event.address}, ${event.city} - ${event.country}`} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Horario pesaje" secondary={new Date(event.weighing_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })+'hs'} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Comienzo" secondary={new Date(event.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })+'hs'} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Finalización" secondary={new Date(event.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })+'hs'} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Descripción" secondary={event.description} />
                          </ListItem>
                      </List>
                      </CardContent>
                  </Card>
              </Grid>
              {/*<Grid item xs={12} sm={6}>
                  <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      sx={{ m: 1 }}
                      onClick={handleBuyGeneralTicket} 
                  >
                      Entrada Pública
                  </Button>
              </Grid>*/}
                <Box sx={{ flexGrow: 1, mt: 2 }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleParticipate}>
                            Competir
                        </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                        <Button variant="contained" color="secondary" fullWidth onClick={handleBack}>
                            Volver
                        </Button>
                        </Grid>
                    </Grid>
                </Box>

              {/*<Grid item xs={12} sm={4}>
                  <Button 
                      variant="contained" 
                      color="secondary" 
                      fullWidth 
                      sx={{ m: 1 }}
                      onClick={handleRegisteredAthletes} 
                  >
                      Lista de competidores
                  </Button>
              </Grid>*/}


              {/*<Grid item xs={12} sm={4}>
                  <Button 
                      variant="contained" 
                      color="secondary" 
                      fullWidth 
                      sx={{ m: 1 }}
                      onClick={handleMatches} 
                  >
                      Luchas
                  </Button>
              </Grid>*/}

             
          </Grid>
      </Container>
  </Box>
    )
}
