import { ChessgroundWrapper } from '../../components/board/ChessgroundWrapper'

export default function Play() {
  return (
    <div style={{width: 'min(100vw, 100vh)', aspectRatio: '1/1'}}>
      <ChessgroundWrapper />
    </div>
  )
}
