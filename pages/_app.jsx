import App from 'next/app'
import { AuthProvider, verifyAuth } from '../contexts/authContext'
import { getUser } from '../script/getUser'
import Header from '../components/Userheader'
import '../styles/globals.css'
import { useRef, useEffect } from 'react'


import Router, { useRouter } from 'next/router'

import NextNProgress from "nextjs-progressbar";
import styles from '../styles/Home.module.css'
 
function MyApp({ Component, pageProps, user }) {
  
  return (
    <AuthProvider user={user}>
      <NextNProgress 
        height={3}
        color="#fca903"
        startPosition={0.2}
        options={{ showSpinner: false }}
        />
      <Header />
      <div className={styles.body}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const serverSide = Boolean(appContext.ctx.req);

  const appProps = await App.getInitialProps(appContext);

  const user = (
    serverSide ? 
    getUser(appContext?.ctx?.req?.headers) :
    await fetch('/api/auth/replit-auth').then(res => res.json())
  );
  
  const { Component } = appContext;

  // it's working!
  if (
    Component.minRole !== '*' && 
    !verifyAuth(Component.minRole, user.roles)
  ) {
    // we redirect the user
    if (Boolean(appContext.ctx.req)) {
      appContext.ctx.res.writeHead(302, { 
        Location: Component.redirect || '/' 
      });

      // WE SEND THE RESPONSE (great idea)
      return appContext.ctx.res.end();
    }else {
      return Router.push(Component.redirect || '/', undefined, { shallow: true });
    }
  }

  return { ...appProps, user }
}

export default MyApp
