import { useContext, useState } from 'react';
import {Button, Modal, Spinner} from 'react-bootstrap';
import API from '../../API';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';

function StartGameModal(props){
    const {showModal,handleShowModal,difficulty,updateElementList,updateGameId, setInitialPoints, updateIsGaming} = props;
    
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    async function handleNewGameRequest(){
        setIsLoading(true);
        try{
            const newGameResponse = await API.initGame(difficulty);
            updateElementList(newGameResponse.listOfElements);
            updateGameId(newGameResponse.id);
            setInitialPoints(difficulty);
            updateIsGaming(true);
            navigate(`/game/${difficulty}`)
        }catch(err){
            navigate('/error')
        }
    }
    
    let buttonsComponent = isLoading ? <LoadingButtons /> : <NormalButtons handleNewGameRequest={handleNewGameRequest} 
                                                                           handleShowModal={handleShowModal} 
                                                                            />
    return(
        <Modal show={showModal} style={{border: '1px solid blue', padding:'15px'}}>
            <Modal.Header>
                <Modal.Title>CONFERMA LA PARTITA</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hai selezionato la difficoltà {difficulty}</Modal.Body>
            {buttonsComponent}
            </Modal>
    );
    
}

function LoadingButtons(props){
    return(
        <Modal.Footer>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>{' '}
            <Button variant="secondary" disabled>
                BACK
            </Button>
        </Modal.Footer>
    );

}

function NormalButtons(props){
    return(
    <Modal.Footer>
    <Button variant="primary" onClick={()=>props.handleNewGameRequest()}>
        OK
    </Button>{' '}
    <Button variant="secondary" onClick={()=>{
            props.handleShowModal(false);
            }}>
        BACK
    </Button>
    </Modal.Footer>
    ); 
}

export default StartGameModal;