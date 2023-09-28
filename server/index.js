'use-strict'
const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const services = require('./services');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the user info in the DB
const cors = require('cors');
const dayjs = require('dayjs');

 // init express
const app = express();
const port = 3001;

/*** Set up Passport ***/

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await userDao.getUser(username, password);
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
      return done(null, user); 
  }
));

// serialize and de-serialize the user (user object <-> session)

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

//middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  return res.status(401).json({ error: 'Not authenticated'});
}

//custom middleware to get username in case of init auth game
const checkLogInRequest = (req,res,next) =>{
  if(req.isAuthenticated()){
    const username = req.user.username;
    req.username = username;
  }else{
    req.username = 'Guest';
  }
  next();
}

// set up the session
app.use(session({
  secret: 'fjkljflkasjaiejklacmzo',
  resave: false,
  saveUninitialized: false 
}));

//init passport
app.use(passport.initialize());
app.use(passport.session());

/*** APIs ***/

/**
 * POST /api/newGame - setup new game 
 */
app.post('/api/newGame', checkLogInRequest, async (req, res)=>{
  try{
      let now = dayjs();
      const gameRequest = {difficulty: req.body.difficulty, username: req.username, date: now.format('DD/MM/YYYY') }
      const result = await services.newGameResponse(gameRequest);
      res.status(200).json(result);
  }catch(err){
   res.status(500).json({ error: `error during the creation of the game`});
  }
} );

/**
 * PUT /api/getAnswer - get the answer for the try
 */
app.put('/api/getAnswer', async(req,res)=>{
  try{
    const result = await services.newTryResponse(req.body.answerRequest);
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({ error: `error during getting answer of the try`});
  }
})

/**
 * POST /api/finalTry - get the final result 
 */
app.post('/api/finalTry', async(req, res)=>{
  try{
    const result = await services.finalResponse(req.body.finalTryRequest);
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({ error: `error during getting answer of the final try`});
  }
})

/**
 * PUT /api/updateGame - set points of the match, delete row if user=guest
 */
app.put('/api/updateGame', async(req,res)=>{
  try{
    const result = await services.updateGame(req.body.updateGameRequest);
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({ error: `error during the update of the game`});
  }
})

/**
 * GET /api/getGames - get the list of all game made by auth user
 */
app.get('/api/getGames', isLoggedIn, async(req, res)=>{
  try{
    const result = await services.getGames(req.user.username);
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({ error: `error during getting list of games for the user`});
  }
})

/*** Users APIs ***/

/**
 * POST /api/login - login 
 */
app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});

 /**
 * DELETE api/logout - logout
 */
app.delete('/api/logout', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

/**
 * GET /sessions/current - check whether the user is logged in or not
 */
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

//main page of the server
app.get('/', async (req,res)=>{
    res.send('MAIN POLICHI SERVER PAGE')
 })

 app.listen(port, ()=>console.log(`polichi-server listening at http://localhost:${port}`));