# The Nodejs Challenge

### URLs
Hosted App: [https://concrete-challenge-node.herokuapp.com/](https://concrete-challenge-node.herokuapp.com/)

Sign Up: [https://concrete-challenge-node.herokuapp.com/users/sign_up](https://concrete-challenge-node.herokuapp.com/) (POST )

Sign In:  [https://concrete-challenge-node.herokuapp.com/users/sign_in](https://concrete-challenge-node.herokuapp.com/) (POST )

Search User: [https://concrete-challenge-node.herokuapp.com/users/:id](https://concrete-challenge-node.herokuapp.com/) (GET)


### Steps for Local Setup

#### Server Start
Depency Install

    yarn // or 'npm install'

Run Tests

    yarn test // or 'npm test'

Run Local Server

    yarn run_server // or 'npm run run_server'

Lint

    yarn lint // or 'npm run lint'


#### Extra Observations about local testing

I'm using a MongoDB Memory Server on development and test environment to speedup server bootstrap and connections. (plus my machine's MongoDB local server is bugged :v)   
