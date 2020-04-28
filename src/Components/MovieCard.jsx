import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const MovieCard = ({ movieLocation, locationExtras }) => {
  return (
    <>
      <Box border={1} borderRadius="borderRadius" m={1}>
        <Typography variant="body2" color="text" align="center">
          <p>Location: {movieLocation}</p>
          <p> Scene Information: {locationExtras}</p>
        </Typography>
      </Box>
    </>
  );
};

export default MovieCard;
