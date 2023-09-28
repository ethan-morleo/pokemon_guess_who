'use strict';
const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('./polichi_db.sqlite', (err) => {
  if(err) throw err;
});

//get list of element 
exports.getElements = (number) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM pokemon order by random() limit ?`;
        db.all(sql, [number], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const objectList = rows;
          resolve(objectList);
        });
      });
}
//get element by id
exports.getElementById = (id)=>{
    return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM pokemon WHERE id=?`;
        db.get(sql,[id], (err,row)=>{
            if (err) {
                reject(err);
                return;
              }
            if(row == undefined){
             resolve({error: 'object not found.'});
            }else{
              resolve(row);
            }   
        });
    });
}
//get element by category and name
exports.getElementByName = (name)=>{
  return new Promise((resolve,reject)=>{
      const sql = `SELECT * FROM pokemon WHERE name=?`;
      db.get(sql,[name], (err,row)=>{
          if (err) {
              reject(err);
              return;
            }
          if(row == undefined){
           resolve({error: 'object not found.'});
          }else{
            resolve(row);
          }   
      });
  });
}

//get pokemon by game id info 
exports.getPokemonByGameId = (id)=>{
  return new Promise((resolve,reject)=>{
    const sql = 'SELECT p.name, p.type, p.evolution, p.region, p.enable, p.four_legged FROM games g, pokemon p WHERE g.secret_element = p.name AND g.id=?';
    db.get(sql,[id], (err,row)=>{
      if (err) {
          reject(err);
          return;
        }
      if(row == undefined){
       resolve({error: 'game not found.'});
      }else{
        resolve(row);
      }   
  });
  })
}
//get element of game table by id
exports.getGameById = (id)=>{
  return new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM games WHERE id=?';
    db.get(sql,[id], (err,row)=>{
      if (err) {
          reject(err);
          return;
        }
      if(row == undefined){
       resolve({error: 'game not found.'});
      }else{
        resolve(row);
      }   
  });
  })
}
//add element in game table - return new id 
exports.addGame = (gameRequest, secret)=>{
    return new Promise((resolve,reject)=>{
        let username = gameRequest.username;
        const sql= 'INSERT INTO games(username,selected_difficulty,secret_element,date) VALUES(?,?,?,?) returning id';
        db.get(sql,[username, gameRequest.difficulty, secret, gameRequest.date], function(err, row){
            if(err){
                reject(err);
                return
            }
            resolve(row.id);
        })
    });
}

//update points in game table by id 
exports.updateGameById = (id, points) =>{
    return new Promise((resolve,reject)=>{
        const sql= 'UPDATE games SET points=?,finish=? WHERE id=? ';
        db.run(sql, [points,'true', id], function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.changes);
          });
    });
}

//get game element by username 
exports.getGamesByUsername = (username)=>{
  return new Promise((resolve, reject)=>{
    const sql='SELECT * FROM games WHERE username=?';
    db.all(sql, [username], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  })
}

//delete game by Id
// delete an existing answer
exports.deleteGame = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM games WHERE id = ?';  // Double-check that the answer belongs to the userId
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      } else
        resolve(this.changes);  // return the number of affected rows
    });
  });
}

