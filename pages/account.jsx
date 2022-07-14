import { useAuth } from '../contexts/authContext'

function Account () {
   const user = useAuth();
   return <h1>Account of { user.name }</h1>
 }

Account.minRole = 'logged_in';
Account.redirect = '/'

export default Account;