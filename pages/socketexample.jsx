/*==========

You can see here the implementation of the socket system.

To use it, you need to have to use useRef to store the websocket object, and useSate to store the token.

So we create first the socket reference, called socket (l.27)
Then, we create a function called sendJSON, that will send a javascript object if the user is connected, otherwise it will warn this user.

After setting up this part, we access to the token, with verifyToken. When the user has the token, we say it to the user, and we create a socket connection.

The code below is the main part:

// we create the socket connection (it the socket is closed, it will automatically try to create a new socket connection)
Socket({

  // we specify the token the authentified
  token: token,

  // we need a path (so we can have different socket's provider on the server)
  path: '/notification',

  // it runs this function when the socket is closed
  onClose: () => {
    console.log('Socket closed')
  },

  // it runs this function when the socket is opened
  onOpen: (s) => {
    console.log('Socket opened');

    // we set the current socket
    socket.current = s;

    // we set the current token, so the loader will disapears
    setHasToken(token);
  },

  // it runs this function when there is a message
  onMessage: (obj) => {
    setResults(r => [...r, JSON.stringify(obj)])
  }
});

Next, you can see here the server side part:

The part that will upgrade the socket connections:
https://replit.com/@nathanTi/brainstormapi#index.js

The socket manager (it will manage all the sockets connections with /notification as path)
https://replit.com/@nathanTi/brainstormapi#sockets/notification.js

==========*/

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from '../styles/Example.module.css'

import Loader from '../components/ui/loader'
import Input from '../components/ui/input'

import { Toast } from '../script/Modal'
import { verifyToken, getJSON } from '../script/Token'
import Socket from '../script/Socket'


export default function Dashboard(props) {
  const [hasToken, setHasToken] = useState(false);
  const [results, setResults] = useState([]);

  
  const socket = useRef(null);

  const sendJSON = useCallback((obj) => {
    if (!socket.current) return Toast.fire({ icon: 'error', title: 'The socket have been closed' });
    socket.current.send(
      JSON.stringify(obj)
    );
  }, []);
  
  verifyToken((token) => {

    // we show the toast
    Toast.fire({
      icon: 'success',
      title: 'Get the token successfully!'
    });
    
    Socket({
      token: token,
      path: '/notification',
      onClose: () => {
        console.log('Socket closed')
      },
      onOpen: (s) => {
        console.log('Socket opened');
        socket.current = s;
        setHasToken(token);
      },
      onMessage: (obj) => {
        // this just gets called every time a message is sent from server
        // similar to socket.io i guess
        // this is the easiest way I think...
        // so if obj has a action key, you just update state based on that
        // so say you get a message from the server:
        // { action: 'move', payload: 'e2 e4'}

        // let's go to brainstormapi (your repl) and I want to see how websockets are set up over there
        setResults(r => [...r, JSON.stringify(obj)])
      }
    });
  });

  function useSocket (val) {
    sendJSON({
      action: val
    });
  }


  // we show the loader
  if (!hasToken) {
    return <Loader allPage="true" />
  }

  return (
    <>
      <Input placeholder="Type an action, press enter" className={styles.input} onEnter={useSocket}/>
      {
        results.map(i => (<label key={i}>{i}<br/></label>))
      }
    </>
  );
}

export async function getServerSideProps({ req }) {
  if (!req.headers['x-replit-user-id']) {
    return {
      redirect: {
        destination: '/login'
      }
    }
  } else {
    return {
      props: {}
    }
  }
}
