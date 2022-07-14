import styles from '../../styles/lobby/lobby.module.css'
import { useRouter } from 'next/router'

/*
I have this in the model for the previous game
const Game = Schema({
  userOne: { type: Number, required: true },
  userTwo: { type: Number, required: true },
  winner: { type: Number, required: true },
  moves: { type: Number, required: true, default: 1000 },
  time: { type: Number, required: true }// in minutes
});
*/

const games = [
  {
    startedBy: "nathanTi",
    gameLength: 10
  },
  {
    startedBy: "IroncladDev",
    gameLength: 3
  },
  {
    startedBy: 'jjroley',
    gameLength: 1
  }
];

function time(minutes) {
  return minutes + ':00'
}

export default function GameList({ list }) {
  const router = useRouter();
  
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Winner</th>
          <th>Moves</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((game, index) => {
            return (
              <tr key={index} onClick={() => {router.push(`/archives/games/${game.id}`)}}>
                <td>{ game.winner }</td>
                <td>{ game.moves }</td>
                <td>{ time(game.time) }</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )  
}