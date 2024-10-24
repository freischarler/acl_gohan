//import { useEffect, useState } from 'react';
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
//import { getRanking } from '../services/api';
import FullWidthTabs from '../components/RankTab.jsx';

export const Ranking = () => {
    /*const [data, setData] = useState([]);

    useEffect(() => {
        getRanking()
        .then(response => {
            // Actualizar el estado con los datos obtenidos
            console.log(response.data)
            //setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        setData(ranking)
    }, []);*/

  return (
    <FullWidthTabs />
  );
}