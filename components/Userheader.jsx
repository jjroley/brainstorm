import { useAuth } from '../contexts/authContext'
import styles from '../styles/Header.module.css';
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

function iconLoader({ src, width, quality }) {
  return `https://replit.com/public/icons/${src}?w=${width || 50}&quality=${quality || 50}`
}

export default function Header() {
  const user = useAuth();
  const router = useRouter();
  const sidebar = useRef();
  
  function goTo(params) {
    router.push(params);
    sidebar.current.blur();
  }
  
  // it's perfectly working!
  if (user.loggedIn === false) {
    return (
      <header className={styles.header}>
        <Link href="/">Chess App</Link>
        <div>
          <Link href="/about">About</Link>
            <Link href="/ranking">Ranking</Link>
            <Link href="/room/waiting">Play</Link>
            <Link href="/login">Login</Link>
        </div>
      </header>
    );
  }
  
  return (
    <header className={styles.header}>
      <Link href="/">Chess App</Link>
      <div className={styles.profile}>
        <Image loader={iconLoader} src="favicon-196.png" tabIndex="1" alt="user avatar" width='50' height='50'/>
        <ul tabIndex="1" ref={sidebar} className={styles.sidebar}>
          <li onClick={() => goTo('/dashboard')}>Dashboard</li>
          <li onClick={() => goTo('/user/' + user.name)}>Profile</li>
          <li onClick={() => goTo('/game/new')}>New Game</li>
          <li onClick={() => goTo('/account')}>Settings</li>
        </ul>
      </div>
    </header>
  );
}

// PREVIOUS CODE
// https://replit.com/public/icons/favicon-196.png
  
  // some hooks
  // const sidebarRef = useRef()
  // const openRef = useRef(true)
  // const user = useAuth();

  
  /*const openSidebar = () => {
    sidebarRef.current.classList.add(styles.sidebarOpen)
  }
  const closeSidebar = () => {
    sidebarRef.current.classList.remove(styles.sidebarOpen)
  }
  useEffect(() => {
    // sorry this is a mess I'm tired lol
    // I messed up you code but I'll fix it tomorrow
    const handleClick = (event) => {
      let click = openRef.current
      openRef.current = true
      if(!click) return
      if(!sidebarRef.current.contains(event.target)) {
        closeSidebar()
        openRef.current = false
      }
      openRef.current = false
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  function goTo(params) {
    closeSidebar()
    router.push(params)
  }
*/