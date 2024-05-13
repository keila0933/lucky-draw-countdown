import { useState, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';

import { countdownSelector, reduceSecond, clearTimer } from '../redux/CountdownSlice';
import { getWinnerResult } from '../redux/CandidateSlice';
import { calcTime } from '../utils/calcTime';

const Countdown = () => {
  const dispatch = useDispatch();
  const { timer, isSetup, isCountdown } = useSelector(countdownSelector);
  const [time, setTime] = useState(calcTime(timer * 60));
  const initialRenderRef = useRef(true);
  const timeoutRef = useRef();

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    if (timeoutRef.current && timer === 0) {
      clearInterval(timeoutRef.current);
      dispatch(clearTimer());
      dispatch(getWinnerResult());
    }

    setTime(calcTime(timer));
  }, [timer, dispatch]);

  useEffect(() => {
    if (!isCountdown) return;
    timeoutRef.current = setInterval(() => {
      dispatch(reduceSecond());
    }, 1000);

    return () => clearInterval(timeoutRef.current);
  }, [isCountdown, dispatch]);

  return (
    <Typography variant='h2'>
      {isSetup ? `${time.minutes}:${time.seconds}` : '00:00'}
    </Typography>
  )
}

export default memo(Countdown);