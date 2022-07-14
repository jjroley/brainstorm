import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/auth/LoginForm'

// import { verifyAuth } from '../script/authScript' 
// import { useAuth } from '../contexts/authContext'
// import { useRouter } from 'next/router'

function Login() {  
  return (
    <div className={styles.container}>
      <LoginForm className={styles.login} />
    </div>
  )
}

// how does it works?
// only logged out users can visit this page 
// I don't think it quite works yet
// but in _app.js you can see the 
Login.allowedRoles = 'logged_out'


// IMPORTANT!
Login.minRole = '*'

export default Login;

export async function getServerSideProps({ req, res }) {
  if (req.headers['x-replit-user-id']) {
    return { redirect: { destination: '/dashboard' } }
  }
  return { props: {} }
}
