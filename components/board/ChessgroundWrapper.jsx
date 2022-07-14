import { useRef, useEffect } from 'react'

import { Chessground } from 'chessground' 

import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css';
import 'chessground/assets/chessground.cburnett.css';

export function ChessgroundWrapper({ config = {} }) {
  const ref = useRef()

  useEffect(() => {
    Chessground(ref.current, config)
  }, [config])
  
  return (
    <div style={{width: '100%', height: '100%'}} ref={ref} />
  )
}
