import { useState, useEffect } from 'react';
import { Box, Radio, TextField, RadioGroup, FormControlLabel, FormControl, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E']; // Add more teams if needed
const categories = ['amateur', 'professional'];

const initialData = [
  // 70kg category
  { id: 1, name: 'John Doe', gender: 'men', weight: '70', points: 100 },
  { id: 2, name: 'James Smith', gender: 'men', weight: '70', points: 95 },
  { id: 3, name: 'Robert Johnson', gender: 'men', weight: '70', points: 90 },
  { id: 4, name: 'Michael Williams', gender: 'men', weight: '70', points: 85 },
  { id: 5, name: 'William Brown', gender: 'men', weight: '70', points: 80 },

  { id: 6, name: 'Mary Johnson', gender: 'women', weight: '70', points: 100 },
  { id: 7, name: 'Patricia Williams', gender: 'women', weight: '70', points: 95 },
  { id: 8, name: 'Jennifer Brown', gender: 'women', weight: '70', points: 90 },
  { id: 9, name: 'Linda Davis', gender: 'women', weight: '70', points: 85 },
  { id: 10, name: 'Elizabeth Miller', gender: 'women', weight: '70', points: 80 },

  // 80kg category
  { id: 11, name: 'David Moore', gender: 'men', weight: '80', points: 100 },
  { id: 12, name: 'Richard Taylor', gender: 'men', weight: '80', points: 95 },
  { id: 13, name: 'Charles Anderson', gender: 'men', weight: '80', points: 90 },
  { id: 14, name: 'Joseph Thomas', gender: 'men', weight: '80', points: 85 },
  { id: 15, name: 'Thomas Jackson', gender: 'men', weight: '80', points: 80 },

  { id: 16, name: 'Susan Martin', gender: 'women', weight: '80', points: 100 },
  { id: 17, name: 'Jessica Thompson', gender: 'women', weight: '80', points: 95 },
  { id: 18, name: 'Sarah White', gender: 'women', weight: '80', points: 90 },
  { id: 19, name: 'Karen Harris', gender: 'women', weight: '80', points: 85 },
  { id: 20, name: 'Nancy Clark', gender: 'women', weight: '80', points: 80 },

  // 90kg category
  { id: 21, name: 'Daniel Lewis', gender: 'men', weight: '90', points: 100 },
  { id: 22, name: 'Matthew Robinson', gender: 'men', weight: '90', points: 95 },
  { id: 23, name: 'Anthony Walker', gender: 'men', weight: '90', points: 90 },
  { id: 24, name: 'Donald Hall', gender: 'men', weight: '90', points: 85 },
  { id: 25, name: 'Mark Allen', gender: 'men', weight: '90', points: 80 },

  { id: 26, name: 'Lisa Young', gender: 'women', weight: '90', points: 100 },
  { id: 27, name: 'Betty King', gender: 'women', weight: '90', points: 95 },
  { id: 28, name: 'Dorothy Wright', gender: 'women', weight: '90', points: 90 },
  { id: 29, name: 'Sandra Lopez', gender: 'women', weight: '90', points: 85 },
  { id: 30, name: 'Donna Hill', gender: 'women', weight: '90', points: 80 },
].map(athlete => ({
  ...athlete,
  team: teams[Math.floor(Math.random() * teams.length)],
  category: categories[Math.floor(Math.random() * categories.length)]
}));

export const Athletes = () => {
    const [data, setData] = useState(initialData);
    const [filter, setFilter] = useState({ gender: 'men', category: 'professional'});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


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
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(item => {
      return (!filter.gender || item.gender === filter.gender) 
        && (!filter.category || item.category === filter.category)
        && item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    
  const sortedData = filteredData.sort((a, b) => b.points - a.points);


  return (
    <>
    <Grid container spacing={2} justifyContent="center" sx={{ mt:'2rem', }}>
      <Box mr={5}>
        <FormControl component="fieldset">
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
  </Grid>

  <Grid container spacing={2} justifyContent="center" sx={{ mt:'2rem', }}>
  <TextField 
    label="Search by name" 
    variant="outlined" 
    value={searchTerm} 
    onChange={handleSearchChange} 
    sx={{ width: '30%' }}
  />
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
            <TableRow  key={index} 
              onClick={() => navigate(`/athlete/${item.id}`, { state: item})}
              style={{cursor: 'pointer'}}
            >
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

export default Athletes;