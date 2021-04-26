# Pokedex, now with users!

## Overview
You will be adding user functionality into our pokedex app: instead of all users seeing the same global pool of favPokemons, each user will see only their own favorited pokemon. This repo contains a working, pre-users version of the react app that you will be adding onto. Clone this repo down, and `yarn install && yarn start` in this folder.

The backend of this project can be found here: https://github.com/SEI-ATL-3-8/users-pokedex-backend. Clone this down and get it running locally.

## User Stories
- If I'm not logged in, I can create an account or login
- If I am logged in, I can logout
- If I am logged in, I can see AllPokemon and my FavPokemon.
- The rest of the site operates the same as before, with the exception that each user has their own pool of favPokemon, that are not mixed up with other users' favPokemons. The app's old/existing user stories are dupicated below:
  - I can go to the All Pokemon page and see a list of all pokemon, fetched from https://pokeapi.co/
  - I can filter this list using a search bar
  - Each pokemon on this page has a Fav button next to it
  - When I click the Fav button, the pokemon is added to my favs list via a POST to the backend
  - An already-faved pokemon has its Fav button replaced with an icon that indicates that I've already faved it
  - I can go to the Faved Pokemon page and see a list of all my faved pokemon (fetched from the backend)
  - Stretch: for each of the faved pokemon, I see additional data from the api (types, stats, image, etc)
  - Stretch: I can click the already-faved icon for any pokemon and remove it from my faves

## Road Map:
This project involves hopping between the front and the back ends. One possible path is sketched out below, but it's recommended that you read through this path and think about the phases of completion on your own. If you want to do your work in a different sequence, that is ok!

frontend:
  - add signup/login/logout routes, wire up those forms to create users in the backend
  - set up your backend url using .env, and replace any hard-coded references to localhost
  - create user state at the top level (either in App or in a context)

backend:
  - create a user model, set up the routes that the forms hit (POST /users, POST /users/login, GET /users/verify). this will involve making a router & controller for users. confirm that users are getting created in database when the frontend form is submitted

frontend:
  - upon receiving a successful signup / login response, set localStorage & set user state in App
  - pass user state into NavBar, and conditionally render links: when logged in, show logout/allPokemon/favPokemon; when logged out, show signup/login
  - on App load, sync the user state up with localstorage by hitting /users/verify. remember to put userId in headers.Authorization
  - in the render functions of your routes, check if we're in the desired logged-in/logged-out state for that route. If not, redirect to whichever route seems sensible to you

backend:
  - add userId to favPokemons (note the table name from the migration that generated this table), create 1-t-m association
  - in each favPokemon route, look up the logged-in user based on req.headers.authorization, and limit the scope of the request to that user: only look up that user's favPokemon, create a favPokemon that belongs to that user, delete the specified favPokemon of that user

frontend:
  - whenever you hit a favPokemon route, include the userId in the authorization header
  - confirm that different users each have their own private favPokemon pools
