import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { removeCandidate } from '../redux/CandidateSlice';


const CandidateItem = ({ forwardedStyle, name, uniqueKey }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(removeCandidate(uniqueKey));
  }, [uniqueKey, dispatch])

  return (
    <Box
      display="flex"
      alignItems="center"
      pl={2}
      justifyContent="space-between"
      border="1px solid black"
      style={{ ...forwardedStyle, height: forwardedStyle.height - 16 }}
    >
      <Typography>
        {name}
      </Typography>
      <Button onClick={handleDelete}>X</Button>
    </Box>
  )
}

export default React.memo(CandidateItem);