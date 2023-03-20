import React from 'react';
import { CircularProgress } from '@mui/material';

const PreLoader = () => {
  const preLoader = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {preLoader.map((item, i) =>  <CircularProgress key={i}/>)}
    </>
  ) 
}

export default PreLoader
