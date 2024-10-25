import { Box, Typography } from '@mui/material';
import { RoundBox } from './RoundBox';
import PropTypes from 'prop-types';

export const MainBracket = ({ players }) => {
  const getRounds = (numPlayers) => {
    const rounds = [];
    const totalRounds = Math.ceil(Math.log2(numPlayers));
    for (let i = 0; i < totalRounds; i++) {
      if (i === totalRounds - 2) {
        rounds.push("Semifinals");
      } else if (i === totalRounds - 1) {
        rounds.push("Finals");
      } else {
        rounds.push(`Round of ${Math.pow(2, totalRounds - i)}`);
      }
    }
    return rounds;
  };

  const getMatches = (numPlayers, roundNumber) => {
    //console.log(numPlayers, numPlayers % 2 !== 0)
    if (roundNumber === 1 && numPlayers % 2 !== 0) {
        //console.log('A', numPlayers, roundNumber);
      return Math.ceil(numPlayers / 2);
    } else {
        //console.log('B', numPlayers, roundNumber);
      return Math.ceil(numPlayers / 2)-1;
        
    }
  };

  const rounds = getRounds(players.length);
  let matchCounter = 1;

  return (
    <Box className="brackets">
      {rounds.map((round, i) => (
        <Box key={i} className="round" bgcolor="black">
          <Typography variant="h6" style={{ color: 'white' }}>{round}</Typography>
          {
            Array.from({length: getMatches(players.length / Math.pow(2, i), matchCounter)}, (_, j) => j).map(index => {
                const playerOne = players[index * 2] ? players[index * 2].name : 'X';
                const playerTwo = players[index * 2 + 1] ? players[index * 2 + 1].name : 'X';
                
                const playerOnePoints = Math.floor(Math.random() * 10);
                const playerTwoPoints = Math.floor(Math.random() * 10);
                return (
                <RoundBox key={index} 
                    roundNumber={matchCounter++} 
                    playerOne={playerOne} 
                    playerTwo={playerTwo}
                    playerOnePoints={playerOnePoints}
                    playerTwoPoints={playerTwoPoints} />
                );
            })
          }
        </Box>
      ))}
    </Box>
  );
}

MainBracket.propTypes = {
  players: PropTypes.array.isRequired
};