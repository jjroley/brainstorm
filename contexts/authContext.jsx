import { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const roles = ['logged_out', 'logged_in', 'beginner', 'master', 'admin'];

export function verifyAuth (max, has) {
  if (roles.indexOf(has[has.length - 1]) < roles.indexOf(max)) {
  	return false;
  }
  return true;
}



export function AuthProvider({ children, user }) {
  return (
    <AuthContext.Provider value={user}>
      { children }
    </AuthContext.Provider>
  )
}
