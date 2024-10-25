import { useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem, Grid, TableRow, TableHead, Paper, TableBody, TableContainer, Table, TableCell } from '@mui/material';
import { getEvents, getParametersByEvent, createEventParameter } from '../services/api';

export const CreateEventParameters = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [parameters, setParameters] = useState([]);
  const [availableParameters, setAvailableParameters] = useState({
    categories: [],
    weights: [],
    ages: [],
    genders: []
  });
  const [newParameter, setNewParameter] = useState({
    category_id: '',
    weight_id: '',
    age_id: '',
    gender_id: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventChange = async (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    try {
      const response = await getParametersByEvent(eventId);
      setParameters(response.data.eventParameters);
      setAvailableParameters({
        categories: response.data.allcategories,
        weights: response.data.allweights,
        ages: response.data.allages,
        genders: response.data.allgenders
      });
    } catch (error) {
      console.error('Failed to fetch event parameters:', error);
      setParameters([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParameter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const parameterToSubmit = { ...newParameter, event_id: selectedEvent };
      console.log('parameterToSubmit:', parameterToSubmit);
      await createEventParameter(parameterToSubmit);
      // Refresh parameters after creating a new one
      const response = await getParametersByEvent(selectedEvent);
      setParameters(response.data.eventParameters);
    } catch (error) {
      console.error('Failed to create event parameter:', error);
    }
  };

  const [showCreateEventForm, setShowCreateEventForm] = useState(false);

  const toggleCreateEventForm = () => {
  setShowCreateEventForm(!showCreateEventForm);
  };

  return (
    <>
        <Container component="main" maxWidth="xs">
            <Button onClick={toggleCreateEventForm} variant="contained" color="primary">
                CREATE Event parameters
            </Button>
            {showCreateEventForm && (
             <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Select Event"
                  value={selectedEvent}
                  onChange={handleEventChange}
                  fullWidth
                >
                  {events.map((event) => (
                    <MenuItem key={event.event_id} value={event.event_id}>
                      {event.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {parameters.map((param, index) => (
                        <TableRow key={index}>
                          <TableCell>{param.category}</TableCell>
                          <TableCell>{param.weight}</TableCell>
                          <TableCell>{param.age}</TableCell>
                          <TableCell>{param.gender}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Category"
                  name="category_id"
                  value={newParameter.category_id}
                  onChange={handleInputChange}
                  fullWidth
                >
                  {availableParameters.categories.map((category) => (
                    <MenuItem key={category.category_id} value={category.category_id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Weight"
                  name="weight_id"
                  value={newParameter.weight_id}
                  onChange={handleInputChange}
                  fullWidth
                >
                  {availableParameters.weights.map((weight) => (
                    <MenuItem key={weight.weight_id} value={weight.weight_id}>
                      {weight.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Age"
                  name="age_id"
                  value={newParameter.age_id}
                  onChange={handleInputChange}
                  fullWidth
                >
                  {availableParameters.ages.map((age) => (
                    <MenuItem key={age.age_id} value={age.age_id}>
                      {age.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Gender"
                  name="gender_id"
                  value={newParameter.gender_id}
                  onChange={handleInputChange}
                  fullWidth
                >
                  {availableParameters.genders.map((gender) => (
                    <MenuItem key={gender.gender_id} value={gender.gender_id}>
                      {gender.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </>
  );
};