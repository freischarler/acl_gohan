import { useState, useEffect } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E']; // Add more teams if needed
const categories = ['amateur', 'professional'];

const initialData = [
  // 70kg category
  { name: 'John Doe', gender: 'men', weight: 70, points: 100 },
  { name: 'James Smith', gender: 'men', weight: 70, points: 95 },
  { name: 'Robert Johnson', gender: 'men', weight: 70, points: 90 },
  { name: 'Michael Williams', gender: 'men', weight: 70, points: 85 },
  { name: 'William Brown', gender: 'men', weight: 70, points: 80 },

  { name: 'Mary Johnson', gender: 'women', weight: 70, points: 100 },
  { name: 'Patricia Williams', gender: 'women', weight: 70, points: 95 },
  { name: 'Jennifer Brown', gender: 'women', weight: 70, points: 90 },
  { name: 'Linda Davis', gender: 'women', weight: 70, points: 85 },
  { name: 'Elizabeth Miller', gender: 'women', weight: 70, points: 80 },

  // 80kg category
  { name: 'David Moore', gender: 'men', weight: 80, points: 100 },
  { name: 'Richard Taylor', gender: 'men', weight: 80, points: 95 },
  { name: 'Charles Anderson', gender: 'men', weight: 80, points: 90 },
  { name: 'Joseph Thomas', gender: 'men', weight: 80, points: 85 },
  { name: 'Thomas Jackson', gender: 'men', weight: 80, points: 80 },

  { name: 'Susan Martin', gender: 'women', weight: 80, points: 100 },
  { name: 'Jessica Thompson', gender: 'women', weight: 80, points: 95 },
  { name: 'Sarah White', gender: 'women', weight: 80, points: 90 },
  { name: 'Karen Harris', gender: 'women', weight: 80, points: 85 },
  { name: 'Nancy Clark', gender: 'women', weight: 80, points: 80 },

  // 90kg category
  { name: 'Daniel Lewis', gender: 'men', weight: 90, points: 100 },
  { name: 'Matthew Robinson', gender: 'men', weight: 90, points: 95 },
  { name: 'Anthony Walker', gender: 'men', weight: 90, points: 90 },
  { name: 'Donald Hall', gender: 'men', weight: 90, points: 85 },
  { name: 'Mark Allen', gender: 'men', weight: 90, points: 80 },

  { name: 'Lisa Young', gender: 'women', weight: 90, points: 100 },
  { name: 'Betty King', gender: 'women', weight: 90, points: 95 },
  { name: 'Dorothy Wright', gender: 'women', weight: 90, points: 90 },
  { name: 'Sandra Lopez', gender: 'women', weight: 90, points: 85 },
  { name: 'Donna Hill', gender: 'women', weight: 90, points: 80 },
].map(athlete => ({
  ...athlete,
  team: teams[Math.floor(Math.random() * teams.length)],
  category: categories[Math.floor(Math.random() * categories.length)]
}));

export const RankAthletes = () => {
    const [data, setData] = useState(initialData);
    const [filter, setFilter] = useState({ gender: 'men', weight: 70, category: 'professional'});


    useEffect(() => {
        /*getRanking()
            .then(response => {
                // Actualizar el estado con los datos obtenidos
                console.log(response.data)
                //setData(response.data);
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });*/

            setData(initialData)
    }, []);
  
    const handleFilterChange = (key, value) => {
      setFilter(prevFilter => ({ ...prevFilter, [key]: value }));
    };
  
    const filteredData = data.filter(item => {
      return (!filter.gender || item.gender === filter.gender) 
        && (!filter.weight || item.weight === filter.weight)
        && (!filter.category || item.category === filter.category);
    });

    
  const sortedData = filteredData.sort((a, b) => b.points - a.points);


  return (
    <>
    <Grid container spacing={2} justifyContent="center">

      <Box mr={5}>
        <FormControl >
          <RadioGroup row aria-label="category" name="row-radio-buttons-group" value={filter.category} onChange={(event) => handleFilterChange('category', event.target.value)}>
            <FormControlLabel value="professional" control={<Radio />} label="Professional" />
            <FormControlLabel value="amateur" control={<Radio />} label="Amateur" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mr={5}>
        <FormControl >
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={filter.gender} onChange={(event) => handleFilterChange('gender', event.target.value)}>
            <FormControlLabel value="men" control={<Radio />} label="Men" />
            <FormControlLabel value="women" control={<Radio />} label="Women" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box ml={5}>
      <FormControl >
        <RadioGroup row aria-label="weight" name="row-radio-buttons-group" value={filter.weight} onChange={(event) => handleFilterChange('weight', Number(event.target.value))}>
          <FormControlLabel value={70} control={<Radio />} label="70kg" />
          <FormControlLabel value={80} control={<Radio />} label="80kg" />
          <FormControlLabel value={90} control={<Radio />} label="90kg" />
        </RadioGroup>
      </FormControl>
      </Box>
  </Grid>

  <br />

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.team}</TableCell>
              <TableCell>{item.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)};

export default RankAthletes;