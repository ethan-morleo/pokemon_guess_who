'use-strict'
const dao = require('./dao'); // module for accessing the DB

//utils function 

function getRandomInt(max) {
    let randomNumber=Math.floor(Math.random() * max);
    return randomNumber;
  }
function numbersByDifficulty(difficulty) {
    switch(difficulty){
        case 'FACILE':
            return 12;
        case 'MEDIA':
            return 24;
        case 'DIFFICILE':
            return 36;
    }
  }


function getRandomSecretId(list){
   const randomId=getRandomInt(list.length);
   return list[randomId];
}
function isRight(e,prop,tryValue){
    switch(prop){
        case 'type':
            return e.type == tryValue;
        case 'evolution':
            return e.evolution == tryValue;
        case 'region':
            return e.region == tryValue;
        case 'isFourLegged':
            return e.four_legged == tryValue; 
    }
}


//SERVICES
 
//new game response - setup db for new game
exports.newGameResponse = async (gameRequest)=>{
    //getting random elements
    const numberOfElements=numbersByDifficulty(gameRequest.difficulty);
    const randomList = await dao.getElements(numberOfElements);
    const randomId = getRandomSecretId(randomList.map((o)=>o.id));
    const secretElement = randomList.find(o=>o.id===randomId);
    //insert game in table
    const gameId = await dao.addGame(gameRequest, secretElement.name);
    //response
    const response = {
        id: gameId,
        listOfElements: randomList
    }
    return response;
}

//give the response of a try 
exports.newTryResponse = async (answerRequest)=>{
    //retrieve full secret element by name in game table 
    const secretElement = await dao.getPokemonByGameId(answerRequest.gameId);
    //comparison between try and real secret element value
    return isRight(secretElement, answerRequest.tryKey, answerRequest.tryValue);
}

//give the final response of the final try
exports.finalResponse = async(finalTryRequest)=>{
    //retrieve game info by id and comparison between secret element name stored and the try one 
    const gameInfo = await dao.getGameById(finalTryRequest.gameId);
    const result = gameInfo.secret_element == finalTryRequest.name;
    //delete record from games table se username= Guest
    if (gameInfo.username == 'Guest')
        dao.deleteGame(gameInfo.id);
    return result;
}

//update game table with game points
exports.updateGame = async (updateGameRequest) =>{
    return await dao.updateGameById(updateGameRequest.id, updateGameRequest.points);
}

//retrieve all games made by particular user
exports.getGames = async(username) =>{
    const list = await dao.getGamesByUsername(username);
    let newList = list.filter((o)=> o.finish=='true').map((o)=>({id: o.id, difficulty:o.selected_difficulty, secret:o.secret_element, points:o.points, date: o.date}));
    const totalPoints = newList.map((o)=>o.points).reduce((sum, currentValue) => {return sum + currentValue},0);
    const gamesResponse = {total: totalPoints, list: newList}
    return response = {gamesResponse: gamesResponse}
}