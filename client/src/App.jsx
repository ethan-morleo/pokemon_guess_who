import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './Contexts/UserContext';

//components import
import Home from './MyComponents/Home';
import Game from './MyComponents/Game';
import Final from './MyComponents/Final';
import MyLogin from './MyComponents/MyLogin';
import ErrorPage from './MyComponents/ErrorPage';
import PersonalPage from './MyComponents/PersonalPage';

function App() {
  //states props
  const [elementList, setElementList] = useState([]);
  const [gameId, setGameId] = useState(undefined);
  const [difficulty, setDifficulty] = useState(undefined);
  const [points, setPoints] = useState(0);
  const [gameResult, setGameResult]= useState();
  const [username, setUsername] = useState('Guest');
  const [isGaming, setIsGaming] = useState(false);

  function updateElementList(list){setElementList(list)}

  function updateGameId(id){
    setGameId(id);
  }

  function updateDifficulty(value){setDifficulty(value)}

  function setInitialPoints(){
    switch(difficulty){
      case 'FACILE':
        setPoints(12);
        break;
      case 'MEDIA':
        setPoints(24);
        break;
      case 'DIFFICILE':
        setPoints(36);
        break;
    }
  }

  function updatePoints(){setPoints((old)=>{return old-1})}
  
  function updateResult(value){setGameResult(value)}

  function updateUser(name){setUsername(name)}

  function updateIsGaming(value){setIsGaming(value)}

  return (
    <>
    <UserContext.Provider value={{username: username, updateUser: updateUser}} >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home difficulty={difficulty} updateElementList={updateElementList} updateGameId={updateGameId} updateDifficulty={updateDifficulty} setInitialPoints={setInitialPoints} updateIsGaming={updateIsGaming}/>} />
        <Route path='/game/:difficulty' element={<Game list={elementList} id={gameId} updatePoints={updatePoints} updateResult={updateResult} points={points} isGaming={isGaming}/>}/>
        <Route path='/final' element={<Final result={gameResult} points={points}/>}  />
        <Route path='/login' element={<MyLogin />} />
        <Route path='/:username/games' element={<PersonalPage/>} />
        <Route path='/error' element={<ErrorPage />}/>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </>
  )
}

export default App
