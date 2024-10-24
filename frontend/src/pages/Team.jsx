import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import chroma from 'chroma-js';

/*const teamData = {
  id: 1,
  team: 'Questo Quello Bello',
  abbreviation: 'QQB',
  color: 'red',
  logo: 'https://via.placeholder.com/150',
  location: 'Parana, Argentina',
  coach: 'Juan Perez',
};*/

const athleteData = [
    { name: 'Athlete 1', record: '3-1', category: '75kg', clasification: 'Professional'},
    { name: 'Athlete 2', record: '2-2', category: '85kg', clasification: 'Amateur'},
    // Add more data here
];

const teamHistoryData = [
    { event: 'Event 1', record: '3-1' },
    { event: 'Event 2', record: '2-2' },
    // Add more data here
  ];

export const Team = () => {
    const [activeTable, setActiveTable] = useState('athletes');
    const [ , setTableData] = useState([]);
    const location = useLocation();
    const teamData = location.state;
    //const [ firstColor, setFirstColor ] = useState('');
    //const [ secondColor, setSecondColor ] = useState('');

    const handleButtonClick = (table) => {
     setActiveTable(table);
    };

    useEffect(() => {
      //setFirstColor(teamData.colors.split(',')[0]);
      //setSecondColor(teamData.colors.split(',')[1].trim());
      //console.log(firstColor, secondColor, teamData.colors);

      if (activeTable === 'athletes') {
          setTableData(athleteData);
      } else if (activeTable === 'teamHistory') {
          setTableData(teamHistoryData);
      }
    }, [activeTable]);

      const AthleteTable = () => (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell sx={{ backgroundColor: '#C8102E', color: '#fff' }} style={{width: '50%', wordBreak: 'break-word'}}>Name of Athlete</TableCell>
              <TableCell sx={{ backgroundColor: '#C8102E', color: '#fff' }} style={{width: '15%', wordBreak: 'break-word'}}>Record</TableCell>
              <TableCell sx={{ backgroundColor: '#C8102E', color: '#fff' }} style={{width: '15%', wordBreak: 'break-word'}}>Category</TableCell>
              <TableCell sx={{ backgroundColor: '#C8102E', color: '#fff' }} style={{width: '20%', wordBreak: 'break-word'}}>Clasification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {athleteData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" style={{width: '50%', wordBreak: 'break-word'}}>
                  {row.name}
                </TableCell>
                <TableCell style={{width: '15%', wordBreak: 'break-word'}}>
                  {row.record}
                </TableCell>
                <TableCell style={{width: '15%', wordBreak: 'break-word'}}>
                  {row.category}
                </TableCell>
                <TableCell style={{width: '20%', wordBreak: 'break-word'}}>
                  {row.clasification}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );

    const TeamHistoryTable = () => (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#C8102E', color: '#fff' }} style={{width: '80%', wordBreak: 'break-word'}}>Event</TableCell>
              <TableCell sx={{ backgroundColor: '#C8102E', color: '#fff' }} style={{width: '20%', wordBreak: 'break-word'}}>Record</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamHistoryData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" style={{width: '80%', wordBreak: 'break-word'}}>
                  {row.event}
                </TableCell>
                <TableCell style={{width: '20%', wordBreak: 'break-word'}}>
                  {row.record}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

    
  return (
    <>
    <div className="team-page">
        {/*<header className="team-header" style={{backgroundColor: "#C8102E"}}>*/}
        <header className="team-header" style={{backgroundColor: chroma(teamData.colors.split(',')[0]).brighten(0).saturate(0).hex()}}>
            <div className="layout-content">
                <div className="head-mast">
                    <div className="team-logo">
                        <img loading="lazy" src="https://www.ncaa.com/sites/default/files/images/logos/teams/bgd/nebraska.svg" alt="University of Nebraska-Lincoln" />
                    </div>
                </div>

                <dl className="team-details">
                    <div className="dl-group">
                        <dt>Coach</dt>
                        <dd>{teamData.coach}</dd>
                    </div>

                    <div className="dl-group">
                        <dt>Nickname</dt>
                        <dd>{teamData.name}</dd>
                    </div>

                    <div className="dl-group">
                        <dt>Colors</dt>
                        <dd>{teamData.colors}</dd>
                    </div>
                </dl>
            </div>

            {/*<div className="team-links" style={{backgroundColor: "#be0624"}}>*/}
            <div className="team-links" style={{backgroundColor: chroma(teamData.colors.split(',')[1].trim()).brighten(0).saturate(0).hex()}}>

                    <ul>
                        <li>
                            <a>
                                <span className="icon-web">&nbsp;</span>
                                <span className="info">{teamData.city}</span>
                            </a>
                        </li>
                    
                        <li>
                            <a href="https://twitter.com/@Huskers" target="_blank">
                                <span className="icon-twitter">&nbsp;</span>
                                <span className="info">@Huskers</span>
                            </a>
                        </li>
            
                        <li>
                            <a href="https://facebook.com/huskers" target="_blank">
                                <span className="icon-facebook">&nbsp;</span>
                                <span className="info">huskers</span>
                            </a>
                        </li>
                    </ul>
            </div>
        </header>
    </div>
    
    <br />

    <Box display="flex" justifyContent="center" width="70vw" margin="auto" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ maxWidth:250, marginRight: { md: '20px' }, flexDirection: 'column', width: '100%', marginBottom: { xs: '20px', md: '0' } }}>
            <Button variant="contained" onClick={() => handleButtonClick('teamHistory')} sx={{ width: '100%', marginBottom: '10px' }}>Team History</Button>
            <Button variant="contained" onClick={() => handleButtonClick('athletes')} sx={{ width: '100%', marginBottom: '10px' }}>Members</Button>
            <Button variant="contained" sx={{ width: '100%', backgroundColor: '#123456', color: '#ffffff' }}>Join Team</Button>
        </Box>
        <TableContainer component={Paper} sx={{ maxWidth: '100%', borderRadius: '10px', overflowX: 'auto' }}>
            {activeTable === 'athletes' ? <AthleteTable /> : <TeamHistoryTable />}
        </TableContainer>
    </Box>
   
    </>
  );
};