const SERVER_HOST = "http://localhost";
const SERVER_PORT = 3001;

const SERVER_BASE = `${SERVER_HOST}:${SERVER_PORT}/api`;


/**
 * All the API calls
 */


/**
 * SETUP NEW GAME
 * 
 * @param difficulty difficulty choosen for the game
 */
function initGame(difficulty){
    const request={difficulty: difficulty}
    return new Promise((resolve, reject) => {
        fetch(SERVER_BASE+`/newGame`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }).then((response) => {
          if (response.ok) {
            response.json()
          .then((gameResponse) => resolve(gameResponse))
          .catch(() => { reject({ error: "Cannot parse the response." }) });
          } else {
            // analyze the cause of error
            response.json()
              .then((message) => { reject(message); }) // error message in the response body
              .catch(() => { reject({ error: "Cannot parse the response." }) }); // something else
          }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
      });
}

/**
 * GET THE ANSWER OF THE TRY
 * 
 * @param gameId id of the game
 * @param tryKey property of the try
 * @param tryValue value of the property of the try
 */

function getAnswer(gameId, tryKey, tryValue){
    const answerRequest={
        gameId: gameId,
        tryKey: tryKey,
        tryValue: tryValue
    }
    const request ={answerRequest: answerRequest}
    return new Promise((resolve, reject) => {
        fetch(SERVER_BASE+`/getAnswer`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }).then((response) => {
          if (response.ok) {
            response.json()
          .then((answerResponse) => resolve(answerResponse))
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          } else {
            // analyze the cause of error
            response.json()
              .then((message) => { reject(message); }) // error message in the response body
              .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
      });

}

/**
 * GET THE FINAL RESULT
 * 
 * @param gameId id of the game
 * @param name name of the selected_item
 */
function finalResult(gameId, name){
    const finalRequest={
        gameId: gameId,
        name: name
    }
    const request={finalTryRequest: finalRequest}
    return new Promise((resolve, reject) => {
        fetch(SERVER_BASE+`/finalTry`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }).then((response) => {
          if (response.ok) {
            response.json()
            .then((response) => resolve(response))
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          } else {
            // analyze the cause of error
            response.json()
              .then((message) => { reject(message); }) // error message in the response body
              .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
      });
}

/**
 * UPDATE GAME INFORMATION
 * 
 * @param gameId id of the game
 * @param points points of the game
 */

function updateGame(gameId,points){
  const updateGameRequest={
    id: gameId,
    points: points
}
const request={updateGameRequest: updateGameRequest}
return new Promise((resolve, reject) => {
  fetch(SERVER_BASE+`/updateGame`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  }).then((response) => {
    if (response.ok) {
      response.json()
      .then((response) => resolve(response))
    .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
    } else {
      // analyze the cause of error
      response.json()
        .then((message) => { reject(message); }) // error message in the response body
        .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
    }
  }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
});
}

/**
 * GET ALL GAMES MADE BY USER
 *
 */

async function getGames(){
  const response = await fetch(SERVER_BASE+`/getGames`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const myGamesResponse = await response.json();
  if (response.ok) {
    const list = myGamesResponse.gamesResponse.list.map((game)=>({id: game.id, difficulty: game.difficulty, secret: game.secret, points: game.points, date:game.date}))
    return {total: myGamesResponse.gamesResponse.total, list:list};
  } else {
    throw myGamesResponse;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

/**
 * Attempts to login the user
 * 
 * @param email email of the user
 * @param password password of the user
 */
async function logIn(credentials) {
  let response = await fetch(SERVER_BASE + '/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

/**
 * Attempts to logout the user
 * 
 */

async function logOut() {
  await fetch(SERVER_BASE+'/logout', {
    method: 'DELETE', 
    credentials: 'include' 
  });
}

/**
 * Attempts to get user info
 * 
 */
async function getUserInfo() {
  const response = await fetch(SERVER_BASE+'/sessions/current', {
    credentials: 'include'
  });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    return {id: undefined, username: 'Guest', name: undefined};
  }
}

const API={initGame, getAnswer, finalResult, logIn, logOut, getUserInfo, updateGame, getGames};

export default API;
