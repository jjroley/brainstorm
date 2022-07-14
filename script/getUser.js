import { v4 as uuidv4 } from 'uuid'


// non-logged-in user
function getDefaultUser () {
  return {
    loggedIn: false,
    id: uuidv4(),  
    name: "Anonymous",
    roles: ['logged_out']
  }
}

export const getUser = (headers) => {
  if(!headers || !headers['x-replit-user-id']) {
    return getDefaultUser();
  }

  return {
    loggedIn: true,
    name: headers['x-replit-user-name'],
    id: headers['x-replit-user-id'],
    roles: ['logged_in']
  }
}