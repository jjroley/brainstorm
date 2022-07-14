# Diary
> I think we should write here what we've done so far

## Contexts
All the files in the `contexts` folder

**authContext:**
* Authenticates a user and allows for global user state to be used across the app

**socketContext**
* Lorem
* ipsum

## Pages
All the files in the `pages` folder (that are not api endpoints)

**_app:**
* The default app constructor

**dashboard:**
* Show the name of the user
* If we don't know the user, it redirects the user to the login page.

**index:**
* Nothing

**Login:**
* If don't know the user, show the page
* If we know him, we redirect him to the dashboard


## Api
All the api endpoints:

**hello:**
* ???

**websocket:**
* Because all the websockets connections start with an http request, maybe before implementing a websocket connection we can verify some things with this API endpoint

**auth/replit-auth:**
* Return the name and the id of a user using replit's auth