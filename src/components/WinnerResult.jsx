import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { winnerSelector } from '../redux/CandidateSlice';
import { countdownSelector } from '../redux/CountdownSlice';



const WinnerResult = () => {
  const winner = useSelector(winnerSelector);
  const { isCountdown  } = useSelector(countdownSelector);


  return (
    <Box border="1px solid black" p={2} height="24rem">
      <Typography variant='h5'>抽獎結果</Typography>
      {winner && (
        <Box mt={16} display="flex" alignItems="baseline" justifyContent="center">
          恭喜<Typography variant='h5' px={2}>{winner?.name}</Typography>中獎!!
        </Box>
      )}
      {isCountdown && (
        <Box mt={2} mr={2} display="flex" alignItems="center"><CircularProgress sx={{ mr: 4 }} /><span>倒數中</span></Box>
      )}
    </Box>
  )
}

export default WinnerResult;