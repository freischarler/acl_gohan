import { PropTypes } from "prop-types";
import { Box, Typography } from "@mui/material";
import { RoundBox } from "./RoundBox";


export const LossBrackets = ( {players} ) => {
    const getRounds = (numPlayers) => {
      const rounds = [];
      const totalRounds = Math.ceil(Math.log2(numPlayers));
      for (let i = 0; i < totalRounds / 2; i++) {
        if (i === totalRounds / 2 - 2) {
          rounds.push("Semifinals");
        } else if (i === totalRounds / 2 - 1) {
          rounds.push("Finals");
        } else {
          rounds.push(`Round of ${Math.pow(2, totalRounds / 2 - i)}`);
        }
      }
      return rounds;
    };
  
    const getMatches = (numPlayers, roundNumber) => {
      if (roundNumber === 0) {
        return Math.ceil(numPlayers / 2);
      } else {
        return Math.ceil(numPlayers / 2);
      }
    };
  
    const rounds = getRounds(players.length);
    let matchCounter = 1;
  
    return (
      <Box className="brackets">
        {rounds.map((round, i) => (
          <Box key={i} className="round" bgcolor="black">
            <Typography variant="h6" style={{ color: 'white' }}>{round}</Typography>
            {Array.from({length: getMatches(players.length / Math.pow(2, i))}, (_, j) => j).map(index => {
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
            })}
          </Box>
        ))}
      </Box>
    );
  };

  LossBrackets.propTypes = {
players: PropTypes.array.isRequired
};