import { Container } from '@mui/material';
import { CreateTicket } from '../components/CreateTicket';
import { CreateEvent } from '../components/CreateEvent';
import { CreateTeam } from '../components/CreateTeam';
import { CreateEventParameters } from '../components/CreateEventParameters';

export const ManageEvent = () => {
      return (
        <Container component="main" maxWidth="xs">
          <CreateTeam />
          <CreateEvent />
          <CreateTicket />
          <CreateEventParameters />
        </Container>
      );
    }