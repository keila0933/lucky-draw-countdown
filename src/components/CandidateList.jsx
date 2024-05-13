import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList as List, areEqual } from "react-window";
import uuid from 'react-uuid';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import { candidatesSelector, addCandidate,  cleanWinner } from '../redux/CandidateSlice';
import CandidateItem from './CandidateItem';

const Row = memo(({
  data,
  index,
  style
}) => {
  return (
    <CandidateItem
      key={data[index].key}
      name={data[index].name}
      uniqueKey={data[index].key}
      forwardedStyle={style}
    />
  );
}, areEqual);

const CandidateList = () => {
  const [innerHeight, setInnerHeight] = useState(600);
  const { candidates, winner } = useSelector(candidatesSelector);
  const [candidateName, setCandidateName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);

  const handleInputChange =  (event) => {
    setCandidateName(event.target.value);
  };

  const handleInsert = () => {
    if (candidateName === '') return alert('請輸入抽獎人名稱！');
    if (candidates.length === 0 && winner !== undefined) dispatch(cleanWinner());
    if (candidates.some(candidate => candidate.name === candidateName)) return alert('抽獎人名稱重複')
    dispatch(addCandidate({ name: candidateName, key: uuid() }));
    setCandidateName('');
  };

	return (
	<Box>
    <Box mb={2} border="1px solid black" p={4}>
      <Typography variant='h5' mb={2}>
        抽獎名單
        {candidates.length ? <Typography ml={1} component="span">(目前參加人數： {candidates.length} 人)</Typography> : null}
      </Typography>
      <Box display="flex" alignItems="center">
      <TextField
        value={candidateName}
        onChange={handleInputChange}
       />
       <Button variant="contained" sx={{ ml: 2 }} onClick={handleInsert}>+ 新增抽獎人</Button>
       </Box>
    </Box>
      {candidates.length ? (
        <List
          className='List'
          height={552}
          width="100%"
          itemCount={candidates.length}
          itemSize={80}
          itemData={candidates}
        >
          {Row}
        </List>
      ) : (
        <p>目前無人參加抽獎</p>
      )}
    </Box>
	)
}

export default CandidateList;
