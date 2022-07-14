# Brainstorm

Hi, Nathan :) I thought we could do some brainstorming on how we will set up the project
> Great. I've done some basic things for the login part (because you were probably sleeping and it's not too complicate)
>
> I think we could build the project like that:
> * `/dashboard`: the user's dashboard
> * `/user/<username>`: the profile of the user (for other persons)
> * `/login`: the login page
> * `/game`: you can start a game from there
> * `/game/start`: the waiting room
> * `/game/<id>`: we can view the scores, and we could add the possibility to see the chess game in real time
> * `/game/<id>/play`: the page where the players can play
>
> I hope these features are what you had in mind
>
> **PS:** I'm french, so with the jet lag it's possible I am not available when it's afternoon for you.

I'm planning on using chess.js for move validation. However, there are some nuances that come with using it, and thus some complex state management on the client-side. Do you think redux would be a good idea? Or just the useReducer hook? Or just normal state?

> It looks like there are two packages: [node-chess](https://www.npmjs.com/package/chess) and [chess.js](https://www.npmjs.com/package/chess.js)
>
> And I have never used Redux. Could you explain me quickly how it works?
> > redux is basically just a way to handle state. 
> > What is does is take in a current piece of state an an action, and returns a new piece of state  based on that
> > A code example is worth a thousand words lol
> > ```js
> > function reducer(state, action) {
> >   switch(action.type) {
> >    case "UPDATE_USERNAME":
> >      return { ...state, username: action.payload }
> >    break;
> >    case "UPDATE_PASSWORD":
> >      return { ...state, password: action.payload }
> >    break;
> >   }
> > }
> > const user = { username: "John Doe", password: "abcde" }
> > reducer(user, { type: "UPDATE_USERNAME", payload: "John Smith" })
> > // returns the new piece of state
> > // { username: "John Smith", password: "abcde" }
> > 
> > ```
> > > Ok, thanks

The back-end will also be complicated. I want to have authentication, a waiting room where players can pair, and private games. What do you think would be a good way to set that up? Here's the server for my old program. https://replit.com/@jjroley/chess-server?v=1

> Your previous program was awesome! I saw you used Sokect.io. I think it could be interesting to create our own websocket.
>
> [Server side websoket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
>
> [Client side websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)
> 
> [An article about implementing websockets](https://fjolt.com/article/javascript-websockets)
>
> > Interesting! I will look into it.
> > 
> I've done a part of the login system. It would be great if you could test it :)
>
> > The login system works for me. Nice work
>  
> **How to test:**
> * Please go to the [dashboard](https://brainstorm.jjroley.repl.co/dashboard). Normally, you will be redirected to the [login](https://brainstorm.jjroley.repl.co/login) page.
> * Then, click on the login button. Normally, you will be redirected to the [dashboard](https://brainstorm.jjroley.repl.co/dashboard)
> * Now, if you go to the [login](https://brainstorm.jjroley.repl.co/login) page, you will be redirected to the dashboard
>
> The next thing to do is to create a database and store the user's id in it.
>
> About the waiting room and the private games, we could create unique identifiers, which a person can share.

I tried adding a timer last time, but it is full of glitches and I don't think it works across different time zones.

> I think we can do using the `Date()` object, with `getTime()` It returns a number that equals the number of milliseconds passed since January 1, 1970
> > I did do that, but Date.getTime() would return a different number based on different time zones, right?
> >
> > Nvm, you're right, it returns that value regardless of users location on earth. That makes it easier :D

Do you think we should have a seperate server to handle live connections? That way there could be multiple servers users could choose from based on their location, idk.



# Server
The server for my last program was very simple, all in one file.

I want to create a better design, one that is a lot more modular.
