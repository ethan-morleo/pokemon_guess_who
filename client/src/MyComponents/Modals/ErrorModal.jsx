import {Modal} from 'react-bootstrap'
function ErrorModal(props){
    return(
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>ERRORE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                OOPS...ERRORE DEL SISTEMA RIPROVA
            </Modal.Body>
        </Modal>
    );
}

export default ErrorModal