import {useState } from "react";
import DifficultyList from "./DifficultyList";
import StartGameModal from "./Modals/StartGameModal";
import MyNavBar from "./MyNavBar";

function ChooseGame(props){
    const {updateDifficulty, difficulty, updateElementList, updateGameId, setInitialPoints, updateIsGaming} = props;
    const [showModal, setShowModal] = useState(false);
    function handleShowModal(value){setShowModal(value)}

return(
<>
    <DifficultyList updateDifficulty={updateDifficulty} handleShowModal={handleShowModal}/>
    <StartGameModal showModal={showModal} handleShowModal={handleShowModal}  difficulty={difficulty}  updateElementList={updateElementList} updateGameId={updateGameId} setInitialPoints={setInitialPoints} updateIsGaming={updateIsGaming}/>
</>
        
    );
}

export default ChooseGame;