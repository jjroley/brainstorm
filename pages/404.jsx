import { useAuth } from '../contexts/authContext'
import Link from 'next/link'

function Error () {
  const user = useAuth();
  
  return (
    <>
      <h1>Oops, the page doesn't exists { user.name === 'Anonymous' ? '.' : user.name }</h1>
      <Link href={ user.name === 'Anonymous' ? '/' : '/dashboard' }>
        Return to familiar territory.
      </Link>
    </>
  )
}

Error.minRole = '*';

export default Error;