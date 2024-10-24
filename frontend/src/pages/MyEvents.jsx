import { useEffect, useState } from 'react';
import { Table, TableBody, Box,  TableCell, TableContainer, Select, Typography, TableHead, MenuItem, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import { events } from '../data/data.js';
import { getEventsTicketsRegistrationsByUserId } from '../services/api.js';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';

export const MyEvents = () => {
    const [dataEvents, setDataEvents] = useState([]);
    const [dataTickets, setDataTickets] = useState([]); 
    const [dataRegistrations, setDataRegistrations] = useState([]);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const handleChange = (event) => {
      const newFilter = event.target.value;
      setFilter(newFilter);
  
      const filteredEvents = dataEvents.filter(event => {
        const startEventDate = new Date(event.start_date);
        const currentDate = new Date();
  
        if (newFilter === 'Vigent') {
          return startEventDate >= currentDate;
        } else if (newFilter === 'Expired') {
          return startEventDate < currentDate;
        } else {
          return true;
        }
      });
  
      setFilteredEvents(filteredEvents);
    };


    useEffect(() => {
        getEventsTicketsRegistrationsByUserId(user.user_id)
        .then(response => {
            // Actualizar el estado con los datos obtenidos
            setDataEvents(response.data.events);
            setDataTickets(response.data.tickets);
            setDataRegistrations(response.data.registrations);
            setFilteredEvents(response.data.events);
            //console.log(response.data);
            
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [user.user_id]);

    const handleEventTickets = (event) => (e) => {
      e.preventDefault();
        
      const eventTickets = dataTickets.filter(ticket => ticket.event_id === event.event_id);
      const registrations = dataRegistrations.filter(registration => registration.event_id === event.event_id);
      
      const metadata = {
        event: event,
        tickets: eventTickets,
        registrations: registrations,
      }
      navigate(`/my-tickets/${event.event_id}`, { state: metadata });
  };
  

  return (
    <>    
      <div  className='fade-in'>
      <Typography
        variant="h4"
        align="center"
        mt={2}
      >
        Mis eventos!</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Select value={filter} onChange={handleChange}  sx={{ 
            width: { xs: '50%', sm: '20%' }, 
            mt: 2,
            mb: 2,
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Vigent">Vigent</MenuItem>
          <MenuItem value="Expired">Expired</MenuItem>
        </Select>
        </Box>

    <TableContainer component={Paper}>
    <Table>
      <TableHead sx={{backgroundColor: 'Black'}}>
        <TableRow>
          <TableCell sx={{color: 'White'}}>Fecha</TableCell>
          <TableCell sx={{color: 'White'}}>Evento</TableCell>
          <TableCell sx={{color: 'White'}}>Ubicacion</TableCell>
          <TableCell sx={{color: 'White'}}>Tipo</TableCell>
          <TableCell sx={{color: 'White'}}>Estilo</TableCell>    
        </TableRow>
      </TableHead>
      <TableBody>
          {filteredEvents.map((event, index) => (
              <TableRow 
                key={index} 
                onClick={handleEventTickets(event)}
                style={{cursor: 'pointer'}}
              >
              <TableCell>{new Date(event.start_date).toLocaleDateString()}</TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.address} + {event.city} - {event.country}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.style}</TableCell>
              </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  </>
  )
}
