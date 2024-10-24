import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

//import { teams } from '../data/data.js';
import { getTeams } from '../services/api.js';

export const Teams = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams()
        .then(response => {
            // Actualizar el estado con los datos obtenidos
            console.log(response.data)
            setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
        
        //setData(teams)
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Team</TableCell>
                <TableCell>Color</TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((team, index) => (
                    <TableRow 
                        key={index} 
                        onClick={() => navigate(`/team/${team.team_id}`, {state: team})}
                        style={{cursor: 'pointer'}}
                    >
                    <TableCell>{team.name}</TableCell>
                    <TableCell>{team.colors}</TableCell>
                    <TableCell>{team.image_url}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}
