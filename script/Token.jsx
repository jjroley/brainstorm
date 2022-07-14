import { useRef, useEffect } from 'react'

let verifiedToken = {
  date: 0,
  token: ''
}

// the function to verify the token
export function verifyToken (callback) {

  // a useEffect function
  useEffect(async () => {

    // if we already have the token, we do nothing
    if (verifiedToken.current) return;

    // we get the token store in the localStorage
    const { token, date } = JSON.parse(
      localStorage.getItem('auth-token') || '{"date":"0"}'
    );

    // we have the time difference betweeb the current date and the last token's update (in minutes)
    const diff = (new Date().getTime() - date)/60000;

    // if the token have been updated less then 58 minutes ago, we refresh the token, otherwise we access to the token
    if (diff > 58) {
      getToken(callback)
    } else {
      verifiedToken.current = {
        token: token,
        date: date
      };
      callback(token);
    }
  }, []);
}

// the function to get a token
export async function getToken (callback) {
  const token = await fetch('/api/auth/token')
    .then(d => d.json())
    .then(j => j?.token);

  if (token) {
    await localStorage.setItem('auth-token', JSON.stringify({
      token: token,
      date: new Date().getTime()
    }));
    verifiedToken.current = {
      token: token,
      date: new Date().getTime()
    }
    callback(token);
  } else {
    setTimeout(() => {
      getToken(callback);
    }, 1000);
  }
}

// the function to fetch something to the other repl
export function getJSON (path) {
  return new Promise((resolve, reject) => {

    async function f () {
      return await fetch(
          `https://brainstormapi.nathanti.repl.co${path}?token=${verifiedToken.current.token}`
        ).then(d => d.json());
    }
    
    // if the token is too old, we retrieve a new token
    const diff = (new Date().getTime() - verifiedToken.current.date)/60000;
    if (diff > 58) {
      getToken(() => {
        resolve(f())
      })
    } else {
      resolve(f());
    }
  });
}
