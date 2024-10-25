import { Box, Typography, Button, CircularProgress } from '@mui/material';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import { initMercadoPago, Wallet  } from '@mercadopago/sdk-react';
import { useState } from 'react';
import {  postCreatePreference } from '../services/api';
//import { v4 as uuidv4 } from 'uuid';
//import { useContext } from 'react';
//import { AuthContext } from '../providers/AuthContext';


export const Ticket =({ id, ticketId, price, type, status }) => {
  const qrValue = `https://www.aclweb.org`+`?i=${ticketId}&s=${status}`;
  const publicKey = import.meta.env.MP_PUBLIC_KEY;
  console.log(publicKey)
  initMercadoPago(publicKey, { locale: 'es-AR'})
  //const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const handlePay = async () => {
    setLoading(true);
    // check if almost one tickt is selected

    const order_id = preferenceId
  
    const objectPreference = {
      title: 'Atleta',
      quantity: 1,
      price: parseFloat(price),
      order_id: order_id
    }

    console.log(objectPreference)
    postCreatePreference(objectPreference)
    .then(response => {
      console.log('Preference created:', response.data);
      setPreferenceId(response.data.id);
    })
    .catch(error => {
      console.error('Error creating preference:', error);
    });
  }

  if (status === 'pending') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2}>
        <Typography variant="h6">ID: #{id}</Typography>
        <Typography variant="h6">Entrada: {type.toUpperCase()}</Typography>
        <Typography variant="h6" style={{ color: status === 'pending' ? 'red' : 'inherit' }}>Estado: {status.toUpperCase()}</Typography>
        <Typography variant='body2' mt={2}>You need to pay for this ticket</Typography> 
        <Typography variant='h6'>$ {price}</Typography>
        { preferenceId == null ? (
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handlePay} 
          disabled={loading}
          startIcon={loading ? <CircularProgress size="1rem" /> : null}
        >
          {loading ? 'Processing...' : 'Generar Pago'}
        </Button>
      ) : (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
      </Box>
    );
  }
  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2}>
        <Typography variant="h6">ID: #{id}</Typography>
        <Typography variant="h6">Entrada: {type.toUpperCase()}</Typography>
        <Typography variant="h6">{status}</Typography>
        <br />

        <Box 
            display="flex" 
            justifyContent="center" 
            mt={2}
            sx={{
                width: 'fit-content',
                padding: 2,
                backgroundColor: '#fff',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            }}
            >
            <QRCode value={qrValue} />
        </Box>
        <Typography variant="body2" color="error" mt={2}>Do not scan this QR code.</Typography>
    </Box>
  )
}

Ticket.propTypes = {
    id : PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    ticketId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };
