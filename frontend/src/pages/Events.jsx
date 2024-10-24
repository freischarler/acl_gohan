import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import { events } from '../data/data.js';
import { getEvents } from '../services/api.js';

export const Events = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      getEvents()
      .then(response => {
          // Actualizar el estado con los datos obtenidos
          console.log(response.data)
  
          /*onst vigentEvents = response.data.filter(event => {
            const eventDate = new Date(event.end_date);
            return eventDate >= new Date();
          });*/
  
          setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, []);

  return (
    <Container sx={{ marginTop: '2rem' }} className='fade-in'>
    <TableContainer component={Paper}>
    <Table>
      <TableHead sx={{ backgroundColor: 'black' }} >
        <TableRow>
          <TableCell sx={{ color: 'white'}}>Fecha</TableCell>
          <TableCell sx={{ color: 'white'}}>Evento</TableCell>
          <TableCell sx={{ color: 'white'}}>Ubicacion</TableCell>
          <TableCell sx={{ color: 'white'}}>Tipo</TableCell>
          <TableCell sx={{ color: 'white'}}>Estilo</TableCell>    
        </TableRow>
      </TableHead>
      <TableBody>
          {data.map((event, index) => (
              <TableRow 
                key={index} 
                onClick={() => navigate(`/events/${event.event_id}`, { state: event})}
                style={{cursor: 'pointer'}}
              >
              <TableCell>{new Date(event.start_date).toLocaleDateString()}</TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.city} - {event.country}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.style}</TableCell>
              </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Container>
  )
}
