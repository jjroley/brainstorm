import { useAuth } from '../contexts/authContext'
// import { useState, useRef, useEffect, useCallback } from 'react'

// import UserHeader from '../components/Userheader'
import Loader from '../components/ui/loader'
import GameList from '../components/lobby/GameList'

// import { Toast } from '../script/Modal'
// import { verifyToken, getJSON } from '../script/Token'
// import Socket from '../script/Socket'

function Dashboard() {

  // we show the loader
  //if (!hasToken) {
  // return <Loader allPage="true" />
  //}

  const user = useAuth();

  
  const gameList = [
    {
      winner: 'jjroley',
      moves: 10,
      time: 20,
      id: '987654321'
    },
    {
      winner: 'nathanTi',
      moves: 20,
      time: 15,
      id: '123456789'
    }
  ];
  
  return (
    <>
      <h2>Welcome, { user.name }</h2>
      <GameList list={gameList}/>
    </>
  );
}

Dashboard.redirect = '/'
Dashboard.minRole = 'logged_in';

export default Dashboard

export function getServerSideProps() {
  return { props: {} }
}
