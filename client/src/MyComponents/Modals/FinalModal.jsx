import { useContext, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import API from "../../API";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

function FinalModal(props){
    const {show, updateShowFinalModal, gameId, name, updateResult, points,} = props;

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const username = userContext.username;

    let gamePoints= points <0 ? 0 : points-1;
    
    async function handleFinalRequest(){
        setIsLoading(true);
        const result = await API.finalResult(gameId, name);
        if(result && username!='Guest'){
            await API.updateGame(gameId, gamePoints);
        }else if(!result && username!='Guest'){
            await API.updateGame(gameId, 0);
        }
        updateResult(result);
        navigate('/final');
    }

    function closeModal(){updateShowFinalModal(false)}

    let buttonComponent = isLoading ? <LoadingButton /> : <NormalButton handleFinalRequest={handleFinalRequest} close={closeModal} />

    return(
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>CONFERMA OGGETTO SELEZIONATO</Modal.Title>
            </Modal.Header>
            <Modal.Body>CONFERMI {name} ?</Modal.Body>
                <Modal.Footer>
                    {buttonComponent}
                </Modal.Footer>
        </Modal>
    );
}

function LoadingButton(props){
    return(
    <>
        <Button variant="primary" disabled>
            <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            Loading...
        </Button>
        <Button variant="secondary" onClick={()=>handleFinalRequest()}>
            NO
        </Button>
    </>
    );
}

function NormalButton(props){
    return(
    <>
        <Button variant="primary" onClick={()=>props.handleFinalRequest()}>
            SI
        </Button>
        <Button variant="secondary" onClick={()=>props.close()}>
            NO
        </Button>
    </>
    )
}

export default FinalModal