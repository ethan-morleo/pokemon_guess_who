import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import API from "../../API";
function StopGameModal(props){
    const {show, updateShow, destination, isLogOut} = props;
    const updateUser = useContext(UserContext).updateUser;
    const navigate = useNavigate();
    
    async function handleConfirm(){
        if(isLogOut){
            await API.logOut();
            updateUser('Guest');
        }
        navigate(destination);
    }

    return(
        <Modal show={show} onHide={()=>updateShow()}>
            <Modal.Header closeButton>
                <Modal.Title>INTERRUZIONE GIOCO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                SICURO DI VOLER INTERROMPERE IL GIOCO?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={()=>handleConfirm()}>SI</Button>
                <Button variant="secondary" onClick={()=>updateShow()}>NO</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default StopGameModal;