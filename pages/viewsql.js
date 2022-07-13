import React, { useState, useEffect } from 'react'

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack'

import SyntaxHighlighter from 'react-syntax-highlighter';

import BridgeSgpToSql from '../services/BridgeSgpToSql';

export default function ViewSql() {

  const [promotions, setPromotions] = useState({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const promotions = JSON.parse(window.localStorage.getItem('promotions') || '{}')
      setPromotions(BridgeSgpToSql(promotions))
    }
  }, [])


  return (
    <React.Fragment>
      <Container>
        {Object.entries(promotions).map(([key, value]) => (
          <Stack key={key} spacing={2}>
            {key}
            <SyntaxHighlighter language="sql">
              {value}
            </SyntaxHighlighter>
          </Stack>
        ))}
      </Container>
    </React.Fragment>
  );
}
