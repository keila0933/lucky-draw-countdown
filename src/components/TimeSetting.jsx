import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Countdown from './Countdown';
import { setTimer, clearTimer,  countdownSelector, runTimer } from '../redux/CountdownSlice';
import { candidatesSelector, cleanCandidates, getWinnerResult } from '../redux/CandidateSlice';

const TimeSetting = () => {
  const dispatch = useDispatch();
  const { isSetup, isCountdown } = useSelector(countdownSelector);
  const { candidates } = useSelector(candidatesSelector);
  const [timerValue, setTimerValue] = useState(1);

  const handleSetTimer = useCallback(() => {
    dispatch(setTimer(timerValue * 60));
  }, [timerValue, dispatch, setTimer]);

  const handleResetTimer = useCallback(() => {
    dispatch(clearTimer());
    dispatch(cleanCandidates());
  }, [dispatch]);

  const handleStartTimer = useCallback(() => {
    if (!isSetup) return alert('請先設定倒數時間');
    if (candidates.length < 1) return alert('輸入抽獎名單')
    if (isCountdown) return alert('倒數中');
    dispatch(runTimer());
  }, [isSetup, candidates, isCountdown, dispatch]);

  const handleGetResultInstantly = useCallback(() => {
    dispatch(getWinnerResult());
    if (isCountdown) dispatch(clearTimer());
  }, [isCountdown, dispatch]);

  const handleInputChange = useCallback((event) => {
    setTimerValue(parseInt(event.target.value))
  }, [])


  return (
    <>
    <Box border="1px solid black" p={2}>
      <Typography variant='h5' mb={2}>抽獎時間設定</Typography>
      <Box mb={4}>
        <Box display="flex" mb={2}>
        <TextField
          type="number"
          value={timerValue}
          onChange={handleInputChange}
          size="small"
          variant="outlined"
          inputProps={{ min: 1 }}
        />
        <Typography display="flex" alignItems="center" pl={2}>分鐘</Typography>
        </Box>
        <Box>
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleSetTimer}>設定時間</Button>
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleResetTimer}>重設時間</Button>
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleStartTimer}>開始倒數</Button>
          <Button variant="contained" onClick={handleGetResultInstantly}>立刻抽獎</Button>
        </Box>
      </Box>
    </Box>
    <Box my={4} display="flex" justifyContent="center" border="1px solid black">
       <Countdown />
    </Box>
    </>
  )
}

export default TimeSetting;